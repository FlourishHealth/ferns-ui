import get from "lodash/get";
import startCase from "lodash/startCase";
import React from "react";

import {Box} from "../Box";
import {ModelAdminFieldConfig} from "../Common";
import {Field} from "../Field";
import {Text} from "../Text";

export const TextFieldCell = ({
  doc,
  text,
  editing,
  disabled,
  field,
  onChange,
  readOnly = false,
}: {
  doc: any;
  dateOnly?: boolean;
  disabled?: boolean;
  editing: boolean;
  field: ModelAdminFieldConfig;
  onChange?: (value: string) => void;
  displaySince?: boolean;
  text?: string;
  readOnly?: boolean;
  helperText?: string;
}): React.ReactElement => {
  if (editing && !readOnly) {
    return (
      <Field
        {...field}
        disabled={disabled}
        label={startCase(field.fieldKey)}
        name={field.fieldKey}
        options={field.options?.map((option) => ({label: option, value: option}))}
        type="text"
        value={field.fieldKey ? get(doc, field.fieldKey) : ""}
        onChange={onChange}
      />
    );
  }
  return (
    <Box flex="grow" justifyContent="center">
      <Text>{text}</Text>
    </Box>
  );
};
