import React from "react";

import {Box} from "./Box";
import {BoxColor, CheckBoxProps} from "./Common";
import {Icon} from "./Icon";
import {Text} from "./Text";

export function CheckBox({
  color,
  checked,
  size,
  radio,
  label,
  labelColor,
  subLabel,
  disabled,
  onChange,
  onClick,
  indeterminate,
  testID,
}: CheckBoxProps): React.ReactElement {
  if (checked && indeterminate) {
    console.error("CheckBox cannot be checked and indeterminate at the same time");
  }

  const doOnClick = () => {
    if (disabled) {
      return;
    }
    if (!indeterminate) {
      onChange({value: !checked});
    }
    onClick && onClick();
  };

  const renderCheckBox = () => {
    let bgColor: BoxColor;
    if (disabled) {
      bgColor = "gray";
    } else if (checked) {
      bgColor = color || "darkGray";
    } else {
      bgColor = "white";
    }
    return (
      <Box
        border={color || "darkGray"}
        color={bgColor}
        height={size === "sm" ? 16 : 24}
        rounding={radio ? "circle" : size === "sm" ? 2 : 3}
        testID={testID}
        width={size === "sm" ? 16 : 24}
        onClick={doOnClick}
      >
        <Box
          alignItems="center"
          direction="column"
          display="flex"
          height="100%"
          justifyContent="center"
          width="100%"
        >
          {checked && (
            <Icon color="white" name="check" prefix="fas" size={size === "sm" ? "sm" : "md"} />
          )}
          {indeterminate && (
            <Icon
              color={color || "darkGray"}
              name="circle"
              prefix="fas"
              size={size === "sm" ? "sm" : "md"}
            />
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      alignItems="center"
      direction="row"
      display="flex"
      maxHeight={60}
      paddingY={1}
      width="100%"
    >
      <Box
        display="flex"
        justifyContent="center"
        maxWidth={size === "sm" ? 14 : 20}
        width={size === "sm" ? 14 : 20}
      >
        {renderCheckBox()}
      </Box>
      <Box
        direction="column"
        display="flex"
        height="100%"
        justifyContent="center"
        marginLeft={4}
        onClick={doOnClick}
      >
        <Text
          color={labelColor || "darkGray"}
          numberOfLines={subLabel ? 1 : 2}
          size={size}
          weight="bold"
        >
          {label}
        </Text>
        {Boolean(subLabel) && (
          <Text color={labelColor || "darkGray"} size="sm" weight="bold">
            {subLabel!}
          </Text>
        )}
      </Box>
    </Box>
  );
}
