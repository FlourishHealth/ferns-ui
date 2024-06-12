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
  maxNumber,
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

  let badgeBorderRadius = theme.radius.default as any;
  if (variant === "iconOnly") {
    badgeBorderRadius = theme.radius.full as any;
  } else if (variant === "numberOnly") {
    badgeBorderRadius = theme.radius.rounded as any;
  }

  let badgeValue;

  if (variant !== "numberOnly") {
    badgeValue = value;
  } else {
    if (!isNaN(Number(value)) && maxNumber) {
      const numberValue = Number(value);
      if (numberValue > maxNumber) {
        badgeValue = `${maxNumber}+`;
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
        // marginLeft: 1,
        alignItems: "center",
        paddingVertical: theme.spacing.xs as any,
        paddingHorizontal: theme.spacing.sm as any,
        flexDirection: "row",
        borderRadius: badgeBorderRadius as any,
        backgroundColor: theme.surface[badgeBgColor],
        height: variant === "iconOnly" ? (theme.spacing.xl as any) : "auto",
        width: variant === "iconOnly" ? (theme.spacing.xl as any) : "auto",
      }}
    >
      {Boolean(variant !== "numberOnly") && (
        <View style={{paddingHorizontal: theme.spacing.xs as any}}>
          <Icon color={badgeColor} name={iconName} size="sm" />
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
