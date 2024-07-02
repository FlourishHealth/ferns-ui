import camelCase from "lodash/camelCase";
import React, {createContext, useContext, useEffect, useState} from "react";

import {
  ModelFieldConfig,
  ModelFields,
  OpenAPIContextType,
  OpenAPIProviderProps,
  OpenAPISpec,
} from "./Common";

const OpenAPIContext = createContext<OpenAPIContextType | null>(null);

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

    return rootConfig?.get?.responses?.["200"]?.content?.["application/json"]?.schema?.properties
      ?.data?.items;
  };

  const getModelField = (modelName: string, fieldName: string): ModelFieldConfig => {
    const fields = getModelFields(modelName);
    const dotFields = fieldName.split(".");

    let field = fields?.properties?.[dotFields[0]];
    if (!field && fieldName && fields?.properties) {
      console.warn(`No OpenAPI field found for ${modelName}:${fieldName}`);
    }

    for (const dotField of dotFields.slice(1)) {
      field = (field?.properties as any)?.[dotField];
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
