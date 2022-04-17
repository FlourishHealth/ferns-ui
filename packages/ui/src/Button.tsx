import debounce from "lodash/debounce";
import React from "react";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import {Box} from "./Box";
import {ButtonProps, Color, iconSizeToNumber} from "./Common";
// import {Icon} from "./Icon";
import {Text} from "./Text";
import {Unifier} from "./Unifier";
import {Icon} from "./Icon";
import {UnifiedTheme} from ".";

interface ButtonState {
  loading: boolean;
}

const buttonTextColor: {[buttonColor: string]: "white" | "darkGray"} = {
  blue: "white",
  lightGray: "darkGray",
  red: "white",
  transparent: "white",
  white: "darkGray",
  primary: "white",
  secondary: "white",
  accent: "white",
  tertiary: "white",
  facebook: "white",
  twitter: "white",
  google: "white",
};

export class Button extends React.Component<ButtonProps, ButtonState> {
  state = {loading: false};
  HEIGHTS = {
    sm: 36,
    md: 40,
    lg: 48,
  };

  getBackgroundColor(color: string) {
    if (this.props.type === "ghost" || this.props.type === "outline") {
      return "transparent";
    } else {
      return Unifier.theme[color as keyof UnifiedTheme];
    }
  }

  getTextColor(color: Color): Color {
    if (this.props.type === "ghost" || this.props.type === "outline") {
      return color;
    } else if (color === undefined) {
      return "darkGray";
    } else {
      return buttonTextColor[color] || "white";
    }
  }

  getBorderColor(color: string) {
    if (this.props.type === "outline") {
      return Unifier.theme[this.getTextColor(color as Color)];
    } else {
      return "transparent";
    }
  }

  render() {
    let color = this.props.color || "lightGray";
    if (color === "gray") {
      color = "lightGray";
    }
    return (
      <TouchableOpacity
        style={{
          alignSelf: this.props.inline === true ? undefined : "stretch",
          height: this.HEIGHTS[this.props.size || "md"],
          backgroundColor: this.getBackgroundColor(color),
          // width: this.props.inline === true ? undefined : "100%",
          flexShrink: this.props.inline ? 1 : 0,
          // flexGrow: this.props.inline ? 0 : 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          borderColor: this.getBorderColor(color),
          borderWidth: this.props.type === "outline" ? 2 : 0,
          opacity: this.props.disabled ? 0.4 : 1,
          flexDirection: "row",
          paddingHorizontal: 4 * 2,
        }}
        disabled={this.props.disabled || this.props.loading}
        onPress={debounce(
          async () => {
            Unifier.utils.haptic();
            this.setState({loading: true});
            try {
              if (this.props.onClick) {
                await this.props.onClick();
              }
            } catch (e) {
              this.setState({loading: false});
              throw e;
            }
            this.setState({loading: false});
          },
          500,
          {leading: true}
        )}
      >
        {this.props.icon !== undefined && (
          <Box paddingX={2}>
            <Icon
              prefix={this.props.iconPrefix || "far"}
              size={iconSizeToNumber(this.props.size)}
              name={this.props.icon}
              color={this.getTextColor(this.props.color as Color)}
            />
          </Box>
        )}
        {Boolean(this.props.children) && this.props.children}
        {Boolean(this.props.text) && (
          <Text
            weight="bold"
            color={this.getTextColor(color as Color)}
            size={this.props.size}
            skipLinking={true}
            inline={this.props.inline}
          >
            {this.props.text}
          </Text>
        )}
        {(this.state.loading || this.props.loading) && (
          <Box marginLeft={2}>
            <ActivityIndicator color={this.getTextColor(color as Color)} size="small" />
          </Box>
        )}
      </TouchableOpacity>
    );
  }
}
