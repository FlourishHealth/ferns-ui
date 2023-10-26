import React, {useContext} from "react";
import {Text, View} from "react-native";

import {AllColors} from "./Common";
import {ThemeContext} from "./Theme";

interface BadgeProps {
  // The text to display inside the badge.
  title: string;
  // Position relative to the text. Top should only be used with headings.
  position?: "top" | "middle"; // default "middle"
  // Some default badge types. Occasionally, a custom badge might be required for different color schemes.
  type?: "info" | "error" | "warning" | "success" | "neutral" | "custom"; // default "info
  // If `type` is set to "custom", a custom theme color should be provided.
  color?: AllColors;
}

const BADGE_COLORS: {[key: string]: AllColors} = {
  info: "blue",
  error: "red",
  warning: "orange",
  success: "springGreen",
  neutral: "gray",
};

export function Badge({
  title,
  position = "middle",
  type = "info",
  color,
}: BadgeProps): React.ReactElement {
  const {theme} = useContext(ThemeContext);

  if (color && type !== "custom") {
    console.warn('Badge color only supported when `type` is set to "custom".');
  }
  const badgeColor = type === "custom" ? color! : BADGE_COLORS[type];

  return (
    <View
      style={{
        backgroundColor: theme[badgeColor],
        borderRadius: 2,
        height: 14,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: -4,
        marginLeft: 4,
        display: "flex",
        alignSelf: position === "middle" ? "center" : "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 10,
          flexWrap: "nowrap",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
