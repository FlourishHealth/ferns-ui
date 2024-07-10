import React, {FC} from "react";
import {Text} from "react-native";

import {TableNumberProps} from "../Common";
import {useTheme} from "../Theme";

// TODO: Implement isEditing to TableNumber
export const TableNumber: FC<TableNumberProps> = ({isEditing, value, align = "right"}) => {
  const {theme} = useTheme();

  if (isEditing) {
    console.warn("isEditing is not implemented yet.");
  }

  return (
    <Text
      style={{
        color: theme.text.primary,
        fontFamily: theme.font.primary,
        fontSize: 14,
        textAlign: align,
      }}
    >
      {value}
    </Text>
  );
};

TableNumber.displayName = "TableNumber";
