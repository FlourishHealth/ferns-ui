import React from "react";
import {MaskProps} from "./Common";

export class Mask extends React.Component<MaskProps, {}> {
  render() {
    // if (this.props.shape === "rounded") {
    //   return <Box style={{overflow: "hidden", borderRadius: 12}}>{this.props.children}</Box>;
    // } else if (this.props.shape === "circle") {
    //   return <Box style={{overflow: "hidden", borderRadius: 1000}}>{this.props.children}</Box>;
    // }
    // if (this.props.rounding) {
    //   let rounding = this.props.rounding === "circle" ? 100 : this.props.rounding;
    //   // Subtract 1 from rounding because of some very odd rendering.
    //   return (
    //     // <View style={{borderRadius: (rounding - 1) * 4, overflow: "visible"}}>
    //       <View>{this.props.children}</View>
    //     // </View>
    //   );
    // } else {
    return this.props.children;
    // }
  }
}
