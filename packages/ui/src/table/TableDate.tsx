import {DateTime} from "luxon";
import React, {forwardRef, useContext, useImperativeHandle, useState} from "react";
import {Text, View, ViewStyle} from "react-native";

import {TableDateProps} from "../Common";
import {TextField} from "../TextField";
import {ThemeContext} from "../Theme";
export interface TableDateHandles {
  canSave: () => boolean;
}

export const TableDate = forwardRef<TableDateHandles, TableDateProps>(
  ({value, annotated = false, isEditing = false}, ref) => {
    const {theme} = useContext(ThemeContext);
    const initialDate =
      typeof value === "string" ? DateTime.fromISO(value) : DateTime.fromJSDate(value);
    const [dateVal] = useState(initialDate);
    const [editDate, setEditDate] = useState<any>(initialDate?.toFormat("MM/dd/yyyy"));
    const [errorMessage, setErrorMessage] = useState("");

    const formatDate = (date: DateTime) => {
      const now = DateTime.now();
      const diff = now.diff(date, ["years", "months", "days"]).toObject();

      let diffString = "";
      if (diff.years) {
        diffString += `${Math.floor(diff.years)} Year${Math.floor(diff.years) > 1 ? "s" : ""} `;
      }
      if (diff.months) {
        diffString += `${Math.floor(diff.months)} Mo${Math.floor(diff.months) > 1 ? "s" : ""} `;
      }
      if (diff.days) {
        diffString += `${Math.floor(diff.days)} Day${Math.floor(diff.days) > 1 ? "s" : ""}`;
      }

      return `${date.toFormat("MM/dd/yyyy")} (${diffString.trim()})`;
    };

    function isValidDate(newDateStr: string) {
      const dateFormatted = DateTime.fromFormat(newDateStr, "MM/dd/yyyy");
      return dateFormatted.isValid;
    }

    useImperativeHandle(ref, () => ({
      canSave: () => {
        return errorMessage === "";
      },
    }));

    return (
      <View
        style={
          {
            maxWidth: annotated ? theme.table["mw-l"] : theme.table["mw-m"],
          } as ViewStyle
        }
      >
        {isEditing ? (
          <TextField
            errorText={errorMessage}
            value={editDate}
            onChange={(res) => {
              if (!isValidDate(res.value)) {
                setErrorMessage("Invalid date. Please use MM/DD/YYYY.");
              } else {
                setErrorMessage("");
              }
              setEditDate(res.value);
            }}
          />
        ) : (
          <View style={{paddingHorizontal: 4, paddingVertical: theme.table.padV} as ViewStyle}>
            <Text style={{fontSize: 16}}>
              {annotated ? formatDate(dateVal) : dateVal.toFormat("MM/dd/yyyy")}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

// if onsave is triggered only run if error message is empty
// if error message is not empty, do not run onsave
// const ParentComponent = () => {
//   const tableDateRef = useRef<TableDateHandles>(null);

//   const onSave = () => {
//     // Check if saving is allowed
//     if (tableDateRef.current?.canSave()) {
//       console.log("Proceed with save operation");
//       // Implement save logic here
//     } else {
//       console.log("Cannot save due to errors");
//     }
//   };

//   return (
//     <div>
//       <TableDate ref={tableDateRef} errorMessage="" />
//       {/* Trigger onSave from somewhere in this parent component */}
//     </div>
//   );
// };

TableDate.displayName = "TableDate";
