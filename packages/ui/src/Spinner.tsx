import React, {FC, useEffect, useState} from "react";
import {ActivityIndicator} from "react-native";

import {SpinnerProps} from "./Common";
import {useTheme} from "./Theme";

export const Spinner: FC<SpinnerProps> = ({size = "md", color = "light"}) => {
  const [show, setShow] = useState(false);
  const {theme} = useTheme();

  let computedColor = "";
  if (color === "light") {
    computedColor = theme.primitives.neutral400;
  } else if (color === "dark") {
    computedColor = theme.primitives.neutral000;
  } else if (color === "accent") {
    computedColor = theme.primitives.accent700;
  } else if (color === "secondary") {
    computedColor = theme.primitives.secondary600;
  }

  // The delay is for perceived performance. You don't want to show a spinner when you're doing a
  // quick action.
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  const spinnerSize: "small" | "large" = size === "sm" ? "small" : "large";
  return <ActivityIndicator color={computedColor} size={spinnerSize} />;
};
