import React, {useContext} from "react";
import {Platform, StyleProp, Text as NativeText, TextStyle} from "react-native";

import {HeadingProps} from "./Common";
import {ThemeContext} from "./Theme";

const fontSizeAndWeightWeb = {
  sm: {size: 16, weight: "semibold"},
  md: {size: 18, weight: "bold"},
  lg: {size: 24, weight: "bold"},
  xl: {size: 32, weight: "bold"},
};

const fontSizeAndWeighMobile = {
  sm: {size: 14, weight: "semibold"},
  md: {size: 16, weight: "bold"},
  lg: {size: 20, weight: "bold"},
  xl: {size: 28, weight: "bold"},
};

const fontSizes = Platform.OS === "web" ? fontSizeAndWeightWeb : fontSizeAndWeighMobile;

export const Heading = ({
  align,
  children,
  color = "primary",
  size,
  testID,
}: HeadingProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  const style: StyleProp<TextStyle> = {};

  style.fontFamily = theme.font.title;

  style.fontSize = fontSizes[size || "md"].size;
  if (align) {
    style.textAlign = align;
  }
  style.fontWeight = fontSizes[size || "md"].weight as "semibold" | "bold";
  style.color = theme.text[color];
  // TODO: might be useful for wrapping/truncating
  // if (numberOfLines !== 1 && !inline) {
  //   style.flexWrap = "wrap";
  // }

  const lines = 0;
  return (
    <NativeText numberOfLines={lines} style={style} testID={testID}>
      {children}
    </NativeText>
  );
};
