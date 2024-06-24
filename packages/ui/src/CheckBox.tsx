import React, {useContext} from "react";
import {View} from "react-native";

import {Box} from "./Box";
import {CheckBoxProps} from "./Common";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";

export const CheckBox = ({
  type,
  checked,
  size,
  radio,
  label,
  labelColor,
  subLabel,
  onChange,
  onClick,
  indeterminate,
  testID,
}: CheckBoxProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);
  if (checked && indeterminate) {
    console.error("CheckBox cannot be checked and indeterminate at the same time");
  }

  const doOnClick = () => {
    if (!indeterminate) {
      onChange({value: !checked});
    }
    onClick && onClick();
  };

  const renderCheckBox = () => {
    // TODO: checkbox shouldn't use box any more, it should be a custom view (to get around
    // adding a bunch of colors to theme just for this component etc)
    return (
      <View />
      // <Box border={color || "primary"} color={bgColor} height={size === "sm" ? 16 : 24}
      // rounding={radio ? "circle" : size === "sm" ? 2 : 3} testID={testID} width={size === "sm" ?
      // 16 : 24} onClick={doOnClick} > <Box alignItems="center" direction="column" display="flex"
      // height="100%" justifyContent="center" width="100%" > {checked && ( <Icon color="inverted"
      // name="check" prefix="fas" size={size === "sm" ? "sm" : "md"} /> )} {indeterminate && (
      // <Icon color={color || "primary"} name="circle" prefix="fas" size={size === "sm" ? "sm" :
      // "md"} /> )} </Box> </Box>
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
        <Text bold color={labelColor || "primary"} numberOfLines={subLabel ? 1 : 2} size={size}>
          {label}
        </Text>
        {Boolean(subLabel) && (
          <Text bold color={labelColor || "primary"} size="sm">
            {subLabel!}
          </Text>
        )}
      </Box>
    </Box>
  );
};
