import debounce from "lodash/debounce";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Box } from "./Box";
import { iconSizeToNumber } from "./Common";
// import {Icon} from "./Icon";
import { Text } from "./Text";
import { Unifier } from "./Unifier";
import { Icon } from "./Icon";
const buttonTextColor = {
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
export class Button extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { loading: false };
        this.HEIGHTS = {
            sm: 36,
            md: 40,
            lg: 48,
        };
    }
    getBackgroundColor(color) {
        if (this.props.type === "ghost" || this.props.type === "outline") {
            return "transparent";
        }
        else {
            return Unifier.theme[color];
        }
    }
    getTextColor(color) {
        if (this.props.type === "ghost" || this.props.type === "outline") {
            return color;
        }
        else if (color === undefined) {
            return "darkGray";
        }
        else {
            return buttonTextColor[color] || "white";
        }
    }
    getBorderColor(color) {
        if (this.props.type === "outline") {
            return Unifier.theme[this.getTextColor(color)];
        }
        else {
            return "transparent";
        }
    }
    render() {
        let color = this.props.color || "lightGray";
        if (color === "gray") {
            color = "lightGray";
        }
        return (React.createElement(TouchableOpacity, { style: {
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
            }, disabled: this.props.disabled || this.props.loading, onPress: debounce(async () => {
                Unifier.utils.haptic();
                this.setState({ loading: true });
                try {
                    if (this.props.onClick) {
                        await this.props.onClick();
                    }
                }
                catch (e) {
                    this.setState({ loading: false });
                    throw e;
                }
                this.setState({ loading: false });
            }, 500, { leading: true }) }, this.props.icon !== undefined && (React.createElement(Box, { paddingX: 2 }, React.createElement(Icon, { prefix: this.props.iconPrefix || "far", size: iconSizeToNumber(this.props.size), name: this.props.icon, color: this.getTextColor(this.props.color) }))), Boolean(this.props.children) && this.props.children, Boolean(this.props.text) && (React.createElement(Text, { weight: "bold", color: this.getTextColor(color), size: this.props.size, skipLinking: true, inline: this.props.inline }, this.props.text)), (this.state.loading || this.props.loading) && (React.createElement(Box, { marginLeft: 2 }, React.createElement(ActivityIndicator, { color: this.getTextColor(color), size: "small" })))));
    }
}
//# sourceMappingURL=Button.js.map
//# sourceMappingURL=Button.js.map