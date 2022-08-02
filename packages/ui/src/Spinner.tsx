import React, {ReactElement, useEffect, useState} from "react";
import {ActivityIndicator} from "react-native";

import {SpinnerProps} from "./Common";

export function Spinner({size, color}: SpinnerProps): ReactElement | null {
  const [show, setShow] = useState(false);

  // The delay is for perceived performance. You don't want to show a spinner when you're doing a quick action.
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }
  const spinnerSize: "small" | "large" = size === "sm" ? "small" : "large";
  return <ActivityIndicator color={color || "darkGray"} size={spinnerSize} />;
}
