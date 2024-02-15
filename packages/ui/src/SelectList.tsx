import React, {useContext} from "react";
import {Platform, StyleProp} from "react-native";

import {FieldWithLabelsProps} from "./Common";
import {Icon} from "./Icon";
import {RNPickerSelect, RNPickerSelectProps} from "./PickerSelect";
import {ThemeContext} from "./Theme";
import {WithLabel} from "./WithLabel";

// Use "" if you want to have an "unset" value.
export type SelectListOptions = {label: string; value: string}[];
export interface SelectListProps extends FieldWithLabelsProps {
  id?: string;
  name?: string;
  options: SelectListOptions;
  // TODO: Update types for SelectList so that value can be undefined only if allowClear is true.
  onChange: (value?: string) => void;
  value?: string;
  disabled?: boolean;
  size?: "md" | "lg";
  placeholder?: string;
  style?: StyleProp<RNPickerSelectProps["style"]>;
  allowClear?: boolean;
}

export const SelectList = ({
  options,
  value,
  onChange,
  label,
  labelColor,
  style,
  placeholder,
  disabled,
  allowClear,
}: SelectListProps) => {
  const {theme} = useContext(ThemeContext);

  const withLabelProps = {label, labelColor};

  let backgroundColor = style?.backgroundColor || theme.white;
  if (disabled) {
    backgroundColor = theme.lightGray;
  }

  return (
    <WithLabel {...withLabelProps}>
      <RNPickerSelect
        Icon={() => {
          // Icon only needed for iOS, web and android use default icons
          return Platform.OS === "ios" ? (
            <Icon color="darkGray" name="angle-down" size="md" />
          ) : null;
        }}
        disabled={disabled}
        items={allowClear ? [{label: placeholder ?? "---", value: ""}, ...options] : options}
        placeholder={placeholder ? {label: placeholder, value: ""} : {}}
        style={{
          viewContainer: {
            flexDirection: style?.flexDirection || "row",
            justifyContent: style?.justifyContent || "center",
            alignItems: style?.alignItems || "center",
            minHeight: style?.minHeight || 50,
            width: style?.width || "100%",
            borderColor: style?.borderColor || theme.gray,
            borderWidth: style?.borderWidth || 1,
            borderRadius: style?.borderRadius || 5,
            backgroundColor,
          },
          inputIOS: {
            paddingVertical: 12,
            paddingHorizontal: 10,
            paddingRight: 30,
          },
          iconContainer: {
            top: 13,
            right: 10,
            bottom: 12,
            paddingLeft: 40,
          },
          inputWeb: {
            // Add padding so the border doesn't mess up layouts
            paddingHorizontal: style?.paddingHorizontal || 6,
            paddingVertical: style?.paddingVertical || 4,
            borderRadius: style?.borderRadius || 5,
          },
        }}
        value={value}
        onValueChange={(v) => {
          if (allowClear && value === "") {
            onChange(undefined);
          } else {
            onChange(v);
          }
        }}
      />
    </WithLabel>
  );
};
