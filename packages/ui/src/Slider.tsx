import SliderComponent from "@react-native-community/slider";
import React, {FC} from "react";
import {View} from "react-native";

import {Box} from "./Box";
import {SliderProps} from "./Common";
import {FieldError} from "./fieldElements/FieldError";
import {FieldHelperText} from "./fieldElements/FieldHelperText";
import {FieldTitle} from "./fieldElements/FieldTitle";
import {Text} from "./Text";
import {useTheme} from "./Theme";

export const Slider: FC<SliderProps> = ({
  disabled = false,
  errorText,
  helperText,
  maximumTrackTintColor,
  maximumValue = 1,
  minimumTrackTintColor,
  minimumValue = 0,
  showValue = false,
  step = 0,
  testID,
  thumbTintColor,
  title,
  value,
  onChange,
}) => {
  const {theme} = useTheme();

  if (!theme) {
    return null;
  }

  const minTrackColor = minimumTrackTintColor || theme.surface.primary;
  const maxTrackColor = maximumTrackTintColor || theme.border.default;
  const thumbColor = thumbTintColor || theme.surface.primary;

  return (
    <Box>
      {Boolean(title) && <FieldTitle text={title!} />}
      <Box direction="row" alignItems="center" gap={3}>
        <Box flex="grow">
          <SliderComponent
            disabled={disabled}
            maximumTrackTintColor={maxTrackColor}
            maximumValue={maximumValue}
            minimumTrackTintColor={minTrackColor}
            minimumValue={minimumValue}
            step={step}
            testID={testID}
            thumbTintColor={thumbColor}
            value={value}
            onValueChange={onChange}
          />
        </Box>
        {showValue && (
          <Box minWidth={40}>
            <Text align="right" color={disabled ? "secondaryLight" : "primary"}>
              {value.toFixed(step > 0 && step < 1 ? String(step).split(".")[1]?.length || 0 : 0)}
            </Text>
          </Box>
        )}
      </Box>
      {Boolean(helperText && !errorText) && <FieldHelperText text={helperText!} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
    </Box>
  );
};


