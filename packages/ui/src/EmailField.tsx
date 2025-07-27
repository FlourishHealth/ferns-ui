import React, {useCallback, useEffect, useState} from "react";

import {EmailFieldProps} from "./Common";
import {TextField} from "./TextField";

export const EmailField: React.FC<EmailFieldProps> = ({
  errorText,
  iconName,
  placeholder,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string>(value || "");
  const [error, setError] = useState<string | undefined>(errorText);

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

  // Sync local state with incoming prop values
  useEffect(() => {
    setLocalValue(value || "");
    setError(errorText);
  }, [value, errorText]);

  const handleBlur = useCallback(
    (email: string) => {
      if (onBlur) {
        onBlur(email);
      }
      const validationError = validateEmail(email);
      if (validationError) {
        setError(validationError);
      } else {
        setError(undefined);
      }
    },
    [onBlur, validateEmail]
  );

  const handleChange = useCallback(
    (email: string) => {
      setLocalValue(email);
      const validationError = validateEmail(email);
      if (error && !validationError) {
        setError(undefined);
      }
      if (!validationError) {
        onChange(email);
      }
    },
    [onChange, error, validateEmail]
  );

  return (
    <TextField
      errorText={error}
      iconName={iconName}
      placeholder={placeholder}
      type="email"
      value={localValue}
      onBlur={(e) => {
        handleBlur(e);
        if (onBlur) {
          onBlur(value || "");
        }
      }}
      onChange={(e) => {
        handleChange(e);
        if (onChange) {
          onChange;
        }
      }}
      {...rest}
    />
  );
};
