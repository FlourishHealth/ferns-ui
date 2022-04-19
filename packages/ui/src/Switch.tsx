import React from "react";
import {Switch as NativeSwitch} from "react-native";

import {SwitchProps} from "./Common";
import {WithLabel} from "./WithLabel";

export class Switch extends React.Component<SwitchProps, {}> {
  render() {
    return (
      <WithLabel labelInline labelJustifyContent="between" {...this.props}>
        <NativeSwitch
          disabled={this.props.disabled}
          value={this.props.switched}
          onValueChange={this.props.onChange}
        />
      </WithLabel>
    );
  }
}
