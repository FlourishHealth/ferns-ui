// import {Screens} from "./UnifiedScreens";
export var UnifierScreens;
(function (UnifierScreens) {
    // BarcodeView = "BarcodeView",
    UnifierScreens["Contacts"] = "Contacts";
    UnifierScreens["FullPageModal"] = "FullPageModal";
    UnifierScreens["Auth"] = "Auth";
    UnifierScreens["Spinner"] = "lib.Spinner";
    UnifierScreens["Payment"] = "Payment";
    UnifierScreens["Onboarding"] = "Onboarding";
})(UnifierScreens || (UnifierScreens = {}));
let initialized = false;
export function initializeUnifiedScreens() {
    if (initialized) {
        console.error("Cannot initialize screens multiple times.");
        return;
    }
    initialized = true;
    console.debug("[unifier] Registering unifier screens");
    // Unifier.navigation.registerScreen(UnifierScreens.Auth, Auth, {url: "/auth"});
    // registerScreen(Screens.BarcodeView, BarcodeView, {url: "/barcode"});
    // Unifier.navigation.registerScreen(UnifierScreens.FullPageModal, FullPageModal, {url: "/item"});
    // Unifier.navigation.registerScreen(UnifierScreens.Spinner, Spinner);
}
//# sourceMappingURL=UnifiedScreens.js.map
//# sourceMappingURL=UnifiedScreens.js.map