import React from "react";
import {View} from "react-native";
import {useTheme} from "./Theme";

export const SectionDivider: React.FC<{}> = () => {
  const {theme} = useTheme();
  return (
    <View
      accessibilityRole="none"
      aria-hidden={true}
      style={{
        width: "100%",
        height: 1,
        backgroundColor: theme.primitives.neutral500,
      }}
    />
  );
};
