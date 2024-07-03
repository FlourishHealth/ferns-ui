import React, {forwardRef, useContext, useImperativeHandle, useState} from "react";
import {TouchableOpacity, View, ViewStyle} from "react-native";

import {CheckBox} from "..";
import {TableBooleanProps} from "../Common";
import {Icon} from "../Icon";
import {ThemeContext} from "../Theme";

export interface TableBooleanHandles {
  handleSave: () => void | Promise<void>;
}

export const TableBoolean = forwardRef<TableBooleanHandles, TableBooleanProps>(
  ({value, isEditing = false, onSave}, ref) => {
    const [checked, setChecked] = useState(value);
    const {theme} = useContext(ThemeContext);
    const valueString = checked ? "checked" : "unchecked";
    const oppositeValueString = checked ? "unchecked" : "checked";

    useImperativeHandle(ref, () => ({
      handleSave: () => {
        if (checked !== value) {
          onSave();
        }
      },
    }));

    const handlePress = () => {
      setChecked(!checked);
    };

    if (isEditing) {
      return (
        <TouchableOpacity
          accessibilityHint={`Tap to change the checkbox from ${oppositeValueString} to ${valueString}`}
          accessibilityLabel={`Checkbox is currently ${valueString}`}
          accessibilityRole="checkbox"
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={
            {
              alignItems: "center",
              justifyContent: "center",
              maxWidth: theme.table["mw-m"],
            } as ViewStyle
          }
          onPress={handlePress}
        >
          <CheckBox selected={checked} size="lg" />
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={
            {
              alignItems: "center",
              justifyContent: "center",
              maxWidth: theme.table["mw-m"],
            } as ViewStyle
          }
        >
          <View
            accessibilityHint={value ? "Checked icon" : "Unchecked icon"}
            accessibilityLabel={`The checkbox is ${valueString}`}
            accessibilityRole="image"
            style={{
              height: 32,
              width: 32,
              borderRadius: 16,
              backgroundColor: value ? theme.surface.successLight : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon color={value ? "success" : "secondaryLight"} iconName={value ? "check" : "x"} />
          </View>
        </View>
      );
    }
  }
);

TableBoolean.displayName = "TableBoolean";
