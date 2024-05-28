import React, {useContext} from "react";
import {Platform, Text as NativeText, TextStyle} from "react-native";

import {TextProps} from "./Common";
import {Hyperlink} from "./Hyperlink";
import {ThemeContext} from "./Theme";

const fontSizeAndWeightWeb = {
  sm: {size: 12, weight: "regular"},
  md: {size: 16, weight: "regular"},
  lg: {size: 18, weight: "medium"},
  xl: {size: 20, weight: "medium"},
};

const fontSizeAndWeighMobile = {
  sm: {size: 10, weight: "regular"},
  md: {size: 14, weight: "regular"},
  lg: {size: 16, weight: "medium"},
  xl: {size: 18, weight: "medium"},
};

const fontSizes = Platform.OS === "web" ? fontSizeAndWeightWeb : fontSizeAndWeighMobile;

export const Text = ({
  align = "left",
  children,
  color,
  inline = false,
  italic = false,
  overflow,
  size = "md",
  truncate = false,
  font,
  onPress,
  underline,
  numberOfLines,
  skipLinking,
  testID,
  weight = "regular",
}: TextProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  function propsToStyle(): any {
    const style: TextStyle = {};
    if (overflow) {
      console.warn(
        "Text overflow is deprecated. Use `truncate` to cut off the text and add ellipse, otherwise breakWord is the default."
      );
    }
    let computedFont = "primary";
    if (font === "primary" || !font) {
      if (weight === "bold") {
        computedFont = "primaryBoldFont";
      } else {
        computedFont = "primaryFont";
      }
    } else if (font === "secondary") {
      if (weight === "bold") {
        computedFont = "secondaryBoldFont";
      } else {
        computedFont = "secondaryFont";
      }
    } else if (font === "button") {
      computedFont = "buttonFont";
    } else if (font === "title") {
      computedFont = "titleFont";
    } else if (font === "accent") {
      if (weight === "bold") {
        computedFont = "accentBoldFont";
      } else {
        computedFont = "accentFont";
      }
    }
    if (weight === "bold") {
      style.fontWeight = weight || fontSizes[size].weight;
    }

    style.fontFamily = theme[computedFont as keyof typeof theme];

    style.fontSize = fontSizes[size].size;
    if (align) {
      style.textAlign = align;
    }
    if (color) {
      style.color = theme[color];
    } else {
      style.color = theme.darkGray;
    }

    if (italic) {
      style.fontStyle = "italic";
    }
    if (underline) {
      style.textDecorationLine = "underline";
    }
    // TODO: might be useful for wrapping/truncating
    // if (numberOfLines !== 1 && !inline) {
    //   style.flexWrap = "wrap";
    // }

    return style;
  }

  let lines = 0;
  if (numberOfLines && truncate && numberOfLines > 1) {
    console.error(`Cannot truncate Text and have ${numberOfLines} lines`);
  }
  if (numberOfLines) {
    lines = numberOfLines;
  } else if (inline || truncate) {
    lines = 1;
  }
  const inner = (
    <NativeText numberOfLines={lines} style={propsToStyle()} testID={testID} onPress={onPress}>
      {children}
    </NativeText>
  );
  if (skipLinking) {
    return inner;
  } else {
    return (
      <Hyperlink linkDefault linkStyle={{textDecorationLine: "underline"}}>
        {inner}
      </Hyperlink>
    );
  }
};
