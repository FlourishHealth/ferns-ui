import React, {useContext, useMemo} from "react";

import {Box} from "./Box";
import {BadgeProps, TextTheme, SurfaceTheme} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";


import { View, StyleSheet } from "react-native";



export const Badge = ({
  text,
  status = "info",
  secondary = false,
  variant = "text",
}: BadgeProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  

  const badgeColor: keyof TextTheme = useMemo(() =>  {
    if(!secondary) {
      return theme.text.inverted;
    }
    if (status === "error") {
      return theme.text.error;
    } else if (status === "warning") {
      return theme.text.warning;
    } else if (status === "info") {
      return theme.text.secondary;
    } else if (status === "success") {
      return theme.text.success;
    } else if (status === "neutral") {
      return theme.text.neutral;
    }
  });

  const badgeBgColor: keyof SurfaceTheme = useMemo(() => {
    if (status === "error") {
      return secondary ? theme.surface.errorLight : theme.surface.error;
    } else if (status === "warning") {
      return secondary ? theme.surface.warningLight : theme.surface.warning;
    } else if (status === "info"){
      return secondary ? theme.surface.secondaryLight : theme.surface.secondaryDark;
    } else if (status  === "success") {
      return secondary ? theme.surface.successLight : theme.surface.success;
    } else if (status === "neutral") {
      return secondary ? theme.surface.neutralLight : theme.surface.neutralDark;
    }
  }, [status, secondary, theme.surface]);  

  return (
    <View style={{
      alignItems: "baseline",
      flex: {
        alignSelf: alignSelf,
        flexDirection: "row",
      }
      height: "min-content",
      justifyContent: "center",
      marginLeft: 1,
      paddingX: 2,
      paddingY: 1,
      rounding: "md",
      width: "max-content",
      }
    }>
      <Icon name="check" size="sm" color={badgeColor} />
      <Text color={badgeColor} fontWeight="bold" />
    </View>
  );
};

