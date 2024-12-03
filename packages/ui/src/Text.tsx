import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito";
import React from "react";
import {Platform, Text as NativeText, TextStyle} from "react-native";

import {TextProps} from "./Common";
import {Hyperlink} from "./Hyperlink";
import {useTheme} from "./Theme";

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
  bold,
  children,
  color,
  italic = false,
  size = "md",
  truncate = false,
  underline,
  numberOfLines,
  skipLinking,
  testID,
}: TextProps): React.ReactElement => {
  const {theme} = useTheme();

  useFonts({
    "text-bold": Nunito_700Bold,
    "text-bold-italic": Nunito_700Bold_Italic,
    "text-medium": Nunito_500Medium,
    "text-medium-italic": Nunito_500Medium_Italic,
    text: Nunito_400Regular,
    "text-regular": Nunito_400Regular,
    "text-regular-italic": Nunito_400Regular_Italic,
  });

  const style: TextStyle = {};

  if (size === "sm" || size === "md") {
    if (bold && italic) {
      style.fontFamily = "text-bold-italic";
    } else if (italic) {
      style.fontFamily = "text-regular-italic";
    } else if (bold) {
      style.fontFamily = "text-bold";
    } else {
      style.fontFamily = "text-regular";
    }
  } else {
    if (bold && italic) {
      style.fontFamily = "text-bold-italic";
    } else if (italic) {
      style.fontFamily = "text-medium-italic";
    } else if (bold) {
      style.fontFamily = "text-bold";
    } else {
      style.fontFamily = "text-medium";
    }
  }

  style.fontSize = fontSizes[size].size;
  if (align) {
    style.textAlign = align;
  }
  if (color) {
    style.color = theme.text[color];
  } else {
    style.color = theme.text.primary;
  }

  if (italic) {
    style.fontStyle = "italic";
  }
  if (underline) {
    style.textDecorationLine = "underline";
  }
  let lines = 0;
  if (numberOfLines && truncate && numberOfLines > 1) {
    console.error(`Cannot truncate Text and have ${numberOfLines} lines`);
  }
  if (numberOfLines) {
    lines = numberOfLines;
  } else if (truncate) {
    lines = 1;
  }
  const inner = (
    <NativeText numberOfLines={lines} selectable={undefined} style={style} testID={testID}>
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
