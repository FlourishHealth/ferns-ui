import camelCase from "lodash/camelCase";
import React, {createContext, useContext, useEffect, useState} from "react";

interface OpenAPISpec {
  paths: {
    [key: string]: any;
  };
}

export type ModelFieldConfig = any;

export type OpenApiPropertyType =
  | "string"
  | "date"
  | "datetime"
  | "boolean"
  | "array"
  | "object"
  | "number"
  | "any";
export type OpenApiProperty = {
  type?: OpenApiPropertyType;
  format?: string;
  properties?: OpenApiProperty;
  items?: OpenApiProperty[];
  description?: string;
  // TODO: is this actually there?
  required?: string[];
};

export type ModelFields = {
  type: "object" | "array";
  required: string[];
  properties: {[name: string]: OpenApiProperty};
};

interface OpenAPIContextType {
  spec: OpenAPISpec | null;
  getModelFields: (modelName: string) => ModelFields | null;
  getModelField: (modelName: string, field: string) => OpenApiProperty;
}

const OpenAPIContext = createContext<OpenAPIContextType | null>(null);

interface OpenAPIProviderProps {
  children: React.ReactElement;
  specUrl?: string;
}

export const OpenAPIProvider = ({children, specUrl}: OpenAPIProviderProps): React.ReactElement => {
  const [spec, setSpec] = useState<OpenAPISpec | null>(null);

  const getModelFields = (modelName: string): ModelFields | null => {
    const modelPath = `/${camelCase(modelName.replace(/\s/g, ""))}/`;
    const rootConfig = spec?.paths?.[modelPath];
    if (!rootConfig) {
      if (spec?.paths && modelName) {
        console.warn(`No OpenAPI model found for ${modelName}`);
      }
      return null;
    }

    const items =
      rootConfig?.get?.responses?.["200"]?.content?.["application/json"]?.schema?.properties?.data
        ?.items;
    return items;
  };

  const getModelField = (modelName: string, fieldName: string): ModelFieldConfig => {
    const fields = getModelFields(modelName);
    const dotFields = fieldName.split(".");

    let field = fields?.properties?.[dotFields[0]];
    if (!field && fieldName && fields?.properties) {
      console.warn(`No OpenAPI field found for ${modelName}:${fieldName}`);
    }

    for (const dotField of dotFields.slice(1)) {
      field = field?.properties?.[dotField];
    }
    return field;
  };

  // Fetch the OpenAPI spec from the provided URL.
  useEffect((): void => {
    if (!specUrl) {
      return;
    }

    fetch(specUrl)
      .then(async (response) => {
        const data = (await response.json()) as OpenAPISpec;
        setSpec(data);
      })
      .catch((error: any) => console.error(`Error fetching OpenAPI spec: ${error}`));
  }, [specUrl]);

  return (
    <OpenAPIContext.Provider value={{spec, getModelFields, getModelField}}>
      {children}
    </OpenAPIContext.Provider>
  );
};

export const useOpenAPISpec = () => {
  const context = useContext(OpenAPIContext);
  if (!context) {
    throw new Error("useOpenAPISpec must be used within an OpenAPIProvider");
  }
  return context;
};
