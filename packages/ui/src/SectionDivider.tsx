// TODO: send this to ferns-ui

import {useTheme} from "./Theme";
import React from "react";
import {View} from "react-native";

export const SectionDivider: React.FC<{}> = () => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: theme.primitives.neutral500,
      }}
    />
  );
};
