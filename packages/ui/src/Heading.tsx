import React, {useContext} from "react";
import {Text as NativeText} from "react-native";

import {HeadingProps} from "./Common";
import {ThemeContext} from "./Theme";

export function Heading({align, children, color, size}: HeadingProps): React.ReactElement {
  const {theme} = useContext(ThemeContext);

  const fontSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  const propsToStyle = (): any => {
    const style: any = {};

    // let font = font || "primary";
    // if (bold) {
    //   font += "Bold";
    // }
    style.fontFamily = theme.titleFont;

    style.fontSize = fontSizes[size || "md"];
    if (align) {
      style.textAlign = align;
    }
    if (color) {
      style.color = theme[color];
    } else {
      style.color = theme.darkGray;
    }
    // TODO: might be useful for wrapping/truncating
    // if (numberOfLines !== 1 && !inline) {
    //   style.flexWrap = "wrap";
    // }

    return style;
  };

  const lines = 0;
  // if (numberOfLines) {
  //   lines = numberOfLines;
  // } else if (inline) {
  //   lines = 1;
  // }
  return (
    <NativeText numberOfLines={lines} style={propsToStyle()}>
      {children}
    </NativeText>
  );
}
