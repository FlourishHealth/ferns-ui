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
import {DEFAULT_COLUMN_WIDTH, useOpenAPIAdminData} from "./OpenAPIAdminContext";

export const ModelAdmin = ({
  useList,
  navigate,
  model,
}: ModelAdminProps): React.ReactElement | null => {
  const spec = useOpenAPISpec();
  const modelFields = spec.getModelFields(model);
  const {getModelAdminFields, modelOverrides, page: initialPage, sort} = useOpenAPIAdminData();

  const [filters, setFilters] = useState<TableFilters>({});
  const [search, setSearch] = useState<TableSearch | undefined>(undefined);

  const fields = getModelAdminFields(model);

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
        modelOverrides?.[field.fieldKey]
      );
    },
    [model, navigate, modelOverrides]
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
  // console.log("QUERY", query, filters, sort, page, model, modelConfig, fields, modelOverrides);
  const {data: listData, isLoading} = useList(query);

  const renderExtraControls = useCallback((): React.ReactElement => {
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
  }, [model, navigate]);

  const renderColumn = (field: ModelAdminFieldConfig, doc: any): React.ReactElement | null => {
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

  const direction = sort?.direction ?? "asc";
  const sortColumnIndex = modelConfig.findIndex((c) => c.sort === sort?.field);

  return (
    <Box direction="row" height="100%" maxHeight="100%">
      <Box direction="column" flex="grow">
        <Table
          columns={modelConfig.map((c) => c.width ?? DEFAULT_COLUMN_WIDTH)}
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
                sort={
                  sort?.field && sort?.field === column.sort
                    ? {field: sort.field, direction}
                    : undefined
                }
                sortable={Boolean(column.sort)}
                onFiltersChange={(newFilters: string[]) => {
                  setFilters({...filters, [column.fieldKey]: newFilters});
                }}
                onSearchChange={(searchStr: string) => {
                  setSearch({field: column.fieldKey, search: searchStr});
                }}
                onSortChange={(dir?: "asc" | "desc"): void => {
                  navigate({
                    page: 1,
                    sort: {field: column.fieldKey, direction: dir ?? "asc"},
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
