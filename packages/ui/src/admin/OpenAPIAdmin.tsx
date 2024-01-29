// Taking in an OpenAPI spec, this component allows the user to edit all the models provided
// by the API. It's used as an admin panel.

import startCase from "lodash/startCase";
import React from "react";

import {Box} from "../Box";
import {Button} from "../Button";
import {OpenAPIAdminProps} from "../Common";
import {useOpenAPISpec} from "../OpenAPIContext";
import {Text} from "../Text";
import {OpenApiSpec} from "./AdminUtils";
import {InstanceAdmin} from "./InstanceAdmin";
import {ModelAdmin} from "./ModelAdmin";

export const getModels = (openApiSpec: OpenApiSpec): string[] => {
  return Object.keys(openApiSpec.paths ?? {})
    .filter((path: string) => !path.includes("{id}"))
    .map((path: string) => startCase(path.replace(/\//g, "")));
};

export const OpenAPIAdmin = ({
  navigate,
  model,
  modelOverrides,
  instanceOverrides,
  id,
  page,
  sort,
  sdk,
}: OpenAPIAdminProps): React.ReactElement => {
  const openApiSpec = useOpenAPISpec();

  const getSdkHooks = (): any => {
    const modelPath = startCase(model).replace(/\s/g, "");
    return {
      list: sdk.endpoints[`get${modelPath}`],
      read: sdk.endpoints[`get${modelPath}ById`],
      create: sdk.endpoints[`post${modelPath}`],
      update: sdk.endpoints[`patch${modelPath}ById`],
      remove: sdk.endpoints[`delete${modelPath}ById`],
    };
  };

  const renderAllModels = (): React.ReactElement => {
    const models = getModels(openApiSpec.spec);
    return (
      <Box padding={6} width={300}>
        {models.map((m: string) => (
          <Box key={m} marginBottom={2}>
            <Button
              color="primary"
              text={m}
              onClick={(): void => {
                navigate({model: m});
              }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const renderModel = (): React.ReactElement | null => {
    if (!model) {
      return null;
    }

    const hooks = getSdkHooks();
    const modelName = startCase(model).replace(/\s/g, "");
    // console.log("MODEL", model, modelName);
    if (!hooks) {
      return <Text>Model not found</Text>;
    }
    return (
      <Box direction="column" flex="grow" width="100%">
        <ModelAdmin
          model={model}
          navigate={navigate}
          overrides={modelOverrides?.[modelName]}
          page={page}
          sort={sort}
          useList={hooks.list.useQuery}
        />
      </Box>
    );
  };

  const renderModelInstance = (): React.ReactElement | null => {
    const hooks = getSdkHooks();

    if (!Object.keys(hooks).length) {
      return null;
    }

    return (
      <InstanceAdmin
        id={id}
        model={model!}
        navigate={navigate}
        overrides={instanceOverrides?.[model!] ?? {}}
        useCreate={hooks.create}
        useRead={hooks.read}
        useRemove={hooks.remove}
        useUpdate={hooks.update}
      />
    );
  };

  return (
    <Box height="100%" width="100%">
      {model ? (id ? renderModelInstance() : renderModel()) : renderAllModels()}
    </Box>
  );
};
