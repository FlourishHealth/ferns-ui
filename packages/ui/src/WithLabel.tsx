import React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {WithLabelProps} from "./Common";

export class WithLabel extends React.Component<WithLabelProps, {}> {
  render() {
    const {label, labelInline, labelColor, children} = this.props;
    // If show is undefined or true, show, only hide for actual false for simplicity.
    if (this.props.show === false) {
      return children;
    }
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
              <Text size={this.props.labelSize} color={labelColor || "darkGray"} weight="bold">
                {label}
              </Text>
            </Box>
          )}
          {children}
          {this.props.labelPlacement === "after" && (
            <Box paddingY={1}>
              <Text size={this.props.labelSize} color={labelColor || "darkGray"}>
                {label}
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
