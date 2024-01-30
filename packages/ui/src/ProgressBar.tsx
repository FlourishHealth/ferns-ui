import React, {useContext} from "react";
import {View} from "react-native";

import {ProgressBarProps} from "./Common";
import {ThemeContext} from "./Theme";

export const ProgressBar = ({color, completed}: ProgressBarProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={{
        width: "100%",
        height: 6,
      }}
    >
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: 6,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: theme[color],
          backgroundColor: theme[color],
          opacity: 0.3,
        }}
      />
      <View
        style={{
          width: `${Math.min(completed / 100, 1) * 100}%`,
          position: "absolute",
          top: 0,
          left: 0,
          height: 6,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: theme[color],
          backgroundColor: theme[color],
          opacity: 1,
        }}
      />
    </View>
  );
};
