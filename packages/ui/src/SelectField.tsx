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
  requireValue,
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
        items={!requireValue ? [clearOption, ...options] : options}
        placeholder={!requireValue ? {label: placeholder, value: ""} : {}}
        value={value ?? ""}
        onValueChange={(v) => {
          if (v === "" && !requireValue) {
            (onChange as (val: string | undefined) => void)(undefined);
          } else {
            onChange(v);
          }
        }}
      />
      {helperText && <FieldHelperText text={helperText} />}
    </View>
  );
};
