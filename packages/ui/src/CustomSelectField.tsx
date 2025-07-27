import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {TextInput, View} from "react-native";

import {CustomSelectFieldProps} from "./Common";
import {FieldHelperText} from "./fieldElements";
import {SelectField} from "./SelectField";
import {TextField} from "./TextField";

export const CustomSelectField: FC<CustomSelectFieldProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  options,
  title,
  errorText,
  helperText,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const textInputRef = useRef<TextInput | null>(null);

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
      // Ensures the state updates and re-renders the component before focusing
      setTimeout(() => {
        textInputRef?.current?.focus();
      }, 100);
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
    <View
      accessibilityHint="Select an option or input a custom value"
      aria-label="Select dropdown with popup text input field"
      aria-role="combobox"
      style={{
        width: "100%",
      }}
    >
      <View
        accessibilityHint="Opens a dropdown menu. Select an option, or select custom to trigger popup to input a custom value"
        aria-label="Select dropdown"
        aria-role="button"
      >
        <SelectField
          disabled={disabled}
          errorText={errorText}
          options={[...options, {label: "Custom", value: "custom"}]}
          placeholder={placeholder}
          title={title}
          value={isValueCustom ? "custom" : currentValue}
          onChange={handleCustomSelectListChange}
        />
      </View>
      {Boolean(showCustomInput) && (
        <View
          accessibilityHint="Enter a custom value or go back to select a provided option."
          aria-label="Custom value input field"
          style={{
            paddingVertical: 16,
          }}
        >
          <TextField
            disabled={disabled}
            id="customOptions"
            inputRef={(ref: any) => (textInputRef.current = ref)}
            placeholder="None selected"
            type="text"
            value={value}
            onChange={onChange}
          />
        </View>
      )}
      {helperText && <FieldHelperText text={helperText} />}
    </View>
  );
};
