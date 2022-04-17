import {BoxProps} from "./Common";
import React from "react";
import {Box} from "./Box";

export class Card extends React.Component<BoxProps, {}> {
  render() {
    return (
      <Box
        direction="column"
        display="flex"
        color={this.props.color || "white"}
        rounding={3}
        shadow={true}
        padding={this.props.padding || 4}
        width={this.props.width}
        {...this.props}
      >
        {this.props.children}
      </Box>
    );
  }
}
