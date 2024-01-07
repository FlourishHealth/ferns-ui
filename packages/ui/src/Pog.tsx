/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import {Box} from "./Box";
import {AllColors, PogProps} from "./Common";
import {Icon} from "./Icon";

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

export default function Pog(props: PogProps) {
  const {
    bgColor = "transparent",
    iconColor,
    icon,
    iconPrefix = "fas",
    selected = false,
    size = "md",
  } = props;

  const color =
    (selected && "white") ||
    iconColor ||
    (defaultIconButtonIconColors[bgColor] as AllColors) ||
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

  return (
    <div style={inlineStyle}>
      <Box rounding="circle">
        {/*
         We're explicitly setting an empty string as a label on the Icon since we
         already have an aria-label on the button container.
         This is similar to having empty `alt` attributes:
         https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon
          // accessibilityLabel=""
          color={color}
          // dangerouslySetSvgPath={dangerouslySetSvgPath}
          name={icon}
          prefix={iconPrefix}
          size={size}
        />
      </Box>
    </div>
  );
}
