import React, {FC, useContext} from "react";
import {Text} from "react-native";

import {TableTextProps} from "../Common";
import {ThemeContext} from "../Theme";

// TODO: Implement isEditing to TableText
export const TableText: FC<TableTextProps> = ({isEditing, value, align}) => {
  const {theme} = useContext(ThemeContext);

  if (isEditing) {
    console.warn("isEditing is not implemented yet.");
  }

  return (
    <Text
      style={{
        color: theme.text.primary,
        fontFamily: "text",
        fontSize: 14,
        textAlign: align,
      }}
    >
      {value}
    </Text>
  );
};

TableText.displayName = "TableText";
