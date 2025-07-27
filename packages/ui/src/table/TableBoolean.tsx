import React, {useCallback, useState} from "react";
import {TouchableOpacity, View, ViewStyle} from "react-native";

import {CheckBox} from "../CheckBox";
import {TableBooleanProps} from "../Common";
import {Icon} from "../Icon";
import {useTheme} from "../Theme";

export interface TableBooleanHandles {
  handleSave: () => void | Promise<void>;
}

export const TableBoolean: React.FC<TableBooleanProps> = ({value, isEditing = false}) => {
  const [checked, setChecked] = useState(value);
  const {theme} = useTheme();
  const valueString = checked ? "checked" : "unchecked";
  const oppositeValueString = checked ? "unchecked" : "checked";

  const handlePress = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  if (isEditing) {
    return (
      <TouchableOpacity
        accessibilityHint={`Tap to change the checkbox from ${oppositeValueString} to ${valueString}`}
        aria-label={`Checkbox is currently ${valueString}`}
        aria-role="checkbox"
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={
          {
            alignItems: "center",
            justifyContent: "center",
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
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <View
          accessibilityHint={value ? "Checked icon" : "Unchecked icon"}
          aria-label={`The checkbox is ${valueString}`}
          aria-role="image"
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
            backgroundColor: value ? theme.surface.successLight : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon color={value ? "success" : "error"} iconName={value ? "check" : "x"} />
        </View>
      </View>
    );
  }
};

TableBoolean.displayName = "TableBoolean";
