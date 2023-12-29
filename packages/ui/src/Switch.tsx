import React from "react";
import {Switch as NativeSwitch} from "react-native";

import {SwitchProps} from "./Common";
import {WithLabel} from "./WithLabel";

export function Switch({disabled, switched, onChange, ...rest}: SwitchProps): React.ReactElement {
  return (
    <WithLabel labelAlignItems="center" labelInline labelJustifyContent="between" {...rest}>
      <NativeSwitch disabled={disabled} value={switched} onValueChange={onChange} />
    </WithLabel>
  );
}
