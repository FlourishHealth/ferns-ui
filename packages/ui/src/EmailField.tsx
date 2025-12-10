import React, {FC, useCallback, useEffect, useState} from "react";

import {EmailFieldProps} from "./Common";
import {TextField} from "./TextField";

export const EmailField: FC<EmailFieldProps> = ({
  errorText,
  iconName,
  placeholder,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string>(value || "");

  // Sync local state with incoming prop values
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const validateEmail = useCallback((email: string): string | undefined => {
    if (email.trim() === "") {
      return undefined;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address format";
    }
    return undefined;
  }, []);

  const localOnChange = useCallback(
    (e: string) => {
      setLocalValue(e);
      const err = validateEmail(e);
      if (!err && onChange) {
        onChange(e);
      }
    },
    [onChange, validateEmail, setLocalValue]
  );

  const localOnBlur = useCallback(
    (e: string) => {
      setLocalValue(e);
      const err = validateEmail(e);
      if (!err && onBlur) {
        onBlur(e);
      }
    },
    [onBlur, validateEmail]
  );
  return (
    <TextField
      errorText={errorText || validateEmail(localValue)}
      iconName={iconName}
      placeholder={placeholder}
      type="email"
      value={localValue}
      onBlur={localOnBlur}
      onChange={localOnChange}
      {...rest}
    />
  );
};
