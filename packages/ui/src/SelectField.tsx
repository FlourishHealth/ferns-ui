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
  requireValue = false,
  placeholder = "Please select an option.",
  title,
  value,
  onChange,
}) => {
  const clearOption = {label: placeholder ?? "---", value: ""};

  return (
    <View>
      {title && <FieldTitle text={title} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
      <RNPickerSelect
        disabled={disabled}
        items={options}
        placeholder={!requireValue ? clearOption : {}}
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
