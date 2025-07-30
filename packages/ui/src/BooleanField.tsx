import React, {FC, useEffect, useRef} from "react";
import {Animated, TouchableWithoutFeedback, View} from "react-native";

import {BooleanFieldProps} from "./Common";
import {FieldHelperText, FieldTitle} from "./fieldElements";
import {Text} from "./Text";
import {useTheme} from "./Theme";

const TOUCHABLE_SIZE = 20;
const OFFSET = 10;
const WIDTH = 36;
const WIDTH_WITH_OFFSET = OFFSET + WIDTH;

export const BooleanField: FC<BooleanFieldProps> = ({
  title,
  variant,
  value,
  onChange,
  disabled,
  disabledHelperText,
  helperText,
}) => {
  const {theme} = useTheme();
  const backgroundColor = useRef(
    new Animated.Value(value ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET)
  ).current;
  const circleColor = useRef(
    new Animated.Value(value ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET)
  ).current;
  const circleBorderColor = useRef(
    new Animated.Value(value ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET)
  ).current;
  const transformSwitch = useRef(new Animated.Value(value ? OFFSET : -1 * OFFSET)).current;

  const animateSwitch = (newValue: boolean) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: newValue ? OFFSET : -1 * OFFSET,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: newValue ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: newValue ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: value ? WIDTH_WITH_OFFSET : -1 * WIDTH_WITH_OFFSET,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleSwitch = () => {
    if (disabled) {
      return;
    }
    animateSwitch(!value);
    onChange(!value);
  };

  // Update animation when value changes without pressing
  useEffect(() => {
    animateSwitch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-1 * WIDTH_WITH_OFFSET, WIDTH_WITH_OFFSET],
    outputRange: [theme.surface.base, theme.surface.secondaryDark],
  });

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: variant === "title" ? "column" : "row",
          alignItems: variant === "title" ? "flex-start" : "center",
          justifyContent: variant === "title" ? "flex-start" : "center",
        }}
      >
        {Boolean(title) && <FieldTitle text={title!} />}
        <TouchableWithoutFeedback aria-role="button" onPress={handleSwitch}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Animated.View
              style={{
                width: WIDTH,
                height: TOUCHABLE_SIZE,
                borderRadius: TOUCHABLE_SIZE,
                backgroundColor: disabled ? theme.surface.disabled : interpolatedColorAnimation,
                borderColor: disabled ? theme.surface.disabled : theme.surface.secondaryDark,
                borderWidth: 1,
                marginHorizontal: variant === "title" ? undefined : OFFSET,
                marginRight: variant === "title" ? OFFSET : undefined,
              }}
            >
              <Animated.View
                style={{
                  flex: 1,
                  width: WIDTH,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  left: transformSwitch,
                }}
              >
                <Animated.View
                  style={{
                    borderWidth: 1,
                    borderColor: disabled ? theme.surface.disabled : theme.surface.secondaryDark,
                    backgroundColor: theme.surface.base,
                    width: TOUCHABLE_SIZE,
                    height: TOUCHABLE_SIZE,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Animated.View>
            </Animated.View>
            {variant === "title" && <Text size="md">{value ? "Yes" : "No"}</Text>}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {disabled && disabledHelperText && <FieldHelperText text={disabledHelperText} />}
      {Boolean(helperText) && <FieldHelperText text={helperText!} />}
    </View>
  );
};
