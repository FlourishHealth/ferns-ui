import {
  TitilliumWeb_600SemiBold,
  TitilliumWeb_700Bold,
  useFonts,
} from "@expo-google-fonts/titillium-web";
import React from "react";
import {Platform, StyleProp, Text as NativeText, TextStyle} from "react-native";

import {HeadingProps} from "./Common";
import {useTheme} from "./Theme";

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
  const {theme} = useTheme();

  // TODO: make fonts part of theme.
  const [fontsLoaded] = useFonts({
    heading: TitilliumWeb_600SemiBold,
    "heading-bold": TitilliumWeb_700Bold,
    "heading-semibold": TitilliumWeb_600SemiBold,
  });

  // TODO: How should we handle unloaded fonts.
  if (!fontsLoaded) {
    // eslint-disable-next-line react-native/no-raw-text
    return <NativeText>Loading fonts...</NativeText>;
  }

  const style: StyleProp<TextStyle> = {};

  if (size === "sm") {
    style.fontFamily = "heading-semibold";
  } else {
    style.fontFamily = "heading-bold";
  }

  style.fontSize = fontSizes[size || "md"].size;
  if (align) {
    style.textAlign = align;
  }
  style.color = theme.text[color];

  const lines = 0;
  return (
    <NativeText numberOfLines={lines} style={style} testID={testID}>
      {children}
    </NativeText>
  );
};
