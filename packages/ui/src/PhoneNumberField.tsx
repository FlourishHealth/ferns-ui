import {AsYouType, parsePhoneNumberFromString} from "libphonenumber-js";
import React, {FC, useCallback, useState} from "react";

import {PhoneNumberFieldProps} from "./Common";
import {TextField} from "./TextField";

export const PhoneNumberField: FC<PhoneNumberFieldProps> = ({
  errorText,
  iconName,
  placeholderText,
  value,
  onChange,
  onBlur,
  defaultCountryCode = "US",
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<string>(value || "");
  const [error, setError] = useState<string | undefined>(errorText);

  const validatePhoneNumber = useCallback(
    (phoneNumber: string): string | undefined => {
      if (phoneNumber.trim() === "") {
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
      setLocalValue(formattedValue);
      const validationError = validatePhoneNumber(formattedValue);
      if (error && !validationError) {
        setError(undefined);
      }
      if (!validationError) {
        onChange(formattedValue);
      } else {
        onChange(""); // Ensure invalid values don't propagate up
      }
    },
    [onChange, error, validatePhoneNumber, formatPhoneNumber]
  );

  return (
    <TextField
      errorText={error}
      iconName={iconName}
      placeholderText={placeholderText}
      type="phoneNumber"
      value={localValue}
      onBlur={(inputValue) => handleBlur(inputValue)}
      onChange={(inputValue) => handleChange(inputValue)}
      {...rest}
    />
  );
};
