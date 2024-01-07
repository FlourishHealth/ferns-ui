import React, {useContext} from "react";
import {Text, View} from "react-native";

import {BadgeProps} from "./Common";
import {ThemeContext} from "./Theme";

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
  const badgeColor = type === "custom" ? color! : type;

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
