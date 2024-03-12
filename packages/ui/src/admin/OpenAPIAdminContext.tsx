import flatten from "lodash/flatten";
import merge from "lodash/merge";
import startCase from "lodash/startCase";
import React, {createContext, useCallback, useContext} from "react";

import {
  FieldProps,
  ModelAdminFieldConfig,
  OpenAPIAdminContextType,
  OpenAPIAdminProviderProps,
} from "../Common";
import {useOpenAPISpec} from "../OpenAPIContext";
import {InstanceAdminFieldConfig} from "./InstanceAdmin";

const OpenAPIAdminContext = createContext<OpenAPIAdminContextType | null>(null);

const DEFAULT_COLUMN_WIDTHS: {[id: string]: number} = {
  date: 140,
  boolean: 100,
  text: 220, // 220 fits a mongo id with default ferns-ui font size and fonts
};
export const DEFAULT_COLUMN_WIDTH = 200;

export const OpenAPIAdminProvider = ({
  children,
  filters,
  setFilters,
  search,
  setSearch,
  sort,
  setSort,
  sdk,
  page,
  modelOverrides,
  modelFieldsOverride,
  instanceOverrides,
}: OpenAPIAdminProviderProps): React.ReactElement => {
  const spec = useOpenAPISpec();

  // Get hooks from the ferns-rtk generated SDK for CRUD/list operations.
  const getSdkHook = (
    modelName: string,
    type: "list" | "read" | "create" | "update" | "remove"
  ): any => {
    const modelPath = startCase(modelName).replace(/\s/g, "");
    switch (type) {
      case "list":
        return sdk.endpoints[`get${modelPath}`];
      case "read":
        return sdk.endpoints[`get${modelPath}ById`];
      case "create":
        return sdk.endpoints[`post${modelPath}`];
      case "update":
        return sdk.endpoints[`patch${modelPath}ById`];
      case "remove":
        return sdk.endpoints[`delete${modelPath}ById`];
      default:
        throw new Error(`Invalid SDK hook: ${modelName}/${type}`);
    }
  };

  // Convert a model field from the OpenAPI spec into a ModelAdminFieldConfig, for use with
  // the table ModelAdmin.
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
        width: DEFAULT_COLUMN_WIDTHS[openApiProperty.type ?? "string"] ?? DEFAULT_COLUMN_WIDTH,
        description: openApiProperty.description,
        sort: name,
      };

      return [ret];
    },
    []
  );

  // Convert a model field from the OpenAPI spec into Ferns UI Field props.
  const getFieldConfigForInstanceAdmin = useCallback(
    (
      model: string,
      fieldName: string,
      config: any,
      parentKey?: string
    ): InstanceAdminFieldConfig[] => {
      const modelFields = spec.getModelFields(model);

      const fieldKey = parentKey ? `${parentKey}.${fieldName}` : fieldName;

      // If we have a parent key and the field is _id, return null.
      // We don't want to display the sub _id field in the form.
      if (parentKey && fieldName === "_id") {
        return [];
      }

      let type: FieldProps["type"] = config.type;
      if (config.enum) {
        type = "select";
      } else if (config.type === "string") {
        type = "text";
      } else if (config.format === "date-time") {
        type = "datetime";
      } else if (config.type === "object") {
        return Object.keys(config.properties ?? {}).flatMap((subFieldKey: string) => {
          return (
            getFieldConfigForInstanceAdmin(subFieldKey, config.properties?.[subFieldKey], fieldName)
              // Filter out subschema _id here, it doesn't help us at all.
              .filter((conf) => conf.fieldKey !== "_id")
          );
        });
      }

      let required = false;
      if (
        // Ignore these fields, they're automatically generated.
        // We need to add readonly support to ferns-api.
        !["_id", "created", "updated", "deleted"].includes(fieldKey) &&
        modelFields?.required?.includes(fieldKey)
      ) {
        required = true;
      }

      let label = startCase(fieldKey);
      if (parentKey) {
        label = startCase(fieldKey.split(".").slice(-1)[0]);
      }

      const ret: InstanceAdminFieldConfig = {
        fieldKey,
        type,
        required,
        defaultValue: config.default,
        // TODO: InstanceAdmin disabled doesn't seem to work with readOnly
        disabled: config.readonly || fieldKey === "_id",
        label,
        helperText: config.description,
        options: config.enum
          ? config.enum.map((value: string) => ({value, label: value}))
          : undefined,
      };
      return [ret];
    },
    [spec]
  );

  const getModelAdminFields = useCallback(
    (model: string): ModelAdminFieldConfig[] => {
      const modelFields = spec.getModelFields(model);
      const fieldsOverride = modelFieldsOverride?.[model] ?? [];
      const overrides = modelOverrides?.[startCase(model).replace(/\s/g, "")] ?? {};

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
      const idFieldIndex = fieldConfig.findIndex(
        (f: ModelAdminFieldConfig) => f.fieldKey === "_id"
      );
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
    },
    [getFieldConfigForModelAdmin, modelFieldsOverride, modelOverrides, spec]
  );

  return (
    <OpenAPIAdminContext.Provider
      value={{
        filters,
        setFilters,
        search,
        setSearch,
        page,
        sort,
        setSort,
        getSdkHook,
        getFieldConfigForModelAdmin,
        getFieldConfigForInstanceAdmin,
        getModelAdminFields,
        modelOverrides,
        modelFieldsOverride,
        instanceOverrides,
      }}
    >
      {children}
    </OpenAPIAdminContext.Provider>
  );
};

export const useOpenAPIAdminData = () => {
  const context = useContext(OpenAPIAdminContext);
  if (!context) {
    throw new Error("useOpenAPIAdminData must be used within an OpenAPIAdminProvider");
  }
  return context;
};
