import React, {useContext} from "react";
import {View} from "react-native";

import {BadgeProps, SurfaceTheme, TextTheme} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";

export const Badge = ({
  value,
  iconName = "check",
  status = "info",
  secondary = false,
  variant = "text",
  maxValue = 100,
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

  let badgeBorderRadius = theme.radius.default;
  if (variant === "iconOnly") {
    badgeBorderRadius = theme.radius.full;
  } else if (variant === "numberOnly") {
    badgeBorderRadius = theme.radius.rounded;
  }

  let badgeValue;

  if (variant !== "numberOnly") {
    badgeValue = value;
  } else {
    if (!isNaN(Number(value)) && maxValue) {
      const numberValue = Number(value);
      if (numberValue > maxValue) {
        badgeValue = `${maxValue}+`;
      } else {
        badgeValue = numberValue;
      }
    } else {
      console.warn("Warning: Badge value is not a number");
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        flexDirection: "row",
        borderRadius: badgeBorderRadius,
        backgroundColor: theme.surface[badgeBgColor],
        height: variant === "iconOnly" ? theme.spacing.xl : "auto",
        width: variant === "iconOnly" ? theme.spacing.xl : "auto",
      }}
    >
      {Boolean(variant !== "numberOnly") && (
        <View style={{marginRight: theme.spacing.sm}}>
          <Icon color={badgeColor} iconName={iconName} size="sm" />
        </View>
      )}
      {Boolean(variant !== "iconOnly") && (
        <Text align="center" color={badgeColor}>
          {badgeValue}
        </Text>
      )}
    </View>
  );
};
