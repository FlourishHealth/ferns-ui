import React, {createContext, useState} from "react";

import {UnifiedTheme} from "./Common";
import {changeColorLuminance} from "./Unifier";

const DEFAULT_FONT = "Cochin";
const DEFAULT_BOLD_FONT = "Cochin";

const darkGray = "#111111";
const lightGray = "#efefef";
const gray = "#8e8e8e";
const white = "#fdfdfd";
const primary = "#5c58bb";
const secondary = "#8d58bb";
const accent = "#58b3bb";
const tertiary = "#b7956f";

const defaultTheme: UnifiedTheme = {
  // Primary colors
  white,
  lightGray,
  gray,
  darkGray,
  // secondary colors
  green: "#0fa573",
  red: "#bd081c",
  springGreen: "#008753",
  pine: "#0a6955",
  olive: "#364a4c",
  blue: "#4a90e2",
  navy: "#004b91",
  midnight: "#133a5e",
  purple: "#b469eb",
  orchid: "#8046a5",
  eggplant: "#5b2677",
  maroon: "#6e0f3c",
  watermelon: "#f13535",
  orange: "#e3780c",
  black: "#000000",

  primaryLighter: changeColorLuminance(primary, "lighter"),
  primaryLight: changeColorLuminance(primary, "light"),
  primary,
  primaryDark: changeColorLuminance(primary, "dark"),
  primaryDarker: changeColorLuminance(primary, "darker"),

  secondaryLighter: changeColorLuminance(secondary, "lighter"),
  secondaryLight: changeColorLuminance(secondary, "light"),
  secondary,
  secondaryDark: changeColorLuminance(secondary, "dark"),
  secondaryDarker: changeColorLuminance(secondary, "darker"),

  accentLighter: changeColorLuminance(accent, "lighter"),
  accentLight: changeColorLuminance(accent, "light"),
  accent,
  accentDark: changeColorLuminance(accent, "dark"),
  accentDarker: changeColorLuminance(accent, "darker"),

  tertiaryLighter: changeColorLuminance(tertiary, "lighter"),
  tertiaryLight: changeColorLuminance(tertiary, "light"),
  tertiary,
  tertiaryDark: changeColorLuminance(tertiary, "dark"),
  tertiaryDarker: changeColorLuminance(tertiary, "darker"),

  background: white,
  backgroundSecondary: lightGray,
  textPrimary: darkGray,
  textSecondary: lightGray,
  textDisabled: gray,
  divider: gray,

  // From the Atlassian templates
  neutral900: "#091E42",
  neutral800: "#172B4D",
  neutral700: "#253858",
  neutral600: "#344563",
  neutral500: "#42526E",
  neutral400: "#505F79",
  neutral300: "#5E6C84",
  neutral200: "#6B778C",
  neutral100: "#7A869A",
  neutral90: "#8993A4",
  neutral80: "#97A0AF",
  neutral70: "#A5ADBA",
  neutral60: "#B3BAC5",
  neutral50: "#C1C7D0",
  neutral40: "#DFE1E6",
  neutral30: "#EBECF0",
  neutral20: "#F4F5F7",
  neutral10: "#FAFBFC",

  primaryFont: DEFAULT_FONT,
  primaryBoldFont: DEFAULT_BOLD_FONT,

  secondaryFont: DEFAULT_FONT,
  secondaryBoldFont: DEFAULT_BOLD_FONT,

  accentFont: DEFAULT_FONT,
  accentBoldFont: DEFAULT_BOLD_FONT,

  buttonFont: DEFAULT_FONT,
  titleFont: DEFAULT_FONT,
};

export const ThemeContext = createContext({
  setTheme: (_theme: Partial<UnifiedTheme>) => {},
  theme: defaultTheme,
  resetTheme: () => {},
});

interface ThemeProviderProps {
  children: any;
}

function setThemeWithLuminances(
  oldTheme: UnifiedTheme,
  newTheme: Partial<UnifiedTheme>
): UnifiedTheme {
  return {
    ...oldTheme,
    primaryLighter:
      newTheme.primaryLighter ??
      changeColorLuminance(newTheme.primary ?? oldTheme.primary, "lighter"),
    primaryLight:
      newTheme.primaryLight ?? changeColorLuminance(newTheme.primary ?? oldTheme.primary, "light"),
    primary: newTheme.primary ?? oldTheme.primary,
    primaryDark:
      newTheme.primaryDark ?? changeColorLuminance(newTheme.primary ?? oldTheme.primary, "dark"),
    primaryDarker:
      newTheme.primaryDarker ??
      changeColorLuminance(newTheme.primary ?? oldTheme.primary, "darker"),

    secondaryLighter:
      newTheme.secondaryLighter ??
      changeColorLuminance(newTheme.secondary ?? oldTheme.secondary, "lighter"),
    secondaryLight:
      newTheme.secondaryLight ??
      changeColorLuminance(newTheme.secondary ?? oldTheme.secondary, "light"),
    secondary: newTheme.secondary ?? oldTheme.secondary,
    secondaryDark:
      newTheme.secondaryDark ??
      changeColorLuminance(newTheme.secondary ?? oldTheme.secondary, "dark"),
    secondaryDarker:
      newTheme.secondaryDarker ??
      changeColorLuminance(newTheme.secondary ?? oldTheme.secondary, "darker"),

    accentLighter:
      newTheme.accentLighter ?? changeColorLuminance(newTheme.accent ?? oldTheme.accent, "lighter"),
    accentLight:
      newTheme.accentLight ?? changeColorLuminance(newTheme.accent ?? oldTheme.accent, "light"),
    accent: newTheme.accent ?? oldTheme.accent,
    accentDark:
      newTheme.accentDark ?? changeColorLuminance(newTheme.accent ?? oldTheme.accent, "dark"),
    accentDarker:
      newTheme.accentDarker ?? changeColorLuminance(newTheme.accent ?? oldTheme.accent, "darker"),

    tertiaryLighter:
      newTheme.tertiaryLighter ??
      changeColorLuminance(newTheme.tertiary ?? oldTheme.tertiary, "lighter"),
    tertiaryLight:
      newTheme.tertiaryLight ??
      changeColorLuminance(newTheme.tertiary ?? oldTheme.tertiary, "light"),
    tertiary: newTheme.tertiary ?? oldTheme.tertiary,
    tertiaryDark:
      newTheme.tertiaryDark ?? changeColorLuminance(newTheme.tertiary ?? oldTheme.tertiary, "dark"),
    tertiaryDarker:
      newTheme.tertiaryDarker ??
      changeColorLuminance(newTheme.tertiary ?? oldTheme.tertiary, "darker"),
  };
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [providerTheme, setProviderTheme] = useState<UnifiedTheme>(defaultTheme);

  const setTheme = (newTheme: Partial<UnifiedTheme>) => {
    setProviderTheme(setThemeWithLuminances(providerTheme, newTheme));
  };

  const resetTheme = () => {
    setProviderTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{theme: providerTheme, setTheme, resetTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
