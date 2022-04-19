/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box } from "./Box";
import { Icon } from "./Icon";
/*
Originally based on https://github.com/pinterest/gestalt
Forked, added type definitions, and added features.
*/
// TOOD: create styles
// :root {
//   --lightGray: #efefef;
//   --gray: #8e8e8e;
//   --darkGray: #111;
// }
// .pog {
//   composes: circle from "./Borders.module.css";
//   composes: flex from "./Layout.module.css";
//   composes: itemsCenter from "./Layout.module.css";
//   composes: justifyCenter from "./Layout.module.css";
// }
// .focused {
//   composes: accessibilityOutlineFocus from "./Focus.module.css";
// }
// .selected {
//   composes: darkGrayBg from "./Colors.module.css";
// }
// .transparent {
//   composes: transparentBg from "./Colors.module.css";
// }
// .transparentDarkGray {
//   composes: transparentDarkGrayBg from "./Colors.module.css";
// }
// .transparent.hovered,
// .transparent.focused,
// .white.hovered,
// .white.focused {
//   background-color: rgba(0, 0, 0, 0.06);
// }
// .transparent.active,
// .white.active {
//   background-color: rgba(0, 0, 0, 0.1);
// }
// .transparentDarkGray.hovered,
// .transparentDarkGray.focused {
//   background-color: var(--darkGray);
// }
// .transparentDarkGray.active {
//   background-color: var(--darkGray);
// }
// .white {
//   composes: whiteBg from "./Colors.module.css";
// }
// .white.hovered,
// .white.focused {
//   background-color: #f0f0f0;
// }
// .white.active {
//   background-color: #e5e5e5;
// }
// .lightGray {
//   composes: lightGrayBg from "./Colors.module.css";
// }
// .lightGray.hovered,
// .lightGray.focused {
//   background-color: #e2e2e2;
// }
// .lightGray.active {
//   background-color: #dadada;
// }
// .gray {
//   composes: grayBg from "./Colors.module.css";
// }
// .gray.hovered,
// .gray.focused {
//   background-color: #878787;
// }
// .gray.active {
//   background-color: #828282;
// }
// .darkGray {
//   composes: darkGrayBg from "./Colors.module.css";
// }
// .blue {
//   composes: blueBg from "./Colors.module.css";
// }
// .blue.hovered,
// .blue.focused {
//   background-color: #4a8ad4;
// }
// .blue.active {
//   background-color: #4a85c9;
// }
const styles = {
    pog: "",
    selected: "",
    active: "",
    focused: "",
    hovered: "",
};
const SIZE_NAME_TO_PIXEL = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
};
const defaultIconButtonIconColors = {
    blue: "white",
    darkGray: "white",
    gray: "white",
    lightGray: "gray",
    transparent: "gray",
    transparentDarkGray: "white",
    white: "gray",
};
export default function Pog(props) {
    const { active = false, bgColor = "transparent", focused = false, hovered = false, iconColor, icon, iconPrefix = "fas", selected = false, size = "md", } = props;
    const iconSize = SIZE_NAME_TO_PIXEL[size] / 2;
    const color = (selected && "white") ||
        iconColor ||
        defaultIconButtonIconColors[bgColor] ||
        "white";
    const inlineStyle = {
        height: SIZE_NAME_TO_PIXEL[size],
        width: SIZE_NAME_TO_PIXEL[size],
    };
    // const classes = classnames(styles.pog, {
    //   [styles[bgColor]]: !selected,
    //   [styles.selected]: selected,
    //   [styles.active]: active,
    //   [styles.focused]: focused,
    //   [styles.hovered]: hovered && !focused && !active,
    // });
    return (React.createElement("div", { style: inlineStyle },
        React.createElement(Box, { rounding: "circle" },
            React.createElement(Icon
            // accessibilityLabel=""
            , { 
                // accessibilityLabel=""
                color: color, 
                // dangerouslySetSvgPath={dangerouslySetSvgPath}
                name: icon, prefix: iconPrefix, size: iconSize }))));
}
//# sourceMappingURL=Pog.js.map