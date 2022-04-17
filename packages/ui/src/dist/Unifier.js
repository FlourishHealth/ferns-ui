/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clipboard, Dimensions, Keyboard, Linking, Vibration } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { requestPermissions } from "./Permissions";
const DEFAULT_FONT = "Cochin";
const DEFAULT_BOLD_FONT = "Cochin";
const DefaultTheme = {
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
class UnifierClass {
    constructor() {
        this._web = false;
        this._dev = false;
        this.navigation = {
            dismissOverlay: () => {
                console.warn("Dismiss overlay not supported.");
            },
        };
        // tracking: Tracking,
        this.utils = {
            dismissKeyboard: () => {
                Keyboard.dismiss();
            },
            dimensions: () => ({
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
            }),
            copyToClipboard: (text) => {
                Clipboard.setString(text);
            },
            orientationChange: (callback) => {
                Dimensions.addEventListener("change", () => {
                    const screen = Dimensions.get("screen");
                    const isPortrait = screen.width < screen.height;
                    console.log("Orientation change, isPortrait:", isPortrait);
                    callback(isPortrait ? "portrait" : "landscape");
                });
            },
            requestPermissions: async (_perm) => {
                return requestPermissions(_perm);
                // return requestPermissions(perm);
            },
            makePurchase: () => {
                console.warn("Make purchase not supported yet.");
            },
            PaymentService: () => {
                console.warn("Make purchase not supported yet.");
            },
            vibrate: (pattern) => {
                Vibration.vibrate(pattern || [100], false);
            },
            haptic: () => {
                const options = {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: false,
                };
                ReactNativeHapticFeedback.trigger("impactLight", options);
            },
            openUrl: async (url) => {
                return Linking.openURL(url);
            },
        };
        this.storage = {
            getItem: async (key, defaultValue) => {
                try {
                    const jsonValue = await AsyncStorage.getItem(key);
                    if (jsonValue) {
                        let value = JSON.parse(jsonValue);
                        if (value === null || value === undefined) {
                            return defaultValue;
                        }
                        else {
                            return value;
                        }
                    }
                    else if (defaultValue !== undefined) {
                        return defaultValue;
                    }
                    else {
                        return null;
                    }
                }
                catch (e) {
                    console.error(`[storage] Error reading ${key}`, e);
                    return defaultValue || null;
                }
            },
            setItem: async (key, item) => {
                try {
                    const jsonValue = JSON.stringify(item);
                    await AsyncStorage.setItem(key, jsonValue);
                }
                catch (e) {
                    console.error(`[storage] Error storing ${key}`, item, e);
                    throw new Error(e);
                }
            },
        };
        this.tracking = {
            log: (message) => {
                console.log(message);
            },
        };
        this.initIcons = () => {
            console.debug("[unifier] Initializing icons");
        };
        console.debug("[unifier] Setting up Unifier");
    }
    get web() {
        return this._web;
    }
    get dev() {
        return this._dev;
    }
    setTheme(theme) {
        this._theme = theme;
    }
    get theme() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30;
        return Object.assign(Object.assign({}, DefaultTheme), { 
            // Custom per project
            primaryLighter: ((_a = this._theme) === null || _a === void 0 ? void 0 : _a.primaryLighter) || ((_b = this._theme) === null || _b === void 0 ? void 0 : _b.primary) || DefaultTheme.primary, primaryLight: ((_c = this._theme) === null || _c === void 0 ? void 0 : _c.primaryLight) || ((_d = this._theme) === null || _d === void 0 ? void 0 : _d.primary) || DefaultTheme.primary, primary: ((_e = this._theme) === null || _e === void 0 ? void 0 : _e.primary) || ((_f = this._theme) === null || _f === void 0 ? void 0 : _f.primary) || DefaultTheme.primary, primaryDark: ((_g = this._theme) === null || _g === void 0 ? void 0 : _g.primaryDark) || ((_h = this._theme) === null || _h === void 0 ? void 0 : _h.primary) || DefaultTheme.primary, primaryDarker: ((_j = this._theme) === null || _j === void 0 ? void 0 : _j.primaryDarker) || ((_k = this._theme) === null || _k === void 0 ? void 0 : _k.primary) || DefaultTheme.primary, secondaryLighter: ((_l = this._theme) === null || _l === void 0 ? void 0 : _l.secondaryLighter) || ((_m = this._theme) === null || _m === void 0 ? void 0 : _m.secondary) || DefaultTheme.secondary, secondaryLight: ((_o = this._theme) === null || _o === void 0 ? void 0 : _o.secondaryLight) || ((_p = this._theme) === null || _p === void 0 ? void 0 : _p.secondary) || DefaultTheme.secondary, secondary: ((_q = this._theme) === null || _q === void 0 ? void 0 : _q.secondary) || ((_r = this._theme) === null || _r === void 0 ? void 0 : _r.secondary) || DefaultTheme.secondary, secondaryDark: ((_s = this._theme) === null || _s === void 0 ? void 0 : _s.secondaryDark) || ((_t = this._theme) === null || _t === void 0 ? void 0 : _t.secondary) || DefaultTheme.secondary, secondaryDarker: ((_u = this._theme) === null || _u === void 0 ? void 0 : _u.secondaryDarker) || ((_v = this._theme) === null || _v === void 0 ? void 0 : _v.secondary) || DefaultTheme.secondary, accentLighter: ((_w = this._theme) === null || _w === void 0 ? void 0 : _w.accentLighter) || ((_x = this._theme) === null || _x === void 0 ? void 0 : _x.accent) || DefaultTheme.accent, accentLight: ((_y = this._theme) === null || _y === void 0 ? void 0 : _y.accentLight) || ((_z = this._theme) === null || _z === void 0 ? void 0 : _z.accent) || DefaultTheme.accent, accent: ((_0 = this._theme) === null || _0 === void 0 ? void 0 : _0.accent) || ((_1 = this._theme) === null || _1 === void 0 ? void 0 : _1.accent) || DefaultTheme.accent, accentDark: ((_2 = this._theme) === null || _2 === void 0 ? void 0 : _2.accentDark) || ((_3 = this._theme) === null || _3 === void 0 ? void 0 : _3.accent) || DefaultTheme.accent, accentDarker: ((_4 = this._theme) === null || _4 === void 0 ? void 0 : _4.accentDarker) || ((_5 = this._theme) === null || _5 === void 0 ? void 0 : _5.accent) || DefaultTheme.accent, tertiaryLighter: ((_6 = this._theme) === null || _6 === void 0 ? void 0 : _6.tertiaryLighter) || ((_7 = this._theme) === null || _7 === void 0 ? void 0 : _7.accent) || DefaultTheme.accent, tertiaryLight: ((_8 = this._theme) === null || _8 === void 0 ? void 0 : _8.tertiaryLight) || ((_9 = this._theme) === null || _9 === void 0 ? void 0 : _9.accent) || DefaultTheme.accent, tertiary: ((_10 = this._theme) === null || _10 === void 0 ? void 0 : _10.tertiary) || ((_11 = this._theme) === null || _11 === void 0 ? void 0 : _11.accent) || DefaultTheme.accent, tertiaryDark: ((_12 = this._theme) === null || _12 === void 0 ? void 0 : _12.tertiaryDark) || ((_13 = this._theme) === null || _13 === void 0 ? void 0 : _13.accent) || DefaultTheme.accent, tertiaryDarker: ((_14 = this._theme) === null || _14 === void 0 ? void 0 : _14.tertiaryDarker) || ((_15 = this._theme) === null || _15 === void 0 ? void 0 : _15.accent) || DefaultTheme.accent, primaryFont: ((_16 = this._theme) === null || _16 === void 0 ? void 0 : _16.primaryFont) || DefaultTheme.primaryFont, primaryBoldFont: ((_17 = this._theme) === null || _17 === void 0 ? void 0 : _17.primaryBoldFont) || ((_18 = this._theme) === null || _18 === void 0 ? void 0 : _18.primaryFont) || DefaultTheme.primaryBoldFont, secondaryFont: ((_19 = this._theme) === null || _19 === void 0 ? void 0 : _19.secondaryFont) || ((_20 = this._theme) === null || _20 === void 0 ? void 0 : _20.primaryFont) || DefaultTheme.secondaryFont, secondaryBoldFont: ((_21 = this._theme) === null || _21 === void 0 ? void 0 : _21.secondaryBoldFont) || ((_22 = this._theme) === null || _22 === void 0 ? void 0 : _22.primaryFont) ||
                DefaultTheme.secondaryBoldFont, buttonFont: ((_23 = this._theme) === null || _23 === void 0 ? void 0 : _23.buttonFont) || ((_24 = this._theme) === null || _24 === void 0 ? void 0 : _24.primaryFont) || DefaultTheme.buttonFont, accentFont: ((_25 = this._theme) === null || _25 === void 0 ? void 0 : _25.accentFont) || ((_26 = this._theme) === null || _26 === void 0 ? void 0 : _26.primaryFont) || DefaultTheme.accentFont, accentBoldFont: ((_27 = this._theme) === null || _27 === void 0 ? void 0 : _27.accentBoldFont) || ((_28 = this._theme) === null || _28 === void 0 ? void 0 : _28.primaryFont) || DefaultTheme.accentBoldFont, titleFont: ((_29 = this._theme) === null || _29 === void 0 ? void 0 : _29.titleFont) || ((_30 = this._theme) === null || _30 === void 0 ? void 0 : _30.primaryFont) || DefaultTheme.titleFont });
    }
}
const NOTIFICATION_TAB_KEY = "@unifier/tabNotifications";
export const Unifier = new UnifierClass();
//# sourceMappingURL=Unifier.js.map