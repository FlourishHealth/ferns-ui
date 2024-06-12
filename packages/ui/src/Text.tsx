import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/nunito";
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

  if (font) {
    console.error("font prop is not supported yet");
  }

  // TODO: make fonts part of theme.
  const [fontsLoaded] = useFonts({
    "text-bold": Nunito_700Bold,
    "text-bold-italic": Nunito_700Bold_Italic,
    "text-medium": Nunito_500Medium,
    "text-medium-italic": Nunito_500Medium_Italic,
    "text-regular": Nunito_400Regular,
    "text-regular-italic": Nunito_400Regular_Italic,
  });

  // TODO: How should we handle unloaded fonts.
  if (!fontsLoaded) {
    // eslint-disable-next-line react-native/no-raw-text
    return <NativeText>Loading fonts...</NativeText>;
  }

  const style: TextStyle = {};
  if (overflow) {
    console.warn(
      "Text overflow is deprecated. Use `truncate` to cut off the text and add ellipse, otherwise breakWord is the default."
    );
  }

  if (size === "sm" || size === "md") {
    if (weight === "bold" && italic) {
      style.fontFamily = "text-bold-italic";
    } else if (italic) {
      style.fontFamily = "text-regular-italic";
    } else if (weight === "bold") {
      style.fontFamily = "text-bold";
    } else {
      style.fontFamily = "text-regular";
    }
  } else {
    if (weight === "bold" && italic) {
      style.fontFamily = "text-bold-italic";
    } else if (italic) {
      style.fontFamily = "text-medium-italic";
    } else if (weight === "bold") {
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
  // TODO: might be useful for wrapping/truncating
  // if (numberOfLines !== 1 && !inline) {
  //   style.flexWrap = "wrap";
  // }

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
    <NativeText numberOfLines={lines} style={style} testID={testID} onPress={onPress}>
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
