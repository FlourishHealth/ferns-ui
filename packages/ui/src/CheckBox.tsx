// import {library} from "@fortawesome/fontawesome-svg-core";
// import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {Box} from "./Box";
import {CheckBoxProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";

// library.add(faCheck);

export class CheckBox extends React.Component<CheckBoxProps, {}> {
  renderCheckBox() {
    return (
      <Box
        border={this.props.color || "darkGray"}
        color={this.props.checked ? this.props.color || "darkGray" : "white"}
        height={this.props.size === "sm" ? 16 : 24}
        rounding={this.props.radio ? "circle" : 3}
        width={this.props.size === "sm" ? 16 : 24}
        onClick={() => {
          this.props.onChange({value: !this.props.checked});
          this.props.onClick && this.props.onClick();
        }}
      >
        <Box
          alignItems="center"
          direction="column"
          display="flex"
          height="100%"
          justifyContent="center"
          width="100%"
        >
          {this.props.checked && (
            <Icon
              color="white"
              name="check"
              prefix="fas"
              size={this.props.size === "sm" ? 7 : 10}
            />
          )}
        </Box>
      </Box>
    );
  }

  render() {
    return (
      <Box
        alignItems="center"
        direction="row"
        display="flex"
        maxHeight={60}
        paddingY={1}
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          maxWidth={this.props.size === "sm" ? 14 : 20}
          width={this.props.size === "sm" ? 14 : 20}
        >
          {this.renderCheckBox()}
        </Box>
        <Box
          direction="column"
          display="flex"
          height="100%"
          justifyContent="center"
          marginLeft={4}
          onClick={() => {
            this.props.onChange({value: !this.props.checked});
            this.props.onClick && this.props.onClick();
          }}
        >
          <Text
            color={this.props.labelColor || "darkGray"}
            numberOfLines={this.props.subLabel ? 1 : 2}
            size={this.props.size}
            weight="bold"
          >
            {this.props.label}
          </Text>
          {Boolean(this.props.subLabel) && (
            <Text color={this.props.labelColor || "darkGray"} size="sm" weight="bold">
              {this.props.subLabel}
            </Text>
          )}
        </Box>
      </Box>
    );
  }
}
