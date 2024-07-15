import React from "react";
import {Text, View} from "react-native";

import {BadgeProps, SurfaceTheme, TextTheme} from "./Common";
import {Icon} from "./Icon";
import {useTheme} from "./Theme";

export const Badge = ({
  value,
  iconName,
  status = "info",
  secondary = false,
  variant,
  maxValue = 100,
  customBackgroundColor,
  customTextColor,
  customBorderColor,
  customIconColor,
  customIconName,
}: BadgeProps): React.ReactElement => {
  const {theme} = useTheme();
  const isIconOnly = variant === "iconOnly";

  let badgeColor: keyof TextTheme = "inverted";

  // TODO: Move to theme
  const secondaryBorderColors = {
    error: "#F39E9E",
    warning: "#FCC58F",
    info: "#8FC1D2",
    success: "#7FD898",
    neutral: "#AAAAAA",
    custom: "#AAAAAA",
  };

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

  const backgroundColor = status === "custom" ? customBackgroundColor : theme.surface[badgeBgColor];
  const borderColor = status === "custom" ? customBorderColor : secondaryBorderColors[status];
  const textColor = status === "custom" ? customTextColor : theme.text[badgeColor];
  const iconColor = status === "custom" ? customIconColor : badgeColor;

  let badgeBorderRadius = theme.radius.default;
  if (isIconOnly) {
    badgeBorderRadius = theme.radius.full;
  } else if (variant === "numberOnly") {
    badgeBorderRadius = theme.radius.rounded;
  }

  let badgeValue = value;

  if (variant === "numberOnly") {
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
        alignItems: "flex-start",
      }}
    >
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: variant === "iconOnly" ? 1 : theme.spacing.xs,
            paddingHorizontal: variant === "iconOnly" ? theme.spacing.xs : theme.spacing.sm,
            flexDirection: "row",
            borderRadius: badgeBorderRadius,
            backgroundColor,
            height: variant === "iconOnly" ? 16 : "auto",
            width: variant === "iconOnly" ? 16 : "auto",
          },
          isIconOnly && {height: 16, width: 16},
          secondary && {borderWidth: 1, borderColor},
        ]}
      >
        {Boolean(variant !== "numberOnly" && iconName) && (
          <View style={{marginRight: variant === "iconOnly" ? 0 : theme.spacing.sm}}>
            <Icon color={iconColor} iconName={customIconName ?? iconName!} size="xs" />
          </View>
        )}
        {Boolean(variant !== "iconOnly") && (
          <Text
            style={{
              color: textColor,
              fontSize: 10,
              fontWeight: "700",
              fontFamily: "text",
            }}
          >
            {badgeValue}
          </Text>
        )}
      </View>
    </View>
  );
};
