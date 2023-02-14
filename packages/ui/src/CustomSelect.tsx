import React, {ReactElement, useEffect, useState} from "react";

import {Box} from "./Box";
import {SelectList} from "./SelectList";
import {TextField} from "./TextField";

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{label: string; value: string}>;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  labelColor?: string;
}

export const CustomSelect = ({
  value,
  onChange,
  placeholder,
  disabled,
  options,
}: CustomSelectProps): ReactElement | null => {
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (!showCustomInput) {
      setCustomValue(value);
    }
  }, [showCustomInput, value]);

  // Custom select has 3 values - the overall field value, the value of the select menu, and the value of the custom input
  const handleCustomSelectListChange = (newValue: string) => {
    // If "custom" is selected from the dropdown, toggle the custom input open and clear the previous value
    if (newValue === "custom") {
      setShowCustomInput(true);
      setCustomValue("custom");
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
        value={customValue}
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
