import { PermissionKind, UnifiedTheme } from "./Common";
export declare type PlatformOS = "ios" | "android" | "web";
declare class UnifierClass {
    private _theme?;
    private _web;
    private _dev;
    get web(): boolean;
    get dev(): boolean;
    setTheme(theme: Partial<UnifiedTheme>): void;
    get theme(): UnifiedTheme;
    constructor();
    navigation: {
        dismissOverlay: () => void;
    };
    utils: {
        dismissKeyboard: () => void;
        dimensions: () => {
            width: number;
            height: number;
        };
        copyToClipboard: (text: string) => void;
        orientationChange: (callback: (orentation: "portrait" | "landscape") => void) => void;
        requestPermissions: (_perm: PermissionKind) => Promise<import("./Common").PermissionStatus>;
        makePurchase: () => void;
        PaymentService: () => void;
        vibrate: (pattern?: number[] | undefined) => void;
        haptic: () => void;
        openUrl: (url: string) => Promise<any>;
    };
    storage: {
        getItem: (key: string, defaultValue?: any) => Promise<any>;
        setItem: (key: string, item: any) => Promise<void>;
    };
    tracking: {
        log: (message: string) => void;
    };
    initIcons: () => void;
}
export declare const Unifier: UnifierClass;
export {};
