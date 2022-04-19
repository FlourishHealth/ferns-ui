import React from "react";

import {Box} from "./Box";
import {BoxProps} from "./Common";

export class Card extends React.Component<BoxProps, {}> {
  render() {
    return (
      <Box
        color={this.props.color || "white"}
        direction="column"
        display="flex"
        padding={this.props.padding || 4}
        rounding={3}
        shadow
        width={this.props.width}
        {...this.props}
      >
        {this.props.children}
      </Box>
    );
  }
}
