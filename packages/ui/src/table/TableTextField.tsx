import React, {forwardRef, useContext, useImperativeHandle} from "react";
import {Text, View, ViewStyle} from "react-native";

import {TableTextFieldProps} from "../Common";
import {ThemeContext} from "../Theme";

export interface TableTextFieldHandles {
  /**
   * Save the text field value.
   */
  handleSave: () => void | Promise<void>;
}

// TODO: Implement isEditing to TableTextField
export const TableTextField = forwardRef<TableTextFieldHandles, TableTextFieldProps>(
  ({isEditing, value, variant, onSave}, ref) => {
    const {theme} = useContext(ThemeContext);
    // const [text, setText] = useState(value);

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
      <View
        style={
          {
            maxWidth: variant === "multi" ? theme.table["mw-xl"] : theme.table["mw-s"],
          } as ViewStyle
        }
      >
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
      </View>
    );
  }
);

TableTextField.displayName = "TableTextField";

// export const TableTextField = (): React.ReactElement => {
//   return <Box />;
// };
