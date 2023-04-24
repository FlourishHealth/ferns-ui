import React from "react";
import {View} from "react-native";

import {MaskProps, ReactChildren} from "./Common";

export function Mask(props: MaskProps): ReactChildren {
  if (props.shape === "rounded") {
    return <View style={{overflow: "hidden", borderRadius: 12}}>{props.children}</View>;
  } else if (props.shape === "circle") {
    return <View style={{overflow: "hidden", borderRadius: 1000}}>{props.children}</View>;
  }
  if (props.rounding) {
    const rounding = props.rounding === "circle" ? 100 : props.rounding;
    // Subtract 1 from rounding because of some very odd rendering.
    return (
      <View style={{borderRadius: (rounding - 1) * 4, overflow: "visible"}}>{props.children}</View>
    );
  } else {
    return props.children || null;
  }
}
