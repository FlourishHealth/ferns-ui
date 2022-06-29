import React from "react";

import {FieldWithLabelsProps} from "./Common";
import RNPickerSelect from "./PickerSelect";
import {Unifier} from "./Unifier";

// Use "" if you want to have an "unset" value.
export type SelectListOptions = {label: string; value: string}[];
export interface SelectListProps extends FieldWithLabelsProps {
  id?: string;
  name?: string;
  options: SelectListOptions;
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
  size?: "md" | "lg";
  placeholder?: string;
}

export function SelectList({options, value, onChange}: SelectListProps) {
  return (
    <RNPickerSelect
      items={options}
      placeholder={{}}
      style={{
        viewContainer: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 50,
          width: "100%",
          // Add padding so the border doesn't mess up layouts
          paddingHorizontal: 6,
          paddingVertical: 4,
          borderColor: Unifier.theme.gray,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: Unifier.theme.white,
        },
      }}
      value={value}
      onValueChange={onChange}
    />
  );
}
