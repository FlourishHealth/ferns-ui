import flatten from "lodash/flatten";
import get from "lodash/get";
import merge from "lodash/merge";
import startCase from "lodash/startCase";
import React, {useCallback, useMemo, useState} from "react";

import {Box} from "../Box";
import {Button} from "../Button";
import {
  ModelAdminFieldComponentProps,
  ModelAdminFieldConfig,
  ModelAdminProps,
  TableFilters,
  TableSearch,
} from "../Common";
import {useOpenAPISpec} from "../OpenAPIContext";
import {Spinner} from "../Spinner";
import {
  CheckboxCell,
  DateTimeCell,
  DropdownCell,
  LinkCell,
  Table,
  TableHeader,
  TableRow,
  TextFieldCell,
} from "../tables";
import {Text} from "../Text";
import {AdminTableHeaderCell} from "./AdminTableHeaderCell";

const WIDTHS: {[id: string]: number} = {
  date: 140,
  boolean: 100,
  text: 210, // 210 fits a mongo id with default ferns-ui font size and fonts
};

const DEFAULT_WIDTH = 200;

// const SearchModal = ({
//   visible,
//   onDismiss,
//   doSearch,
//   field,
// }: {
//   visible: boolean;
//   onDismiss: () => void;
//   doSearch: (field: string, search: string) => void;
//   field: string;
// }): React.ReactElement => {
//   const [search, setSearch] = useState("");
//   return (
//     <Modal visible={visible} onDismiss={onDismiss}>
//       <Box padding={4}>
//         <Field
//           label="Search"
//           name="search"
//           type="text"
//           value={search}
//           onChange={(value: string): void => {
//             setSearch(value);
//           }}
//         />
//         <Box marginTop={4}>
//           <Button
//             color="primary"
//             text="Search"
//             onClick={(): void => {
//               doSearch(field, search);
//             }}
//           />
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

export const ModelAdmin = ({
  useList,
  navigate,
  model,
  overrides,
  sort,
  page: initialPage,
  fieldsOverride,
}: ModelAdminProps): React.ReactElement | null => {
  const spec = useOpenAPISpec();
  const modelFields = spec.getModelFields(model);
  console.log("FIELDS", modelFields);
  const [filters, setFilters] = useState<TableFilters>({});
  const [search, setSearch] = useState<TableSearch | undefined>(undefined);

  const getFieldConfigForModelAdmin = useCallback(
    (name: string, openApiProperty: any, parentKey?: string): ModelAdminFieldConfig[] => {
      const fieldKey = parentKey ? `${parentKey}.${name}` : name;
      if (openApiProperty.type === "object") {
        return Object.keys(openApiProperty.properties ?? {}).flatMap((subFieldKey: string) => {
          return (
            getFieldConfigForModelAdmin(
              subFieldKey,
              openApiProperty.properties?.[subFieldKey],
              name
            )
              // Filter out subschema _id here, it doesn't help us at all.
              .filter((conf) => conf.fieldKey !== "_id")
          );
        });
      }

      let title = startCase(name);
      if (parentKey) {
        title = `${parentKey
          .split(".")
          .map((key) => startCase(key))
          .join(", ")}:\n${title}`;
      }
      const ret: ModelAdminFieldConfig = {
        fieldKey,
        title,
        type: openApiProperty.type ?? "string",
        width: WIDTHS[openApiProperty.type ?? "string"] ?? DEFAULT_WIDTH,
        description: openApiProperty.description,
        sort: name,
      };

      return [ret];
    },
    []
  );

  const fields: ModelAdminFieldConfig[] = useMemo(() => {
    let fieldConfig = flatten(
      Object.entries(modelFields?.properties ?? {}).map(([name, openApiProperty]) =>
        getFieldConfigForModelAdmin(name, openApiProperty)
      )
    );

    // If we have field overrides, apply them here.
    if (fieldsOverride) {
      console.debug("Applying field overrides", fieldsOverride, modelFields?.properties);
      // Only list the fields that are in the override.
      fieldConfig = fieldConfig.filter((f) => Boolean(fieldsOverride.includes(f.fieldKey)));
      // Now add in any fields that are in the override but not in the fieldConfig.
      // Add some defaults So they render properly, then merge with the provided override.
      fieldsOverride.forEach((fieldKey) => {
        if (!fieldConfig.find((f) => f.fieldKey === fieldKey) && overrides?.[fieldKey]) {
          fieldConfig.push(
            merge(
              {fieldKey, title: startCase(fieldKey), type: "string", width: 200},
              overrides[fieldKey]
            )
          );
        }
      });
      // Sort the fields based on the order in the override.
      fieldConfig.sort((a, b) => {
        const indexA = fieldsOverride.indexOf(a.fieldKey);
        const indexB = fieldsOverride.indexOf(b.fieldKey);
        return indexA - indexB;
      });
    }

    // Make sure _id is always first, created, updated and deleted are last, then sort the rest
    // alphabetically.
    const idFieldIndex = fieldConfig.findIndex((f: ModelAdminFieldConfig) => f.fieldKey === "_id");
    const idField = fieldConfig[idFieldIndex];
    fieldConfig.splice(idFieldIndex, 1);

    const createdFieldIndex = fieldConfig.findIndex(
      (f: ModelAdminFieldConfig) => f.fieldKey === "created"
    );
    const createdField = fieldConfig[createdFieldIndex];
    if (createdFieldIndex > -1) {
      fieldConfig.splice(createdFieldIndex, 1);
    }

    const updatedFieldIndex = fieldConfig.findIndex(
      (f: ModelAdminFieldConfig) => f.fieldKey === "updated"
    );
    const updatedField = fieldConfig[updatedFieldIndex];
    if (updatedFieldIndex > -1) {
      fieldConfig.splice(updatedFieldIndex, 1);
    }

    const deletedFieldIndex = fieldConfig.findIndex(
      (f: ModelAdminFieldConfig) => f.fieldKey === "deleted"
    );
    const deletedField = fieldConfig[deletedFieldIndex];
    if (deletedFieldIndex > -1) {
      fieldConfig.splice(deletedFieldIndex, 1);
    }

    return [idField, ...fieldConfig, createdField, updatedField, deletedField].filter((f) => f);
  }, [fieldsOverride, getFieldConfigForModelAdmin, modelFields?.properties, overrides]);

  const getModelAdminConfigFromField = useCallback(
    (field: any): ModelAdminFieldConfig => {
      // Convert openAPI spec into a list of fields for a model admin.
      if (!field) {
        console.warn("No field provided to getColumnConfigFromField");
        return {
          fieldKey: field.fieldKey,
          title: "",
          type: "string",
          width: 200,
          sort: "",
        };
      }

      if (field.fieldKey === "_id") {
        return {
          fieldKey: "_id",
          title: "ID",
          width: 210,
          type: field.type,
          sort: "_id",
          CustomComponent: ({
            doc,
            editing,
          }: ModelAdminFieldComponentProps): React.ReactElement | null => {
            if (editing) {
              return (
                <TextFieldCell disabled doc={doc} editing field={field} text={`_id: ${doc._id}`} />
              );
            }
            return (
              <LinkCell
                key={field.label + doc._id}
                text={doc._id}
                onClick={(): void => {
                  navigate({id: doc._id, model});
                }}
              />
            );
          },
        };
      }

      return merge(
        {
          fieldKey: field.fieldKey,
          title: field.title ?? "",
          width: field.width,
          type: field.type,
          sort: field.fieldKey,
        },
        overrides?.[field.fieldKey]
      );
    },
    [model, navigate, overrides]
  );

  const modelConfig = useMemo(
    () => fields.map((field) => getModelAdminConfigFromField(field)),
    [fields, getModelAdminConfigFromField]
  );

  const [page, setPage] = useState(initialPage ?? 1);
  // const [showSearchModal, setShowSearchModal] = useState(false);
  // const [searchField, setSearchField] = useState("");

  const query: any = {page};
  // Transform filters, booleans should go to true, false, or undefined, and enums should be
  // go to $in: [] queries
  Object.entries(filters).forEach(([field, filter]) => {
    if (filter.length === 0) {
      return;
    }
    const modelField = modelFields?.properties?.[field];
    if (modelField?.type === "boolean") {
      query[field] = filter[0] === "true" ? true : filter[0] === "false" ? false : undefined;
    } else if (field.length > 1) {
      query[field] = {$in: filter};
    } else if (field.length === 1) {
      query[field] = filter[0];
    }
  });
  if (search) {
    query[search.field] = {$regex: search.search, $options: "i"};
  }
  if (sort) {
    query.sort = sort;
  }
  console.log("QUERY", query, filters, sort, page, model, modelConfig, fields, overrides);
  const {data: listData, isLoading} = useList(query);

  // if (!listData?.data?.length) {
  //   return null;
  // }

  const renderExtraControls = (): React.ReactElement => {
    return (
      <Box marginLeft={6} width={160}>
        <Button
          color="primary"
          icon="plus"
          text={`Create ${model}`}
          onClick={(): void => {
            navigate({model, id: "new"});
          }}
        />
      </Box>
    );
  };

  const renderColumn = (field: ModelAdminFieldConfig, doc: any): React.ReactElement | null => {
    // TODO: support inline editing in ModelAdmin so we can support UserExplorer as it exists
    // today.
    // TODO: support expandable rows in ModelAdmin so we can support UserExplorer as it
    // exists today.
    const editing = false;
    const onChange = async (): Promise<void> => {};
    if (field.CustomComponent) {
      return (
        <field.CustomComponent
          doc={doc}
          editing={false}
          fieldKey={field.fieldKey}
          onChange={(): void => {}}
        />
      );
    } else {
      const value = get(doc, field.fieldKey);
      // Get parent field if it exists
      const parentField = field.fieldKey.split(".").slice(0, -1).join(".");
      // eslint-disable-next-line react/prop-types
      const key = (parentField ?? "") + field.fieldKey + doc?._id;
      // Attempt to intelligently map from the type to a suitable column type
      // Boolean - CheckedCell
      // Date - DateCell
      // Enum - dropdown
      if (field.type === "boolean") {
        return (
          <CheckboxCell
            key={key}
            doc={doc}
            editing={editing}
            field={field}
            path={field.fieldKey}
            onChange={onChange}
          />
        );
      } else if (field.type === "datetime" || field.type === "date") {
        return (
          <DateTimeCell
            dateOnly={field.type === "date"}
            doc={doc}
            editing={editing}
            field={field as any}
            onChange={onChange}
          />
        );
      } else if (field.options) {
        return (
          <DropdownCell
            doc={doc}
            editing={editing}
            field={field as any}
            options={field.options?.map((o) => ({label: startCase(o), value: o}))}
            onChange={onChange}
          />
        );
      }
      return (
        <TextFieldCell
          key={key}
          doc={doc}
          editing={editing}
          field={field}
          text={value ? String(value) : ""}
          onChange={onChange}
        />
      );
    }
  };

  const sortModel = sort?.replace("-", "");
  const direction = sort?.startsWith("-") ? "desc" : "asc";
  const sortColumnIndex = modelConfig.findIndex((c) => c.sort === sortModel);

  return (
    <Box direction="row" height="100%" maxHeight="100%">
      <Box direction="column" flex="grow">
        <Table
          columns={modelConfig.map((c) => c.width ?? DEFAULT_WIDTH)}
          extraControls={renderExtraControls()}
          more={Boolean(listData?.more)}
          page={listData?.page ?? 1}
          setPage={(p: number) => {
            setPage(p);
            navigate({page: p, model, sort});
          }}
          sort={sortColumnIndex !== -1 ? {column: sortColumnIndex, direction} : undefined}
        >
          <TableHeader>
            {modelConfig.map((column, index) => (
              <AdminTableHeaderCell
                key={column.title}
                field={column.fieldKey}
                filters={filters[column.fieldKey]}
                index={index}
                model={model}
                search={search?.field === column.fieldKey ? search?.search : undefined}
                setFilters={(newFilters: string[]) => {
                  setFilters({...filters, [column.fieldKey]: newFilters});
                }}
                setSearch={(searchStr: string) => {
                  setSearch({field: column.fieldKey, search: searchStr});
                }}
                sortable={Boolean(column.sort)}
                onSortChange={(dir?: "asc" | "desc"): void => {
                  navigate({
                    page: 1,
                    sort: dir === "asc" ? column.sort : `-${column.sort}`,
                    model,
                  });
                }}
              >
                <Box flex="grow" justifyContent="center" width="100%" wrap>
                  <Text size="sm" weight="bold">
                    {column.title}
                  </Text>
                </Box>
              </AdminTableHeaderCell>
            ))}
          </TableHeader>
          {Boolean(isLoading) && (
            <Box paddingY={12} width="100%">
              <Spinner />
            </Box>
          )}
          {listData?.data.map((doc: any) => {
            return (
              // eslint-disable-next-line react/prop-types
              <TableRow key={doc._id}>
                {modelConfig.map((conf) => renderColumn(conf, doc))}
              </TableRow>
            );
          })}
        </Table>
      </Box>
    </Box>
  );
};
