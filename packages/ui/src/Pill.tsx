import React from "react";

import {Box} from "./Box";
import {PillProps} from "./Common";
import {Text} from "./Text";

export class Pill extends React.Component<PillProps, {}> {
  render() {
    return (
      <Box
        border={this.props.color}
        color={this.props.enabled ? this.props.color : "white"}
        paddingX={4}
        paddingY={2}
        rounding="pill"
        onClick={() => this.props.onClick(!this.props.enabled)}
      >
        <Text align="center" color={this.props.enabled ? "white" : this.props.color}>
          {this.props.text}
        </Text>
      </Box>
    );
  }
}
