import flatten from "lodash/flatten";
import get from "lodash/get";
import merge from "lodash/merge";
import startCase from "lodash/startCase";
import React, {useCallback, useMemo, useState} from "react";

import {Box} from "../Box";
import {Button} from "../Button";
import {ModelAdminFieldComponentProps, ModelAdminFieldConfig, ModelAdminProps} from "../Common";
import {useOpenAPISpec} from "../OpenAPIContext";
import {
  CheckboxCell,
  DateTimeCell,
  DropdownCell,
  LinkCell,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TextFieldCell,
} from "../tables";
import {Text} from "../Text";

const WIDTHS: {[id: string]: number} = {
  date: 140,
  boolean: 100,
  text: 200,
};

const DEFAULT_WIDTH = 200;

export const ModelAdmin = ({
  useList,
  navigate,
  model,
  overrides,
  sort,
  page: initialPage,
}: ModelAdminProps): React.ReactElement | null => {
  const spec = useOpenAPISpec();
  const modelFields = spec.getModelFields(model);

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
    const fieldConfig = flatten(
      Object.entries(modelFields?.properties ?? {}).map(([name, openApiProperty]) =>
        getFieldConfigForModelAdmin(name, openApiProperty)
      )
    );
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
  }, [getFieldConfigForModelAdmin, modelFields?.properties]);

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
  const query: any = {page};
  if (sort) {
    query.sort = sort;
  }
  const {data: listData} = useList(query);

  if (!listData?.data?.length) {
    return null;
  }

  const renderExtraControls = (): React.ReactElement => {
    return (
      <Box
        alignItems="center"
        alignSelf="end"
        color="white"
        direction="row"
        height={60}
        marginLeft={8}
      >
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
          text={String(value)}
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
          more={Boolean(listData.more)}
          page={listData.page}
          setPage={(p: number) => {
            setPage(p);
            navigate({page: p, model, sort});
          }}
          sort={sortColumnIndex !== -1 ? {column: sortColumnIndex, direction} : undefined}
        >
          <TableHeader>
            {modelConfig.map((column, index) => (
              <TableHeaderCell
                key={column.title}
                index={index}
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
              </TableHeaderCell>
            ))}
          </TableHeader>
          {listData.data.map((doc: any) => {
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
