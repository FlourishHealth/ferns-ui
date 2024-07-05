import React, {forwardRef, useImperativeHandle, useState} from "react";
import {View} from "react-native";

import {Badge} from "../Badge";
import {TableBadgeProps} from "../Common";
import {SelectField} from "../SelectField";

export interface TableBadgeHandles {
  handleSave: () => void | Promise<void>;
}

// TODO: Support error state in TableBadge
export const TableBadge = forwardRef<TableBadgeHandles, TableBadgeProps>(
  (
    {value, badgeStatus = "info", badgeIconName, isEditing = false, editingOptions, onSave},
    ref
  ) => {
    const [selected, setSelected] = useState<string | undefined>(value);

    useImperativeHandle(ref, () => ({
      handleSave: () => {
        if (onSave) {
          onSave(selected);
        }
      },
    }));

    const handleChange = (newVal: string | undefined) => {
      if (newVal === "") {
        setSelected(undefined);
      } else {
        setSelected(newVal);
      }
    };

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isEditing && editingOptions ? (
          <SelectField options={editingOptions} value={selected} onChange={handleChange} />
        ) : (
          <Badge iconName={badgeIconName} secondary status={badgeStatus} value={value} />
        )}
      </View>
    );
  }
);

TableBadge.displayName = "TableBadge";
