import React, {forwardRef, useContext, useImperativeHandle} from "react";
import {Text} from "react-native";

import {TableNumberProps} from "../Common";
import {ThemeContext} from "../Theme";

export interface TableNumberHandles {
  /**
   * Save the text field value.
   */
  handleSave: () => void | Promise<void>;
}

// TODO: Implement isEditing to TableNumber
export const TableNumber = forwardRef<TableNumberHandles, TableNumberProps>(
  ({isEditing, value, onSave, align = "right"}, ref) => {
    const {theme} = useContext(ThemeContext);

    if (isEditing) {
      console.warn("isEditing is not implemented yet.");
    }

    useImperativeHandle(ref, () => ({
      handleSave: () => {
        onSave?.();
      },
    }));

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
  }
);

TableNumber.displayName = "TableNumber";
