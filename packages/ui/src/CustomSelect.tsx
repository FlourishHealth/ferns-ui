import React, {ReactElement, useEffect, useMemo, useState} from "react";

import {Box} from "./Box";
import {CustomSelectProps} from "./Common";
import {SelectList} from "./SelectList";
import {TextField} from "./TextField";

export const CustomSelect = ({
  value,
  onChange,
  placeholder,
  disabled,
  options,
}: CustomSelectProps): ReactElement | null => {
  const [customValue, setCustomValue] = useState(value);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Boolean that checks if customValue is a value from the
  // options prop or if it is a true custom value
  const isValueCustom: boolean = useMemo((): boolean => {
    // We add an empty value to protect against an empty string custom value or if the placeholder
    // value is selected
    return ![...options, {value: ""}].map((i) => i.value).includes(customValue);
  }, [options, customValue]);

  useEffect(() => {
    setShowCustomInput(isValueCustom);
    if (!showCustomInput) {
      setCustomValue(value);
    }
  }, [showCustomInput, value, isValueCustom]);

  // Custom select has 3 values - the overall field value, the value of the select menu,
  // and the value of the custom input
  const handleCustomSelectListChange = (newValue: string) => {
    // If "custom" is selected from the dropdown, toggle the custom input open and clear the
    // previous value
    if (newValue === "custom") {
      setShowCustomInput(true);
      setCustomValue(isValueCustom ? "custom" : newValue);
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
    <>
      <SelectList
        id="providedOptions"
        options={[...options, {label: "Custom", value: "custom"}]}
        placeholder={placeholder}
        value={isValueCustom ? "custom" : customValue}
        onChange={handleCustomSelectListChange}
      />
      {Boolean(showCustomInput) && (
        <Box paddingY={2}>
          <TextField
            disabled={disabled}
            id="customOptions"
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={(result) => onChange(result.value)}
          />
        </Box>
      )}
    </>
  );
};
