import {render} from "@testing-library/react-native";
import React from "react";
import {ThemeProvider} from "./Theme";

export const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

export const createCommonMocks = () => ({
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  onEnter: jest.fn(),
  onSubmitEditing: jest.fn(),
  onIconClick: jest.fn(),
});

export const setupComponentTest = () => {
  jest.useFakeTimers();
  return createCommonMocks();
};

export const teardownComponentTest = () => {
  jest.useRealTimers();
  jest.clearAllMocks();
};
