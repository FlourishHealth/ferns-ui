import React from "react";

import {Box} from "./Box";
import {WithLabelProps} from "./Common";
import {Text} from "./Text";

export class WithLabel extends React.Component<WithLabelProps, {}> {
  render() {
    const {label, labelInline, labelColor, children} = this.props;
    // If show is undefined or true, show, only hide for actual false for simplicity.

    if (!children) {
      return null;
    }

    if (label) {
      return (
        <Box
          direction={labelInline ? "row" : "column"}
          justifyContent={this.props.labelJustifyContent}
          width="100%"
        >
          {this.props.labelPlacement !== "after" && (
            <Box paddingY={1}>
              <Text color={labelColor || "darkGray"} size={this.props.labelSize} weight="bold">
                {this.props.show !== false ? label : " "}
              </Text>
            </Box>
          )}
          {children}
          {this.props.labelPlacement === "after" && (
            <Box paddingY={1}>
              <Text color={labelColor || "darkGray"} size={this.props.labelSize}>
                {this.props.show !== false ? label : " "}
              </Text>
            </Box>
          )}
        </Box>
      );
    } else {
      return children;
    }
  }
}
