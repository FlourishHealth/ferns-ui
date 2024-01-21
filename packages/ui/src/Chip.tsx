import React from "react";

import {Box} from "./Box";
import {ChipProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";

export const Chip = ({
  label,
  fontColor = "white",
  fontWeight = "bold",
  bgColor = "primary",
  boxProps,
  iconName,
  iconColor,
  iconPrefix,
}: ChipProps): React.ReactElement => {
  function renderIcon(): React.ReactElement | null {
    if (!iconName) {
      return null;
    }
    return (
      <Box marginRight={label ? 1 : 0}>
        <Icon
          color={iconColor ? iconColor : fontColor}
          name={iconName}
          prefix={iconPrefix || "fas"}
          size="sm"
        />
      </Box>
    );
  }

  function renderLabel(): React.ReactElement | null {
    if (!label) {
      return null;
    }
    return (
      <Text color={fontColor} weight={fontWeight}>
        {label}
      </Text>
    );
  }

  return (
    <Box
      alignItems="center"
      color={bgColor}
      direction="row"
      justifyContent="center"
      paddingX={2}
      paddingY={1}
      rounding="pill"
      width="max-content"
      {...boxProps}
    >
      {renderIcon()}
      {renderLabel()}
    </Box>
  );
};
