import React, {forwardRef, useContext, useImperativeHandle} from "react";
import {Text} from "react-native";

import {TableTextProps} from "../Common";
import {ThemeContext} from "../Theme";

export interface TableTextHandles {
  /**
   * Save the text field value.
   */
  handleSave: () => void | Promise<void>;
}

// TODO: Implement isEditing to TableText
export const TableText = forwardRef<TableTextHandles, TableTextProps>(
  ({isEditing, value, onSave}, ref) => {
    const {theme} = useContext(ThemeContext);

    if (isEditing) {
      console.warn("isEditing is not implemented yet.");
    }

    useImperativeHandle(ref, () => ({
      handleSave: () => {
        if (onSave) {
          onSave();
        }
      },
    }));

    return (
      <Text
        style={{
          color: theme.text.primary,
          fontFamily: theme.font.primary,
          fontSize: 14,
          textAlign: "left",
        }}
      >
        {value}
      </Text>
    );
  }
);

TableText.displayName = "TableText";
