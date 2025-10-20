import SliderComponent from "@react-native-community/slider";
import React, {FC} from "react";
import {View} from "react-native";

import {Box} from "./Box";
import {IconName, SliderProps, ValueMappingItem} from "./Common";
import {FieldError} from "./fieldElements/FieldError";
import {FieldHelperText} from "./fieldElements/FieldHelperText";
import {FieldTitle} from "./fieldElements/FieldTitle";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {useTheme} from "./Theme";

// Find the closest option for the current value
const getCurrentMapping = (map: ValueMappingItem[], value: number) => {
  if (!map || map.length === 0) {
    return null;
  }
  
  // Find the option with the closest value
  let closestOption = map[0];
  let closestDistance = Math.abs(value - closestOption.value);
  
  for (const option of map) {
    const distance = Math.abs(value - option.value);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestOption = option;
    }
  }
  
  return closestOption;
};

const getCenterContent = (
  valueMapping: ValueMappingItem[] | undefined,
  value: number,
  step: number,
  disabled: boolean,
  useIcons: boolean
): React.ReactElement => {
  if (!valueMapping || valueMapping.length === 0) {
    const formattedValue = value.toFixed(
      step > 0 && step < 1 ? String(step).split(".")[1]?.length || 0 : 0
    );
    return (
      <Text align="center" color={disabled ? "secondaryLight" : "primary"} size="lg">
        {formattedValue}
      </Text>
    );
  }
  
  const currentOption = getCurrentMapping(valueMapping, value);
  
  if (useIcons) {
    return (
      <Icon
        color={disabled ? "secondaryLight" : "primary"}
        iconName={currentOption!.label as IconName}
        size={currentOption!.size || "md"}
      />
    );
  }
  
  return (
    <Text align="center" color={disabled ? "secondaryLight" : "primary"} size="2xl">
      {currentOption?.label}
    </Text>
  );
};

const getSliderContent = (
  slider: React.ReactElement,
  inlineLabels: boolean,
  labels?: SliderProps['labels']
): React.ReactElement => {
  if (inlineLabels && labels?.min && labels?.max) {
    return (
      <Box alignItems="center" direction="row" gap={2}>
        <Box flex="shrink" minWidth={30}>
          <Text color="secondaryDark" size="md">
            {labels.min}
          </Text>
        </Box>
        <Box flex="grow">{slider}</Box>
        <Box alignItems="end" flex="shrink" minWidth={30}>
          <Text color="secondaryDark" size="md">
            {labels.max}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {slider}
      {labels && (
        <Box direction="row" justifyContent="between" marginTop={2}>
          {labels.min && (
            <Text color="secondaryDark" size="sm">
              {labels.min}
            </Text>
          )}
          {labels.custom?.map((customLabel, index) => (
            <Text key={index} color="secondaryDark" size="sm">
              {customLabel.label}
            </Text>
          ))}
          {labels.max && (
            <Text color="secondaryDark" size="sm">
              {labels.max}
            </Text>
          )}
        </Box>
      )}
    </>
  );
};

export const Slider: FC<SliderProps> = ({
  disabled = false,
  errorText,
  helperText,
  inlineLabels = false,
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

  const sliderStyles = {
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
  };

  const sliderElement = (
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
      {...sliderStyles}
    />
  );

  const centerContent = getCenterContent(valueMapping, value, step, disabled, useIcons);
  const sliderContent = getSliderContent(sliderElement, inlineLabels, labels);

  return (
    <Box>
      {Boolean(title) && <FieldTitle text={title!} />}
      <Box direction="column" gap={showSelection ? 2 : 0}>
        {showSelection && (
          <Box alignItems="center">
            {centerContent}
          </Box>
        )}
        {sliderContent}
      </Box>
      {Boolean(helperText && !errorText) && <FieldHelperText text={helperText!} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
    </Box>
  );
};


