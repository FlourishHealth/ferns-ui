import React, {createContext, useMemo, useState} from "react";

import {FernsTheme, FernsThemeConfig, ThemePrimitives} from "./Common";

const defaultPrimitives = {
  neutral000: "#FFFFFF",
  neutral050: "#F2F2F2",
  neutral100: "#E6E6E6",
  neutral200: "#D9D9D9",
  neutral300: "#CDCDCD",
  neutral400: "#B3B3B3",
  neutral500: "#9A9A9A",
  neutral600: "#686868",
  neutral700: "#4E4E4E",
  neutral800: "#353535",
  neutral900: "#1C1C1C",

  primary000: "#EBFAFF",
  primary050: "#BCE9F7",
  primary100: "#90D8F0",
  primary200: "#73CAE8",
  primary300: "#40B8E0",
  primary400: "#0E9DCD",
  primary500: "#0086B3",
  primary600: "#0A7092",
  primary700: "#035D7E",
  primary800: "#004B64",
  primary900: "#013749",

  secondary000: "#F2F9FA",
  secondary050: "#D7E5EA",
  secondary100: "#B6CDD5",
  secondary200: "#9EB7BF",
  secondary300: "#87A1AA",
  secondary400: "#608997",
  secondary500: "#2B6072",
  secondary600: "#1C4E5F",
  secondary700: "#0F3D4D",
  secondary800: "#092E3A",
  secondary900: "#041E27",

  accent000: "#FFFDF7",
  accent050: "#FCECC2",
  accent100: "#F9E0A1",
  accent200: "#F7D582",
  accent300: "#F2CB62",
  accent400: "#E5B132",
  accent500: "#D69C0E",
  accent600: "#B58201",
  accent700: "#956A00",
  accent800: "#543C00",
  accent900: "#332400",

  error000: "#FDD7D7",
  error100: "#D33232",
  error200: "#BD1111",

  warning000: "#FFE3C6",
  warning100: "#F36719",
  warning200: "#B14202",

  success000: "#DCF2E2",
  success100: "#3EA45C",
  success200: "#1A7F36",

  spacing0: 0,
  spacing1: 4,
  spacing2: 8,
  spacing3: 12,
  spacing4: 16,
  spacing5: 24,
  spacing6: 32,
  spacing7: 40,
  spacing8: 48,
  spacing9: 56,
  spacing10: 64,
  spacing11: 72,
  spacing12: 80,

  radiusSm: 1,
  radiusMd: 3,
  radiusLg: 16,
  radiusXl: 32,
  radius2xl: 128,
  radius3xl: 360,
};

const defaultTheme: FernsThemeConfig = {
  text: {
    primary: "neutral900",
    inverted: "neutral000",
    // TODO: ask jo about the naming here, secondaryDark is a blue, secondaryLight is a gray.
    secondaryLight: "neutral600",
    extraLight: "neutral500",
    secondaryDark: "secondary800",
    link: "primary600",
    linkLight: "primary400",
    accent: "accent700",
    error: "error200",
    warning: "warning200",
    success: "success200",
  },
  surface: {
    base: "neutral000",
    primary: "primary400",
    secondaryLight: "secondary100",
    secondaryDark: "secondary500",
    secondaryExtraDark: "secondary800",
    neutral: "neutral600",
    neutralLight: "neutral200",
    neutralDark: "neutral800",
    disabled: "neutral500",
    error: "error200",
    errorLight: "error000",
    success: "success200",
    successLight: "success000",
    warning: "warning100",
    warningLight: "warning000",
  },
  border: {
    default: "neutral300",
    dark: "neutral500",
    activeNeutral: "neutral700",
    activeAccent: "accent500",
    hover: "neutral200",
    focus: "primary200",
    error: "error100",
    success: "success100",
    warning: "warning100",
  },
  status: {
    active: "success100",
    doNotDisturb: "error100",
    away: "neutral500",
  },
  radius: {
    minimal: "radiusSm",
    default: "radiusMd",
    full: "radiusLg",
    rounded: "radius3xl",
  },
  spacing: {
    none: "spacing0",
    xs: "spacing1",
    sm: "spacing2",
    md: "spacing4",
    lg: "spacing5",
    xl: "spacing6",
    "2xl": "spacing8",
    "3xl": "spacing12",
  },

  // These will continue to throw errors until we have a proper font system in place.
  // TODO: currently to use these, you need to set fontFamily to "text" or "heading",
  // not theme.font.primary or theme.font.title.
  font: {
    primary: "Nunito",
    title: "Titillium Web",
  },
  primitives: defaultPrimitives,
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const ThemeContext = createContext({
  setTheme: (_theme: DeepPartial<FernsThemeConfig>) => {},
  setPrimitives: (_primitives: DeepPartial<typeof defaultPrimitives>) => {},
  theme: {} as FernsTheme,
  resetTheme: () => {},
});

interface ThemeProviderProps {
  children: any;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [providerTheme, setProviderTheme] = useState<DeepPartial<FernsThemeConfig>>(defaultTheme);
  const [providerPrimitives, setProviderPrimitives] = useState<ThemePrimitives>(defaultPrimitives);

  const computedTheme = useMemo(() => {
    // Map the providerTheme and transform the strings into the actual values from the primitives.
    // Do this for each sub-object in the theme. E.g. theme.text, theme.surface, etc.
    const theme = Object.keys(providerTheme).reduce((acc, key) => {
      if (key === "primitives") return acc;
      const value = providerTheme[key as keyof FernsThemeConfig] ?? {};
      // for each key, map the value to the primitive value.
      acc[key as keyof FernsTheme] = Object.keys(value).reduce((accKey, valueKey) => {
        const primitiveKey = value[valueKey as keyof typeof value] as keyof ThemePrimitives;
        if (key === "font") {
          accKey[valueKey] = primitiveKey;
        } else {
          if (providerPrimitives[primitiveKey] === undefined) {
            console.error(`Primitive ${primitiveKey} not found in theme.`);
          }
          accKey[valueKey as keyof typeof accKey] = providerPrimitives[primitiveKey];
        }
        return accKey;
      }, {} as any);
      return acc;
    }, {} as FernsTheme);
    return {
      ...theme,
      primitives: providerPrimitives,
    };
  }, [providerTheme, providerPrimitives]);

  const setPrimitives = (newPrimitives: Partial<ThemePrimitives>) => {
    setProviderPrimitives((prev) => ({...prev, ...newPrimitives}));
  };

  const setTheme = (newTheme: DeepPartial<FernsThemeConfig>) => {
    setProviderTheme((prev) => {
      const mergedTheme = {...prev};

      for (const key in newTheme) {
        if (newTheme.hasOwnProperty(key)) {
          const newSubTheme = newTheme[key as keyof FernsThemeConfig];
          const prevSubTheme = prev[key as keyof FernsThemeConfig];

          if (newSubTheme && typeof newSubTheme === "object") {
            (mergedTheme as any)[key as keyof FernsThemeConfig] = {...prevSubTheme, ...newSubTheme};
          } else {
            mergedTheme[key as keyof FernsThemeConfig] = newSubTheme as any;
          }
        }
      }

      return mergedTheme;
    });
  };

  const resetTheme = () => {
    setProviderTheme(defaultTheme);
    setProviderPrimitives(defaultPrimitives);
  };

  return (
    <ThemeContext.Provider value={{theme: computedTheme, setTheme, setPrimitives, resetTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
