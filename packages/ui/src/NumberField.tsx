import React, {FC, useCallback, useEffect, useState} from "react";

import {NumberFieldProps} from "./Common";
import {TextField} from "./TextField";

export const NumberField: FC<NumberFieldProps> = ({
  errorText,
  value: valueProp,
  max,
  min,
  type,
  ...rest
}: NumberFieldProps) => {
  const [value, setValue] = useState(valueProp ?? "");

  // Sync local state with incoming prop values
  useEffect(() => {
    setValue(valueProp ?? "");
  }, [valueProp]);

  const getError = useCallback(
    (newV?: string) => {
      const v = String(newV);
      if (!v) {
        return;
      }
      const num = type === "number" ? parseInt(v) : parseFloat(v);
      if (isNaN(num) || (type === "number" && v.match(/[^0-9]/) !== null)) {
        return "Value must be an integer";
      } else if (
        (type === "decimal" && v.match(/[^0-9.]+/) !== null) ||
        (v.match(/\./g) || []).length > 1
      ) {
        return "Value must be a decimal";
      } else if (max !== undefined && num > max) {
        return `Value must be less than or equal to ${max}`;
      } else if (min !== undefined && num < min) {
        return `Value must be greater than or equal to ${min}`;
      }
      return undefined;
    },
    [max, min, type]
  );

  const error = errorText || getError(value);

  // Only return the value if it is a valid number
  const localOnChange = useCallback(
    (v: string) => {
      setValue(v);
      const err = getError(v);
      if (!err) {
        rest.onChange(v);
      }
    },
    [getError, rest]
  );

  return <TextField {...rest} errorText={error} value={value} onChange={localOnChange} />;
};
