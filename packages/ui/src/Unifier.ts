/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import AsyncStorage from "@react-native-async-storage/async-storage";
import {Clipboard, Dimensions, Keyboard, Linking, Vibration} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {PermissionKind, UnifiedTheme} from "./Common";
import {requestPermissions} from "./Permissions";

const DEFAULT_FONT = "Cochin";
const DEFAULT_BOLD_FONT = "Cochin";

const DefaultTheme: UnifiedTheme = {
  // Primary colors
  red: "#bd081c",
  white: "#fdfdfd",
  lightGray: "#efefef",
  gray: "#8e8e8e",
  darkGray: "#111",
  // secondary colors
  green: "#0fa573",
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

  primaryLighter: "#4ED456",
  primaryLight: "#28CA32",
  primary: "#00BD0C",
  primaryDark: "#00960A",
  primaryDarker: "#007508",

  secondaryLighter: "#41AAAE",
  secondaryLight: "#20989D",
  secondary: "#018B91",
  secondaryDark: "#016E73",
  secondaryDarker: "#00565A",

  accentLighter: "#FF625D",
  accentLight: "#FF3732",
  accent: "#F00600",
  accentDark: "#BE0500",
  accentDarker: "#950400",

  tertiaryLighter: "#FFCF67",
  tertiaryLight: "#FFC23E",
  tertiary: "#FFB109",
  tertiaryDark: "#CA8A00",
  tertiaryDarker: "#9F6D00",

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

export type PlatformOS = "ios" | "android" | "web";

class UnifierClass {
  private _theme?: Partial<UnifiedTheme>;
  private _web = false;
  private _dev = false;

  get web(): boolean {
    return this._web;
  }

  get dev(): boolean {
    return this._dev;
  }

  setTheme(theme: Partial<UnifiedTheme>) {
    this._theme = theme;
  }

  get theme(): UnifiedTheme {
    return {
      ...DefaultTheme,
      // Custom per project
      primaryLighter: this._theme?.primaryLighter || this._theme?.primary || DefaultTheme.primary,
      primaryLight: this._theme?.primaryLight || this._theme?.primary || DefaultTheme.primary,
      primary: this._theme?.primary || this._theme?.primary || DefaultTheme.primary,
      primaryDark: this._theme?.primaryDark || this._theme?.primary || DefaultTheme.primary,
      primaryDarker: this._theme?.primaryDarker || this._theme?.primary || DefaultTheme.primary,

      secondaryLighter:
        this._theme?.secondaryLighter || this._theme?.secondary || DefaultTheme.secondary,
      secondaryLight:
        this._theme?.secondaryLight || this._theme?.secondary || DefaultTheme.secondary,
      secondary: this._theme?.secondary || this._theme?.secondary || DefaultTheme.secondary,
      secondaryDark: this._theme?.secondaryDark || this._theme?.secondary || DefaultTheme.secondary,
      secondaryDarker:
        this._theme?.secondaryDarker || this._theme?.secondary || DefaultTheme.secondary,

      accentLighter: this._theme?.accentLighter || this._theme?.accent || DefaultTheme.accent,
      accentLight: this._theme?.accentLight || this._theme?.accent || DefaultTheme.accent,
      accent: this._theme?.accent || this._theme?.accent || DefaultTheme.accent,
      accentDark: this._theme?.accentDark || this._theme?.accent || DefaultTheme.accent,
      accentDarker: this._theme?.accentDarker || this._theme?.accent || DefaultTheme.accent,

      tertiaryLighter: this._theme?.tertiaryLighter || this._theme?.accent || DefaultTheme.accent,
      tertiaryLight: this._theme?.tertiaryLight || this._theme?.accent || DefaultTheme.accent,
      tertiary: this._theme?.tertiary || this._theme?.accent || DefaultTheme.accent,
      tertiaryDark: this._theme?.tertiaryDark || this._theme?.accent || DefaultTheme.accent,
      tertiaryDarker: this._theme?.tertiaryDarker || this._theme?.accent || DefaultTheme.accent,

      primaryFont: this._theme?.primaryFont || DefaultTheme.primaryFont,
      primaryBoldFont:
        this._theme?.primaryBoldFont || this._theme?.primaryFont || DefaultTheme.primaryBoldFont,
      secondaryFont:
        this._theme?.secondaryFont || this._theme?.primaryFont || DefaultTheme.secondaryFont,
      secondaryBoldFont:
        this._theme?.secondaryBoldFont ||
        this._theme?.primaryFont ||
        DefaultTheme.secondaryBoldFont,
      buttonFont: this._theme?.buttonFont || this._theme?.primaryFont || DefaultTheme.buttonFont,
      accentFont: this._theme?.accentFont || this._theme?.primaryFont || DefaultTheme.accentFont,
      accentBoldFont:
        this._theme?.accentBoldFont || this._theme?.primaryFont || DefaultTheme.accentBoldFont,
      titleFont: this._theme?.titleFont || this._theme?.primaryFont || DefaultTheme.titleFont,
    };
  }

  constructor() {
    console.debug("[unifier] Setting up Unifier");
  }

  navigation = {
    dismissOverlay: () => {
      console.warn("Dismiss overlay not supported.");
    },
  };

  // tracking: Tracking,
  utils = {
    dismissKeyboard: () => {
      Keyboard.dismiss();
    },
    dimensions: () => ({
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    }),
    copyToClipboard: (text: string) => {
      Clipboard.setString(text);
    },
    orientationChange: (callback: (orentation: "portrait" | "landscape") => void) => {
      Dimensions.addEventListener("change", () => {
        const screen = Dimensions.get("screen");
        const isPortrait = screen.width < screen.height;
        console.log("Orientation change, isPortrait:", isPortrait);
        callback(isPortrait ? "portrait" : "landscape");
      });
    },
    requestPermissions: async (_perm: PermissionKind) => {
      return requestPermissions(_perm);
      // return requestPermissions(perm);
    },
    makePurchase: () => {
      console.warn("Make purchase not supported yet.");
    },
    PaymentService: () => {
      console.warn("Make purchase not supported yet.");
    },
    vibrate: (pattern?: number[]) => {
      Vibration.vibrate(pattern || [100], false);
    },
    haptic: () => {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };
      ReactNativeHapticFeedback.trigger("impactLight", options);
    },
    openUrl: async (url: string) => {
      return Linking.openURL(url);
    },
    // keepAwake: (activate: boolean) => {
    //   if (activate) {
    //     activateKeepAwake();
    //   } else {
    //     deactivateKeepAwake();
    //   }
    // },
  };

  storage = {
    getItem: async (key: string, defaultValue?: any) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
          let value = JSON.parse(jsonValue);
          if (value === null || value === undefined) {
            return defaultValue;
          } else {
            return value;
          }
        } else if (defaultValue !== undefined) {
          return defaultValue;
        } else {
          return null;
        }
      } catch (e) {
        console.error(`[storage] Error reading ${key}`, e);
        return defaultValue || null;
      }
    },
    setItem: async (key: string, item: any) => {
      try {
        const jsonValue = JSON.stringify(item);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.error(`[storage] Error storing ${key}`, item, e);
        throw new Error(e as any);
      }
    },
  };

  tracking = {
    log: (message: string) => {
      console.log(message);
    },
  };

  initIcons = () => {
    console.debug("[unifier] Initializing icons");
  };
}

const NOTIFICATION_TAB_KEY = "@unifier/tabNotifications";

export const Unifier = new UnifierClass();
