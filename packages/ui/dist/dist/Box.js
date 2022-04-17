var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, View, } from "react-native";
import { SPACING } from "./Common";
import { mediaQueryLargerThan } from "./MediaQuery";
import { Unifier } from "./Unifier";
const ALIGN_CONTENT = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    stretch: "stretch",
};
const ALIGN_ITEMS = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
};
const ALIGN_SELF = {
    auto: "auto",
    baseline: "baseline",
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    stretch: "stretch",
};
export class Box extends React.Component {
    constructor(props) {
        super(props);
        this.BOX_STYLE_MAP = {
            alignItems: (value) => ({ alignItems: ALIGN_ITEMS[value] }),
            alignContent: (value) => ({ alignContent: ALIGN_CONTENT[value] }),
            alignSelf: (value) => ({ alignSelf: ALIGN_SELF[value] }),
            color: (value) => ({ backgroundColor: Unifier.theme[value] }),
            direction: (value) => ({ flexDirection: value, display: "flex" }),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            smDirection: (value, all) => mediaQueryLargerThan("sm") ? { flexDirection: value, display: "flex" } : {},
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mdDirection: (value, all) => mediaQueryLargerThan("md") ? { flexDirection: value, display: "flex" } : {},
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            lgDirection: (value, all) => mediaQueryLargerThan("lg") ? { flexDirection: value, display: "flex" } : {},
            display: (value) => {
                return value === "flex" ? { flex: undefined } : { flex: 0, flexDirection: "row" };
            },
            flex: (value) => {
                if (value === "grow") {
                    return { flexGrow: 1, flexShrink: 1, display: "flex" };
                }
                else if (value === "shrink") {
                    return { flexShrink: 1, display: "flex" };
                }
                else {
                    return { flex: 0, display: "flex" };
                }
            },
            justifyContent: (value) => ({ justifyContent: ALIGN_CONTENT[value] }),
            height: (value) => {
                if (this.props.border && !isNaN(Number(value))) {
                    return { height: Number(value) + 2 * 2 };
                }
                else {
                    return { height: value };
                }
            },
            margin: (value) => ({ margin: value * SPACING }),
            marginRight: (value) => ({ marginRight: value * SPACING }),
            marginLeft: (value) => ({ marginLeft: value * SPACING }),
            marginTop: (value) => ({ marginTop: value * SPACING }),
            marginBottom: (value) => ({ marginBottom: value * SPACING }),
            paddingX: (value) => ({ paddingLeft: value * SPACING, paddingRight: value * SPACING }),
            paddingY: (value) => ({ paddingTop: value * SPACING, paddingBottom: value * SPACING }),
            padding: (value) => ({ padding: value * SPACING }),
            position: (value) => ({ position: value }),
            top: (top) => ({ top: top ? 0 : undefined }),
            bottom: (bottom) => ({ bottom: bottom ? 0 : undefined }),
            right: (right) => ({ right: right ? 0 : undefined }),
            left: (left) => ({ left: left ? 0 : undefined }),
            rounding: (rounding, allProps) => {
                if (rounding === "circle") {
                    if (!allProps.height && !allProps.width) {
                        console.warn("Cannot use Box rounding='circle' without height or width.");
                        return { borderRadius: undefined };
                    }
                    return { borderRadius: allProps.height || allProps.width };
                }
                if (rounding === "pill") {
                    return { borderRadius: 999 };
                }
                if (typeof rounding === "number") {
                    return { borderRadius: rounding * 4 };
                }
                return { borderRadius: undefined };
            },
            overflow: (value) => {
                if (value === "scrollY" || value === "scroll") {
                    return { overflow: "scroll" };
                }
                else if (value === "scollX") {
                    return { overflow: "scrollX" };
                }
                return {};
            },
            width: (value) => {
                if (this.props.border && !isNaN(Number(value))) {
                    return { width: Number(value) + 2 * 2 };
                }
                else {
                    return { width: value };
                }
            },
            wrap: (value) => ({ flexWrap: value ? "wrap" : "nowrap", alignItems: "flex-start" }),
            shadow: (value) => {
                if (!value) {
                    return {};
                }
                if (Platform.OS === "ios" || Platform.OS === "web") {
                    return {
                        shadowColor: "#999",
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowRadius: 2,
                        shadowOpacity: 1.0,
                    };
                }
                else {
                    return { elevation: 4 };
                }
            },
            border: (value) => {
                if (!value) {
                    return {};
                }
                return { borderColor: Unifier.theme[value], borderWidth: 2 };
            },
        };
        this.scrollRef = React.createRef();
        this.scrollToEnd = () => {
            if (this.scrollRef && this.scrollRef.current) {
                // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
                // avoid this, but it works well enough.
                setTimeout(() => {
                    this.scrollRef && this.scrollRef.current && this.scrollRef.current.scrollToEnd();
                }, 50);
            }
        };
        this.scrollTo = (y) => {
            if (this.scrollRef && this.scrollRef.current) {
                // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
                // avoid this, but it works well enough.
                setTimeout(() => {
                    this.scrollRef && this.scrollRef.current && this.scrollRef.current.scrollTo({ y });
                }, 50);
            }
        };
        if (props.scrollRef) {
            this.scrollRef = props.scrollRef;
        }
    }
    propsToStyle() {
        let style = {};
        for (const prop of Object.keys(this.props)) {
            const value = this.props[prop];
            if (this.BOX_STYLE_MAP[prop]) {
                Object.assign(style, this.BOX_STYLE_MAP[prop](value, this.props));
            }
            else if (prop !== "children" && prop !== "onClick") {
                style[prop] = value;
                // console.warn(`Box: unknown property ${prop}`);
            }
        }
        if (this.props.wrap && this.props.alignItems) {
            console.warn("React Native doesn't support wrap and alignItems together.");
        }
        // Finally, dangerously set overrides.
        if (this.props.dangerouslySetInlineStyle) {
            style = Object.assign(Object.assign({}, style), this.props.dangerouslySetInlineStyle.__style);
        }
        return style;
    }
    renderBox() {
        return (React.createElement(View, { style: !this.props.scroll && !this.props.overflow && this.propsToStyle() }, this.props.children));
    }
    render() {
        let box;
        if (this.props.onClick) {
            box = (React.createElement(TouchableOpacity, { style: this.propsToStyle(),
                // TODO: refactor this better..
                onLayout: this.props.onLayout, onPress: () => {
                    Unifier.utils.haptic();
                    this.props.onClick();
                } }, this.props.children));
        }
        else {
            box = React.createElement(View, { style: this.propsToStyle() }, this.props.children);
        }
        if (this.props.scroll) {
            const _a = this.propsToStyle(), { justifyContent, alignContent, alignItems } = _a, scrollStyle = __rest(_a, ["justifyContent", "alignContent", "alignItems"]);
            box = (React.createElement(ScrollView, { horizontal: this.props.overflow === "scrollX", style: scrollStyle, contentContainerStyle: { justifyContent, alignContent, alignItems }, keyboardShouldPersistTaps: "handled", ref: this.props.scrollRef || this.scrollRef, onScroll: (event) => {
                    if (this.props.onScroll && event) {
                        this.props.onScroll(event.nativeEvent.contentOffset.y);
                    }
                }, scrollEventThrottle: 50 }, box));
        }
        if (this.props.avoidKeyboard) {
            box = (React.createElement(KeyboardAvoidingView, { behavior: Platform.OS === "ios" ? "padding" : "height", style: { flex: 1, display: "flex" }, keyboardVerticalOffset: this.props.keyboardOffset }, React.createElement(SafeAreaView, { style: { flex: 1, display: "flex" } }, box)));
        }
        return box;
    }
}
//# sourceMappingURL=Box.js.map
//# sourceMappingURL=Box.js.map