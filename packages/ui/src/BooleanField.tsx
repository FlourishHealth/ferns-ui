import React, {ReactElement, useRef} from "react";
import {Animated, TouchableWithoutFeedback, View} from "react-native";

import {BooleanFieldProps} from "./Common";
import {FieldHelperText, FieldTitle} from "./fieldElements";
import {Text} from "./Text";
import {useTheme} from "./Theme";

export const BooleanField = ({
  title,
  variant,
  value,
  onChange,
  disabled,
  disabledHelperText,
  helperText,
}: BooleanFieldProps): ReactElement => {
  const {theme} = useTheme();
  const backgroundColor = useRef(new Animated.Value(value ? 75 : -75)).current;
  const circleColor = useRef(new Animated.Value(value ? 75 : -75)).current;
  const circleBorderColor = useRef(new Animated.Value(value ? 75 : -75)).current;
  const transformSwitch = useRef(new Animated.Value(value ? 15 : -15)).current;

  const animateSwitch = (newValue: boolean) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: newValue ? 15 : -15,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: newValue ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: newValue ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: value ? 75 : -75,
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

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-75, 75],
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
        <TouchableWithoutFeedback accessibilityRole="button" onPress={handleSwitch}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Animated.View
              style={{
                width: 60,
                height: 30,
                borderRadius: 30,
                backgroundColor: disabled ? theme.surface.disabled : interpolatedColorAnimation,
                borderColor: disabled ? theme.surface.disabled : theme.surface.secondaryDark,
                borderWidth: 1,
                marginHorizontal: variant === "title" ? undefined : 8,
                marginRight: variant === "title" ? 8 : undefined,
              }}
            >
              <Animated.View
                style={{
                  flex: 1,
                  width: 60,
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
                    width: 30,
                    height: 30,
                    borderRadius: 15,
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
