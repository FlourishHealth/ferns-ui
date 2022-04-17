import React from "react";
import {Switch as NativeSwitch} from "react-native";
import {SwitchProps} from "./Common";
import {WithLabel} from "./WithLabel";

export class Switch extends React.Component<SwitchProps, {}> {
  render() {
    return (
      <WithLabel labelJustifyContent="between" labelInline={true} {...this.props}>
        <NativeSwitch
          disabled={this.props.disabled}
          onValueChange={this.props.onChange}
          value={this.props.switched}
        />
      </WithLabel>
    );
  }
}
