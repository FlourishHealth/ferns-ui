var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { BlurView } from "@react-native-community/blur";
import React from "react";
import { Platform, View } from "react-native";
import { Box } from "./Box";
export class BlurBox extends React.Component {
    renderBlur(children) {
        if (Platform.OS === "ios") {
            return (React.createElement(BlurView, { blurType: this.props.blurType || "regular", style: { borderRadius: 12 } }, children));
        }
        else {
            return (React.createElement(View, { style: { backgroundColor: "rgba(82, 82, 82, 0.7)", borderRadius: 10 } }, children));
        }
    }
    render() {
        const _a = this.props, { marginBottom, marginTop, margin } = _a, props = __rest(_a, ["marginBottom", "marginTop", "margin"]);
        return (React.createElement(Box, { marginBottom: marginBottom || 4, marginTop: marginTop || 0, margin: margin || 0, width: "100%" }, this.renderBlur(React.createElement(Box, Object.assign({ paddingX: 4 }, props), this.props.children))));
    }
}
//# sourceMappingURL=BlurBox.native.js.map