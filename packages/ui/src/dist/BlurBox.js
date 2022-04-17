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
import React from "react";
import { Box } from "./Box";
import { mergeInlineStyles } from "./Utilities";
export class BlurBox extends React.Component {
    render() {
        const _a = this.props, { marginBottom, marginTop, margin } = _a, props = __rest(_a, ["marginBottom", "marginTop", "margin"]);
        return (React.createElement(Box, Object.assign({}, this.props, { dangerouslySetInlineStyle: mergeInlineStyles(this.props.dangerouslySetInlineStyle, {
                // filter: "blur(4px)",
                backdropFilter: "blur(4px)",
                backgroundColor: "#111",
                opacity: 0.8,
                borderRadius: 12,
            }), marginBottom: marginBottom || 4, marginTop: marginTop || 0, margin: margin || 0 }),
            React.createElement(Box, Object.assign({ paddingX: 4 }, props), this.props.children)));
    }
}
//# sourceMappingURL=BlurBox.js.map