import React from "react";

import {FieldWithLabelsProps} from "./Common";
import RNPickerSelect from "./PickerSelect";
import {Unifier} from "./Unifier";

export type SelectListOptions = {label: string; value: string | undefined}[];
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

export class SelectList extends React.Component<SelectListProps, {}> {
  state = {showing: false};

  render() {
    return (
      <RNPickerSelect
        items={this.props.options}
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
        value={this.props.value}
        onValueChange={this.props.onChange}
      />
    );
  }
}
