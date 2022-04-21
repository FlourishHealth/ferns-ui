import {FontAwesome} from "@expo/vector-icons";
import React from "react";

import {iconNumberToSize, IconProps, iconSizeToNumber} from "./Common";
import {Unifier} from "./Unifier";

export function initIcons() {
  console.debug("Initializing icons");
}

const iconSet = new Set();

// TODO: Update <Icon /> to be closer to Expo's Vector Icon, letting multiple icon packs be used, etc.
export class Icon extends React.Component<IconProps, {}> {
  render() {
    const color = Unifier.theme[this.props.color || "primary"];
    const size = iconSizeToNumber(this.props.size);
    return <FontAwesome color={color} name={this.props.name as any} size={size} />;
  }
}
