import React from "react";

import {Box} from "./Box";
import {BadgeProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";

export function Badge({
  title,
  position = "middle",
  type = "info",
  color,
  size = "xs",
  iconProps,
  fontColor = "white",
  fontWeight = "bold",
  rounding = 2,
}: BadgeProps): React.ReactElement {
  if (color && type !== "custom") {
    console.warn('Badge color only supported when `type` is set to "custom".');
  }
  const badgeColor = type === "custom" ? color! : type;

  function renderIcon(): React.ReactElement | null {
    if (iconProps && iconProps.name) {
      return (
        <Box marginRight={title ? 1 : 0}>
          <Icon color={iconProps?.color ? iconProps.color : fontColor} {...iconProps} size={size} />
        </Box>
      );
    } else {
      return null;
    }
  }

  function renderLabel(): React.ReactElement | null {
    if (!title) {
      return null;
    }
    return (
      <Text color={fontColor} size={size} weight={fontWeight}>
        {title}
      </Text>
    );
  }

  return (
    <Box
      alignItems="baseline"
      alignSelf={position === "middle" ? "center" : position === "bottom" ? "end" : "start"}
      color={badgeColor}
      direction="row"
      height="min-content"
      justifyContent="center"
      marginLeft={1}
      marginTop={position === "top" ? -1 : 0}
      paddingX={(typeof rounding === "number" && rounding >= 4) || rounding === "pill" ? 2 : 1}
      paddingY={1}
      rounding={rounding}
      width="max-content"
    >
      {renderIcon()}
      {renderLabel()}
    </Box>
  );
}
