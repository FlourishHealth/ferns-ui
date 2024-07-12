import React, {FC} from "react";
import {View} from "react-native";

import {SelectFieldProps} from "./Common";
import {FieldError, FieldHelperText, FieldTitle} from "./FieldElements";
import {RNPickerSelect} from "./PickerSelect";

export const SelectField: FC<SelectFieldProps> = ({
  disabled = false,
  errorText,
  helperText,
  options,
  placeholder = "Please select an option.",
  title,
  value,
  onChange,
}) => {
  const clearOption = {label: value ? "---" : placeholder, value: ""};

  return (
    <View>
      {title && <FieldTitle text={title} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
      <RNPickerSelect
        disabled={disabled}
        items={value ? [clearOption, ...options] : options}
        placeholder={!value ? {label: placeholder, value: ""} : {}}
        value={value ?? ""}
        onValueChange={(v) => {
          if (v === "") {
            onChange(undefined);
          } else {
            onChange(v);
          }
        }}
      />
      {helperText && <FieldHelperText text={helperText} />}
    </View>
  );
};
