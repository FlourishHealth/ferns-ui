import React, {useContext} from "react";
import {View} from "react-native";

import {BadgeProps, SurfaceTheme, TextTheme} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";

export const Badge = ({
  text,
  status = "info",
  secondary = false,
  variant = "text",
  number,
}: BadgeProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  let badgeColor: keyof TextTheme = "inverted";

  if (secondary) {
    if (status === "error") {
      badgeColor = "error";
    } else if (status === "warning") {
      badgeColor = "warning";
    } else if (status === "info") {
      badgeColor = "secondaryDark";
    } else if (status === "success") {
      badgeColor = "success";
    } else if (status === "neutral") {
      badgeColor = "primary";
    }
  }

  let badgeBgColor: keyof SurfaceTheme = "neutralDark";

  if (status === "error") {
    badgeBgColor = secondary ? "errorLight" : "error";
  } else if (status === "warning") {
    badgeBgColor = secondary ? "warningLight" : "warning";
  } else if (status === "info") {
    badgeBgColor = secondary ? "secondaryLight" : "secondaryDark";
  } else if (status === "success") {
    badgeBgColor = secondary ? "successLight" : "success";
  } else if (status === "neutral") {
    badgeBgColor = secondary ? "neutralLight" : "neutralDark";
  }

  return (
    <View
      style={{
        // height: "min-content",
        justifyContent: "center",
        marginLeft: 1,
        paddingHorizontal: 2,
        paddingVertical: 1,
        borderRadius: theme.radius.minimal as any,
        // flex: {
        //   flex: 1
        // },
        backgroundColor: badgeBgColor,
      }}
    >
      {Boolean(variant !== "numberOnly") && (
        <Icon color={badgeColor} name="check" size="sm" />
      )}
      {Boolean(variant !== "iconOnly") && (
        <Text color={badgeColor}>{variant === "numberOnly" ? text : number}</Text>
        )
        }
    </View>
  );
};
