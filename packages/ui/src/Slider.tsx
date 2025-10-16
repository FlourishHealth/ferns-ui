import SliderComponent from "@react-native-community/slider";
import React, {FC} from "react";
import {View} from "react-native";

import {Box} from "./Box";
import {IconName, SliderProps} from "./Common";
import {FieldError} from "./fieldElements/FieldError";
import {FieldHelperText} from "./fieldElements/FieldHelperText";
import {FieldTitle} from "./fieldElements/FieldTitle";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {useTheme} from "./Theme";

export const Slider: FC<SliderProps> = ({
  disabled = false,
  errorText,
  helperText,
  labels,
  maximumTrackTintColor,
  maximumValue = 1,
  minimumTrackTintColor,
  minimumValue = 0,
  step = 0,
  thumbTintColor,
  title,
  showSelection = false,
  useIcons = false,
  value,
  valueMapping,
  onChange,
}) => {
  const {theme} = useTheme();

  if (!theme) {
    return null;
  }

  const minTrackColor = minimumTrackTintColor || theme.surface.primary;
  const maxTrackColor = maximumTrackTintColor || theme.border.default;
  const thumbColor = thumbTintColor || theme.surface.primary;

  // Find the closest option for the current value
  const getCurrentMapping = () => {
    if (!valueMapping || valueMapping.length === 0) {
      return null;
    }
    
    // Find the option with the closest value
    let closestOption = valueMapping[0];
    let closestDistance = Math.abs(value - closestOption.index);
    
    for (const option of valueMapping) {
      const distance = Math.abs(value - option.index);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestOption = option;
      }
    }
    
    return closestOption;
  };

  const getCenterContent = () => {
    if (!valueMapping || valueMapping.length == 0) {
      const formattedValue = value.toFixed(step > 0 && step < 1 ? String(step).split(".")[1]?.length || 0 : 0);
      return <Text align="center" color={disabled ? "secondaryLight" : "primary"} size="lg">{formattedValue}</Text>;
    }
    const currentOption = getCurrentMapping();
    if (useIcons) {
      return <Icon color={disabled ? "secondaryLight" : "primary"} iconName={currentOption!.value as IconName} size={currentOption!.size || "md"} />;
    } else {
      return <Text align="center" color={disabled ? "secondaryLight" : "primary"} size="xx">{currentOption?.value}</Text>;
    }
  };

  return (
    <Box>
      {Boolean(title) && <FieldTitle text={title!} />}
      <Box direction="column" gap={showSelection ? 2 : 0}>
        {showSelection && (
          <Box alignItems="center">
            {getCenterContent()}
          </Box>
        )}
        <SliderComponent
          disabled={disabled}
          maximumTrackTintColor={maxTrackColor}
          maximumValue={maximumValue}
          minimumTrackTintColor={minTrackColor}
          minimumValue={minimumValue}
          step={step}
          thumbTintColor={thumbColor}
          value={value}
          onValueChange={onChange}
          {...{
            trackStyle: {
              height: 10,
            },
            thumbStyle: {
              width: 48,
              height: 48,
              backgroundColor: 'white',
              borderRadius: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          }}
        />
        {labels && (
          <Box direction="row" justifyContent="between" marginTop={2}>
            {labels.min && (
              <Text size="sm" color="secondaryDark">
                {labels.min}
              </Text>
            )}
            {labels.custom?.map((customLabel, index) => (
              <Text key={index} size="sm" color="secondaryDark">
                {customLabel.label}
              </Text>
            ))}
            {labels.max && (
              <Text size="sm" color="secondaryDark">
                {labels.max}
              </Text>
            )}
          </Box>
        )}
      </Box>
      {Boolean(helperText && !errorText) && <FieldHelperText text={helperText!} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
    </Box>
  );
};


