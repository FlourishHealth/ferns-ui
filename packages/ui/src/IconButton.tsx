import React from "react";
import {TouchableOpacity} from "react-native";
import {Icon} from "./Icon";
import {IconButtonProps, iconSizeToNumber} from "./Common";
import {Unifier} from "./Unifier";

export class IconButton extends React.Component<IconButtonProps, {}> {
  render() {
    let opacity = 1;
    let color;
    if (this.props.bgColor === "transparentDarkGray") {
      opacity = 0.8;
      color = Unifier.theme["darkGray"];
    } else if (this.props.bgColor === "transparent" || !this.props.bgColor) {
      opacity = 0.0;
      color = Unifier.theme.white;
    } else {
      color = Unifier.theme[this.props.bgColor];
    }
    return (
      <TouchableOpacity
        onPress={() => {
          Unifier.utils.haptic();
          this.props.onClick();
        }}
        style={{
          opacity: opacity,
          backgroundColor: color,
          borderRadius: 100,
          // paddingBottom: iconSizeToNumber(this.props.size) / 4,
          // paddingTop: iconSizeToNumber(this.props.size) / 4,
          // paddingLeft: iconSizeToNumber(this.props.size) / 2,
          // paddingRight: iconSizeToNumber(this.props.size) / 2,
          width: iconSizeToNumber(this.props.size) * 2.5,
          height: iconSizeToNumber(this.props.size) * 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      >
        <Icon
          prefix={this.props.prefix || "fas"}
          size={iconSizeToNumber(this.props.size)}
          name={this.props.icon}
          color={this.props.iconColor}
        />
      </TouchableOpacity>
    );
  }
}
