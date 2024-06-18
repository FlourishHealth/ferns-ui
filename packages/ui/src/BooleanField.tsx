import React, {ReactElement, useContext, useRef} from "react";
import {Animated, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

import {BooleanFieldProps} from "./Common";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";
import EndCallback = Animated.EndCallback;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 60,
    height: 30,
    borderRadius: 30,
  },
  animatedContainer: {
    flex: 1,
    width: 78,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
});

export const BooleanField = ({
  label,
  variant,
  value,
  onChange,
  interaction = true,
  disabledHelperText,
}: BooleanFieldProps): ReactElement => {
  const {theme} = useContext(ThemeContext);
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
    if (!interaction) {
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
        <Text bold={variant === "title"} color="primary" size="lg">
          {label}
        </Text>
        <TouchableWithoutFeedback accessibilityRole="button" onPress={handleSwitch}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Animated.View
              style={[
                styles.container,
                {
                  backgroundColor: interaction
                    ? interpolatedColorAnimation
                    : theme.surface.disabled,
                  borderColor: interaction ? theme.surface.secondaryDark : theme.surface.disabled,
                  borderWidth: 1,
                  width: 60,
                  height: 30,
                  borderRadius: 30,
                  marginHorizontal: variant === "title" ? undefined : 8,
                  marginRight: variant === "title" ? 8 : undefined,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.animatedContainer,
                  {
                    left: transformSwitch,
                    width: 60,
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.circle,
                    {
                      borderWidth: 1,
                      borderColor: interaction
                        ? theme.surface.secondaryDark
                        : theme.surface.disabled,
                      backgroundColor: theme.surface.base,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                    },
                    {alignItems: "center", justifyContent: "center"},
                  ]}
                />
              </Animated.View>
            </Animated.View>
            {variant === "title" && <Text size="md">{value ? "Yes" : "No"}</Text>}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!interaction && disabledHelperText && <Text size="md">{disabledHelperText}</Text>}
    </View>
  );
};
