/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import {Dimensions, Keyboard, Linking, Platform, Vibration} from "react-native";

import {FernsTheme, PermissionKind} from "./Common";
import {requestPermissions} from "./Permissions";

declare global {
  interface Window {
    google: any;
  }
}

export type PlatformOS = "ios" | "android" | "web";

type Luminance = "light" | "lighter" | "dark" | "darker";

// Changes a color luminance
export function changeColorLuminance(hex: string, luminanceChange: Luminance) {
  // Validate hex string, strip "#" if present.
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length !== 6) {
    throw new Error(`Invalid color hex: ${hex}`);
  }
  let luminance;
  switch (luminanceChange) {
    case "light":
      luminance = -0.2;
      break;
    case "lighter":
      luminance = -0.33;
      break;
    case "dark":
      luminance = 0.2;
      break;
    case "darker":
      luminance = 0.33;
      break;
    default:
      throw new Error(`Cannot change luminance to ${luminanceChange}`);
  }

  // Convert to decimal and change luminosity
  let rgb = "#";
  for (let i = 0; i < 3; i++) {
    const decimal = parseInt(hex.substr(i * 2, 2), 16);
    const appliedLuminance = Math.round(
      Math.min(Math.max(0, decimal + decimal * luminance), 255)
    ).toString(16);
    // 0 pad, if necessary.
    rgb += `00${appliedLuminance}`.substr(appliedLuminance.length);
  }

  return rgb;
}

class UnifierClass {
  private _theme?: Partial<FernsTheme>;

  private _web = false;

  private _dev = false;

  get web(): boolean {
    return this._web;
  }

  get dev(): boolean {
    return this._dev;
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
    orientationChange: (callback: (orientation: "portrait" | "landscape") => void) => {
      Dimensions.addEventListener("change", () => {
        const screen = Dimensions.get("screen");
        const isPortrait = screen.width < screen.height;
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
      if (Platform.OS !== "web") {
        return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      return;
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
          const value = JSON.parse(jsonValue);
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
      } catch (error) {
        console.error(`[storage] Error reading ${key}`, error);
        return defaultValue || null;
      }
    },
    setItem: async (key: string, item: any) => {
      try {
        const jsonValue = JSON.stringify(item);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (error: any) {
        console.error(`[storage] Error storing ${key}`, item, error);
        throw new Error(error);
      }
    },
  };

  tracking = {
    log: (message: string) => {
      console.info(message);
    },
  };

  initIcons = () => {
    console.debug("[unifier] Initializing icons");
  };
}

export const Unifier = new UnifierClass();
