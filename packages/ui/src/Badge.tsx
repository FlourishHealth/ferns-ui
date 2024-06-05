import React from "react";

import {Box} from "./Box";
import {BadgeProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";

export const Badge = ({
  title,
  position = "middle",
  type = "info",
  color,
  iconProps,
  fontWeight = "bold",
}: BadgeProps): React.ReactElement => {
  // TODO: Badge encompasses what we used to call pill, needs to be updated to include that.
  // It has text/icon/number variants, as well as light and bold color variants,
  // then actual color variants ("error", "success", etc)

  if (color && type !== "custom") {
    console.warn('Badge color only supported when `type` is set to "custom".');
  }

  function renderIcon(): React.ReactElement | null {
    if (iconProps && iconProps.name) {
      return (
        <Box marginRight={title ? 1 : 0}>
          <Icon color={iconProps?.color ? iconProps.color : "inverted"} {...iconProps} size="sm" />
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
      <Text color="inverted" size="sm" weight={fontWeight}>
        {title}
      </Text>
    );
  }

  return (
    <Box
      alignItems="baseline"
      alignSelf={position === "middle" ? "center" : position === "bottom" ? "end" : "start"}
      color="primary"
      direction="row"
      height="min-content"
      justifyContent="center"
      marginLeft={1}
      marginTop={position === "top" ? -1 : 0}
      paddingX={2}
      paddingY={1}
      rounding="md"
      width="max-content"
    >
      {renderIcon()}
      {renderLabel()}
    </Box>
  );
};
