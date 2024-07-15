import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {FC} from "react";
import {View} from "react-native";

import {CheckBoxProps} from "./Common";
import {useTheme} from "./Theme";

export const CheckBox: FC<CheckBoxProps> = ({selected, size = "md", bgColor = "default"}) => {
  const {theme} = useTheme();
  const px = {
    sm: {container: 10, icon: 8},
    md: {container: 16, icon: 13},
    lg: {container: 24, icon: 16},
  };

  const backgroundColor = {
    default: theme.text.link,
    accent: theme.text.accent,
    black: theme.text.primary,
  };
  return (
    <View
      style={{
        height: px[size].container,
        width: px[size].container,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: backgroundColor[bgColor],
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? backgroundColor[bgColor] : "transparent",
      }}
    >
      {selected ? (
        <FontAwesome6 color={theme.surface.base} name="check" size={px[size].icon} solid />
      ) : null}
    </View>
  );
};
