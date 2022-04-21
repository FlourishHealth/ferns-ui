import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { iconSizeToNumber } from "./Common";
import { Unifier } from "./Unifier";
export function initIcons() {
    console.debug("Initializing icons");
}
const iconSet = new Set();
// TODO: Update <Icon /> to be closer to Expo's Vector Icon, letting multiple icon packs be used, etc.
export class Icon extends React.Component {
    render() {
        const color = Unifier.theme[this.props.color || "primary"];
        const size = iconSizeToNumber(this.props.size);
        return React.createElement(FontAwesome, { color: color, name: this.props.name, size: size });
    }
}
//# sourceMappingURL=Icon.js.map