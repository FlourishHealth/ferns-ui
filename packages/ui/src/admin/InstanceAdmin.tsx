import {skipToken} from "@reduxjs/toolkit/query";
import flatten from "lodash/flatten";
import forEach from "lodash/forEach";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";
import set from "lodash/set";
import startCase from "lodash/startCase";
import React, {useCallback, useEffect, useMemo, useState} from "react";

import {Box} from "../Box";
import {Button} from "../Button";
import {FieldProps, ModelInstanceAdminProps} from "../Common";
import {Field} from "../Field";
import {Heading} from "../Heading";
import {useOpenAPISpec} from "../OpenAPIContext";
import {Text} from "../Text";
import {useToast} from "../Toast";
import {useCatchAndToast} from "../useCatchAndToast";
import {useOpenAPIAdminData} from "./OpenAPIAdminContext";

export type InstanceFieldOverride = {[id: string]: Partial<InstanceAdminFieldConfig>};

// The props for a custom column component.
interface InstanceAdminFieldComponentProps extends FieldProps {
  doc: any; // The rest of the document.
  fieldKey: string; // Dot notation representation of the field.
}

// The config for a single field of a model instance form. This is an editable field in the form.
export interface InstanceAdminFieldConfig extends FieldProps {
  fieldKey: string; // Dot notation representation of the field.
  required?: boolean;
  defaultValue?: any;
  CustomComponent?: (props: InstanceAdminFieldComponentProps) => React.ReactElement | null;
}

function findDifference(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  function constructPath(path: string, key: string): string {
    return path ? `${path}.${key}` : key;
  }

  function changes(result: Record<string, any>, value: any, key: string, path: string): void {
    const currentPath = constructPath(path, key);

    if (!isEqual(value, get(obj2, currentPath))) {
      if (isObject(value) && isObject(get(obj2, currentPath))) {
        forEach(value, (nestedValue, nestedKey) => {
          changes(result, nestedValue, nestedKey as string, currentPath);
        });
      } else {
        set(result, currentPath, value);
      }
    }
  }

  const result: Record<string, any> = {};
  forEach(obj1, (value, key) => changes(result, value, key as string, ""));

  return result;
}

interface InstanceAdminFieldProps {
  field: InstanceAdminFieldConfig;
  instanceData: any;
  setInstanceData: (data: any) => void;
  fieldOverrides?: Partial<InstanceAdminFieldConfig>;
}

const InstanceAdminField = ({
  field,
  instanceData,
  setInstanceData,
  fieldOverrides,
}: InstanceAdminFieldProps): React.ReactElement | null => {
  const {CustomComponent, fieldKey, ...fieldProps} = field;
  const fieldName = fieldKey.split(".")[-1];
  const value = get(instanceData, fieldKey);

  const onChange = useCallback(
    (result: any): void => {
      const newData = {...instanceData};
      set(newData, field.fieldKey, result);
      setInstanceData(newData);
    },
    [field.fieldKey, instanceData, setInstanceData]
  );

  const componentProps: InstanceAdminFieldComponentProps = {
    ...fieldProps,
    ...fieldOverrides,
    doc: instanceData,
    value: value ?? "", // set to empty string to avoid uncontrolled component error
    fieldKey: field.fieldKey,
    onChange,
  };

  if (CustomComponent) {
    return CustomComponent(componentProps);
  }

  if (fieldName === "_id") {
    return <Text>ID: {value}</Text>;
  }

  if ((field as any).type === "array") {
    // TODO: Create a generic version of UserList for displaying/updating arrays of sub-objects
    // in InstanceAdmin.
    return (
      <Box paddingY={2}>
        <Heading size="sm">{startCase(field.fieldKey)}</Heading>
        {(value ?? []).map((v: any, i: number) => (
          <Box key={i} marginBottom={2}>
            <Text>
              <Text weight="bold">{i}</Text>: {JSON.stringify(v)}
            </Text>
          </Box>
        ))}
      </Box>
    );
  }

  return <Field {...componentProps} />;
};

// An individual field on a model instance form.
export const InstanceAdmin = ({
  id,
  model,
  useRead,
  useCreate,
  useRemove,
  useUpdate,
  navigate,
}: ModelInstanceAdminProps): React.ReactElement | null => {
  const catchAndToast = useCatchAndToast();
  const toast = useToast();
  const doRead = useRead?.useQuery ?? ((): any => ({data: {}}));
  const [doUpdate] = useUpdate?.useMutation() ?? [(): any => ({data: {}})];
  const [doCreate] = useCreate?.useMutation() ?? [(): any => ({data: {}})];
  const [doRemove] = useRemove?.useMutation() ?? [(): any => ({data: {}})];
  const {data: instance} = doRead(id !== "new" ? id : skipToken);
  const [instanceData, setInstanceData] = useState<any>({});
  const {getFieldConfigForInstanceAdmin, instanceOverrides} = useOpenAPIAdminData();
  const spec = useOpenAPISpec();

  // Set instance data once it's been fetched.
  useEffect(() => {
    if (instance && Object.keys(instanceData ?? {}).length === 0) {
      setInstanceData(instance);
    }
  }, [instance, instanceData]);

  const modelFields = spec.getModelFields(model);
  const fields: InstanceAdminFieldConfig[] = useMemo(() => {
    // TODO: something going very wrong here, i think with nested properties.
    return flatten(
      Object.entries(modelFields?.properties ?? {}).map(([fieldName, openApiProperty]) =>
        getFieldConfigForInstanceAdmin(model, fieldName, openApiProperty)
      )
    );
  }, [getFieldConfigForInstanceAdmin, model, modelFields?.properties]);

  const onSave = useCallback(async (): Promise<void> => {
    if (instance?._id) {
      const modifiedData = findDifference(instanceData, instance);

      await doUpdate({
        id: instance._id,
        body: modifiedData,
      })
        .unwrap()
        .then(() => toast.show("Update successful!"))
        .catch((e: any) => catchAndToast("Error updating", e));
    } else {
      const {_id, ...rest} = instanceData;
      await doCreate(rest)
        .unwrap()
        .then(() => {
          toast.show("Create successful!");
          navigate({id: undefined, model});
        })
        .catch((e: any) => catchAndToast("Error creating", e));
    }
  }, [catchAndToast, doCreate, doUpdate, instance, instanceData, model, navigate, toast]);

  // TODO: Disable save button if there are no changes, or if there are missing required fields.

  return (
    <Box height="100%" justifyContent="center" marginBottom={2} maxHeight="100%">
      {Boolean(Object.keys(instanceData).length > 0 && !instanceData?._id) && (
        <Box paddingY={2}>
          <Heading size="sm">New</Heading>
        </Box>
      )}
      <Box direction="column" maxHeight="100%" paddingX={4} paddingY={4} scroll width="100%">
        {fields.map((field, index) => {
          console.log("FIELD KEY", field, fields);
          if (!field.fieldKey?.split) {
            console.warn("Field key not found for field", field);
            return null;
          }
          const parentFields = field.fieldKey?.split(".").slice(0, -1).join(".") ?? "";
          const previousParentFields = fields[index - 1]?.fieldKey
            .split(".")
            .slice(0, -1)
            .join(".");

          // If this is the first field in a parent field, we print a heading for the parent field.
          const isFirstFieldInParent = parentFields && previousParentFields !== parentFields;

          const heading = isFirstFieldInParent ? (
            <Box marginBottom={2}>
              <Heading size="sm">{startCase(parentFields.split(".").join(", "))}</Heading>
            </Box>
          ) : null;

          const subLevel = field.fieldKey.split(".").length - 1;
          const fieldOverrides = instanceOverrides?.[field.fieldKey] ?? {};

          return (
            <React.Fragment key={(parentFields ?? "") + (field.label ?? "") + String(index)}>
              {heading}
              <Box
                key={(parentFields ?? "") + (field.label ?? "")}
                marginLeft={Math.min(subLevel * 4, 12) as 0 | 4 | 8 | 12}
              >
                <InstanceAdminField
                  field={field}
                  fieldOverrides={fieldOverrides}
                  instanceData={instanceData}
                  setInstanceData={setInstanceData}
                />
              </Box>
            </React.Fragment>
          );
        })}
      </Box>

      <Box alignItems="center" color="white" direction="row" height={60} paddingX={8} width="100%">
        <Box marginRight={4} width={200}>
          <Button color="primary" inline text="Save" onClick={onSave} />
        </Box>
        {Boolean(instance) && (
          <>
            <Box width={200}>
              <Button
                text="Cancel"
                onClick={async (): Promise<void> => {
                  navigate({id: undefined, model});
                }}
              />
            </Box>
            <Box marginLeft={2} width={200}>
              <Button
                color="red"
                text="Delete"
                onClick={async (): Promise<void> => {
                  doRemove();
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
