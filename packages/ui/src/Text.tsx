import React from "react";
import {Text as NativeText, TextStyle} from "react-native";

import {AllColors, Font, TextSize} from "./Common";
import {Hyperlink} from "./Hyperlink";
import {Unifier} from "./Unifier";

export interface TextProps {
  align?: "left" | "right" | "center" | "justify"; // default "left"
  children?: React.ReactNode;
  color?: AllColors;

  inline?: boolean; // default false
  italic?: boolean; // default false
  overflow?: "normal" | "breakWord"; // deprecated
  size?: TextSize; // default "md"
  truncate?: boolean; // default false
  font?: Font;
  underline?: boolean;

  numberOfLines?: number;
  skipLinking?: boolean;
  weight?: "bold" | "normal";
}

const fontSizes = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function Text({
  align = "left",
  children,
  color,
  inline = false,
  italic = false,
  overflow,
  size = "md",
  truncate = false,
  font,
  underline,
  numberOfLines,
  skipLinking,
  weight = "normal",
}: TextProps): React.ReactElement {
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
      style.fontWeight = "bold";
    }

    style.fontFamily = Unifier.theme[computedFont];

    style.fontSize = fontSizes[size || "md"];
    if (align) {
      style.textAlign = align;
    }
    if (color) {
      style.color = Unifier.theme[color];
    } else {
      style.color = Unifier.theme.darkGray;
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
    <NativeText numberOfLines={lines} style={propsToStyle()}>
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
}
