import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {View} from "react-native";

import {Box} from "./Box";
import {CustomSelectFieldProps} from "./Common";
import {FieldHelperText} from "./FieldElements";
import {SelectField} from "./SelectField";
import {TextField} from "./TextField";

export const CustomSelectField = ({
  value,
  onChange,
  placeholder,
  disabled,
  options,
  title,
  errorText,
  helperText,
}: CustomSelectFieldProps): ReactElement | null => {
  const [currentValue, setCurrentValue] = useState(value);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Boolean that checks if currentValue is a value from the
  // options prop or if it is a true custom value
  const isValueCustom: boolean = useMemo((): boolean => {
    if (!currentValue) {
      return false;
    }
    // We add an empty value to protect against an empty string custom value or if the placeholder
    // value is selected
    return ![...options, {value: ""}].map((i) => i.value).includes(currentValue);
  }, [options, currentValue]);

  // If the value is set to custom, show the custom input
  useEffect(() => {
    setShowCustomInput(isValueCustom);
    if (!showCustomInput) {
      setCurrentValue(value);
    }
  }, [showCustomInput, value, isValueCustom]);

  // Custom select has 3 values - the overall field value, the value of the select menu,
  // and the value of the custom input
  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleCustomSelectListChange = (newValue?: string) => {
    // If "custom" is selected from the dropdown, toggle the custom input open and clear the
    // previous value
    if (newValue === "custom") {
      setShowCustomInput(true);
      setCurrentValue(isValueCustom ? "custom" : newValue);
      onChange("");
    }

    // If any non-custom value is selected
    else {
      // Close the custom input if open and clear the value
      if (showCustomInput) {
        setShowCustomInput(false);
      }

      // Update the field value and select value
      onChange(newValue);
    }
  };

  return (
    <View>
      <SelectField
        errorText={errorText}
        options={[...options, {label: "Custom", value: "custom"}]}
        placeholder={placeholder}
        title={title}
        value={isValueCustom ? "custom" : currentValue}
        onChange={handleCustomSelectListChange}
      />
      {Boolean(showCustomInput) && (
        <Box paddingY={2}>
          <TextField
            disabled={disabled}
            id="customOptions"
            placeholderText="None selected"
            type="text"
            value={value}
            onChange={onChange}
          />
        </Box>
      )}
      {helperText && <FieldHelperText text={helperText} />}
    </View>
  );
};
