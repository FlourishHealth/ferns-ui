// Taking in an OpenAPI spec, this component allows the user to edit all the models provided
// by the API. It's used as an admin panel.

import startCase from "lodash/startCase";
import React from "react";

import {Box} from "../Box";
import {Button} from "../Button";
import {OpenAPIAdminNavigate, OpenAPIAdminProps, OpenApiSpec} from "../Common";
import {useOpenAPISpec} from "../OpenAPIContext";
import {Text} from "../Text";
import {InstanceAdmin} from "./InstanceAdmin";
import {ModelAdmin} from "./ModelAdmin";
import {OpenAPIAdminProvider, useOpenAPIAdminData} from "./OpenAPIAdminContext";

export const getModels = (openApiSpec: OpenApiSpec): string[] => {
  return Object.keys(openApiSpec.paths ?? {})
    .filter((path: string) => !path.includes("{id}"))
    .map((path: string) => startCase(path.replace(/\//g, "")));
};

export const OpenAPIAdminInternal = ({
  model,
  id,
  navigate,
}: {
  model?: string;
  id?: string;
  navigate: OpenAPIAdminNavigate;
}): React.ReactElement | null => {
  const openApiSpec = useOpenAPISpec();
  const {getSdkHook} = useOpenAPIAdminData();

  if (model && id) {
    const create = getSdkHook(model, "create");
    const read = getSdkHook(model, "read");
    const remove = getSdkHook(model, "remove");
    const update = getSdkHook(model, "update");

    if (!create && !read && !remove && !update) {
      console.error("No hooks found for model", model);
      return null;
    }

    return (
      <Box height="100%" width="100%">
        <InstanceAdmin
          id={id}
          model={model}
          navigate={navigate}
          useCreate={create}
          useRead={read}
          useRemove={remove}
          useUpdate={update}
        />
      </Box>
    );
  } else if (model) {
    const list = getSdkHook(model, "list").useQuery;
    if (!list) {
      return <Text>Model not found or missing list SDK</Text>;
    }
    return (
      <Box direction="column" flex="grow" height="100%" width="100%">
        <ModelAdmin model={model} navigate={navigate} useList={list} />
      </Box>
    );
  } else {
    const models = getModels(openApiSpec.spec);
    // TODO: check that the model has a list function, or we can't render it.
    return (
      <Box height="100%" padding={6} width={300}>
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
  }
};

export const OpenAPIAdmin = ({
  sdk,
  navigate,
  model,
  id,
  page,
  setPage,
  sort,
  filters,
  setFilters,
  setSearch,
  setSort,
  search,
  modelOverrides,
  modelFieldsOverride,
  instanceOverrides,
}: OpenAPIAdminProps): React.ReactElement | null => {
  return (
    <Box height="100%" width="100%">
      <OpenAPIAdminProvider
        filters={filters}
        instanceOverrides={instanceOverrides}
        modelFieldsOverride={modelFieldsOverride}
        modelOverrides={modelOverrides}
        page={page}
        sdk={sdk}
        search={search}
        setFilters={setFilters}
        setPage={setPage}
        setSearch={setSearch}
        setSort={setSort}
        sort={sort}
      >
        <OpenAPIAdminInternal id={id} model={model} navigate={navigate} />
      </OpenAPIAdminProvider>
    </Box>
  );
};
