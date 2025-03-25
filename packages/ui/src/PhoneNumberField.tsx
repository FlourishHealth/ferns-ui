import {AsYouType, parsePhoneNumberFromString} from "libphonenumber-js";
import React, {FC, useCallback, useEffect, useState} from "react";

import {PhoneNumberFieldProps} from "./Common";
import {TextField} from "./TextField";

export const PhoneNumberField: FC<PhoneNumberFieldProps> = ({
  errorText,
  iconName,
  placeholder,
  value,
  onChange,
  onBlur,
  defaultCountryCode = "US",
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string>(value || "");
  const [error, setError] = useState<string | undefined>(errorText);

  // Sync local state with incoming prop values
  useEffect(() => {
    setLocalValue(value || "");
    setError(errorText);
    // If the value is undefined on mount, initialize to an empty string to ensure first input
    // is recorded
    if (value === undefined) {
      onChange("");
    }
  }, [value, errorText, onChange]);

  const validatePhoneNumber = useCallback(
    (phoneNumber: string): string | undefined => {
      if (!phoneNumber || phoneNumber.trim() === "") {
        return undefined;
      }
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, defaultCountryCode);
      if (!parsedNumber) {
        return "Invalid phone number format";
      }
      if (!parsedNumber.isPossible()) {
        return "Phone number is not possible";
      }
      if (!parsedNumber.isValid()) {
        return "Phone number is not valid";
      }
      return undefined;
    },
    [defaultCountryCode]
  );

  const formatPhoneNumber = useCallback(
    (phoneNumber: string): string => {
      const asYouType = new AsYouType(defaultCountryCode);
      return asYouType.input(phoneNumber);
    },
    [defaultCountryCode]
  );

  const handleBlur = useCallback(
    (inputValue: string) => {
      if (onBlur) {
        onBlur(inputValue);
      }
      const validationError = validatePhoneNumber(inputValue);
      if (validationError) {
        setError(validationError);
      } else {
        setError(undefined);
      }
    },
    [onBlur, validatePhoneNumber]
  );

  const handleChange = useCallback(
    (inputValue: string) => {
      const formattedValue = formatPhoneNumber(inputValue);
      // By default, if a value is something like `"(123)"`
      // then Backspace would only erase the rightmost brace
      // becoming something like `"(123"`
      // which would give the same `"123"` value
      // which would then be formatted back to `"(123)"`
      // and so a user wouldn't be able to erase the phone number.
      // This is the workaround for that.
      if (inputValue !== formattedValue && inputValue.length !== 4) {
        setLocalValue(formattedValue);
      } else {
        setLocalValue(inputValue);
      }
      const validationError = validatePhoneNumber(formattedValue);
      if (error && !validationError) {
        setError(undefined);
      }

      // Ensure invalid values don't propagate up
      if (!validationError) {
        onChange(formattedValue);
      } else if (value === undefined) {
        onChange("");
      }
    },
    [onChange, error, validatePhoneNumber, formatPhoneNumber, value]
  );

  return (
    <TextField
      errorText={error}
      iconName={iconName}
      placeholder={placeholder}
      type="phoneNumber"
      value={localValue}
      onBlur={(inputValue) => handleBlur(inputValue)}
      onChange={(inputValue) => handleChange(inputValue)}
      {...rest}
    />
  );
};
