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
import moment from "moment-timezone";
import React from "react";
import { ActivityIndicator, Platform, TextInput, View } from "react-native";
import { Box } from "./Box";
import { DateTimeActionSheet } from "./DateTimeActionSheet";
import { DecimalRangeActionSheet } from "./DecimalRangeActionSheet";
import { HeightActionSheet } from "./HeightActionSheet";
import { Icon } from "./Icon";
import { NumberPickerActionSheet } from "./NumberPickerActionSheet";
import { Unifier } from "./Unifier";
import { WithLabel } from "./WithLabel";
export class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.dateActionSheetRef = React.createRef();
        this.numberRangeActionSheetRef = React.createRef();
        this.decimalRangeActionSheetRef = React.createRef();
        this.weightActionSheetRef = React.createRef();
        this.keyboardMap = {
            date: "default",
            email: "email-address",
            number: "number-pad",
            numberRange: "number-pad",
            decimalRange: "decimal-pad",
            decimal: "decimal-pad",
            height: "default",
            password: "default",
            search: "default",
            text: "default",
            url: Platform.select({
                ios: "url",
                android: "default",
            }),
            username: "default",
        };
        this.textContentMap = {
            date: "none",
            email: "emailAddress",
            number: "none",
            decimal: "none",
            decimalRange: "none",
            height: "none",
            password: "password",
            search: "none",
            text: "none",
            url: Platform.select({
                ios: "URL",
                android: "none",
            }),
            username: "username",
        };
        this.getBorderColor = () => {
            if (this.props.errorMessage) {
                return Unifier.theme.red;
            }
            else if (this.state.focused) {
                return Unifier.theme.blue;
            }
            else {
                return Unifier.theme.gray;
            }
        };
        this.getHeight = () => {
            if (this.props.grow) {
                return Math.max(40, this.state.height);
            }
            else if (this.props.multiline) {
                return this.props.height || "100%";
            }
            else {
                return 40;
            }
        };
        this.isHandledByModal = () => {
            return (this.props.type === "date" ||
                this.props.type === "numberRange" ||
                this.props.type === "decimalRange" ||
                this.props.type === "height");
        };
        this.state = { focused: false, height: props.height || 40 };
    }
    renderIcon() {
        if (this.props.type !== "search") {
            return null;
        }
        if (this.props.searching === true) {
            return (React.createElement(Box, { marginRight: 4 },
                React.createElement(ActivityIndicator, { color: Unifier.theme.primary, size: "small" })));
        }
        else {
            return (React.createElement(Box, { marginRight: 2 },
                React.createElement(Icon, { name: "search", prefix: "far", size: 14 })));
        }
    }
    focus() {
        // Empty
    }
    isEditable() {
        return !this.props.disabled && !this.isHandledByModal();
    }
    render() {
        const type = this.props.type || "text";
        const keyboardType = this.keyboardMap[type];
        // let textContentType = this.textContentMap[this.props.type || "text"];
        const _a = this.props, { errorMessage } = _a, props = __rest(_a, ["errorMessage"]);
        let value = this.props.value;
        if (this.props.type === "date") {
            value = moment(this.props.value).format("MM/DD/YYYY");
        }
        else if (this.props.type === "height") {
            value = `${Math.floor(Number(this.props.value) / 12)} ft, ${Number(this.props.value) % 12} in`;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(WithLabel, { label: errorMessage, labelColor: this.props.errorMessageColor || "red", labelPlacement: "after", labelSize: "sm" },
                React.createElement(WithLabel, Object.assign({}, props),
                    React.createElement(View, { style: {
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            // height: 40,
                            // minHeight: this.getHeight(),
                            minHeight: this.getHeight(),
                            width: "100%",
                            // Add padding so the border doesn't mess up layouts
                            paddingHorizontal: this.props.paddingX || this.state.focused ? 10 : 14,
                            paddingVertical: this.props.paddingY || this.state.focused ? 0 : 4,
                            borderColor: this.getBorderColor(),
                            borderWidth: this.state.focused && !this.props.errorMessage ? 5 : 1,
                            borderRadius: 16,
                            backgroundColor: this.props.disabled ? Unifier.theme.gray : Unifier.theme.white,
                            overflow: "hidden",
                        }, onTouchEnd: () => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            if (this.props.type === "date") {
                                (_b = (_a = this.dateActionSheetRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setModalVisible(true);
                            }
                            else if (this.props.type === "numberRange") {
                                (_d = (_c = this.numberRangeActionSheetRef) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.setModalVisible(true);
                            }
                            else if (this.props.type === "decimalRange") {
                                (_f = (_e = this.decimalRangeActionSheetRef) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.setModalVisible(true);
                            }
                            else if (this.props.type === "height") {
                                (_h = (_g = this.weightActionSheetRef) === null || _g === void 0 ? void 0 : _g.current) === null || _h === void 0 ? void 0 : _h.setModalVisible(true);
                            }
                        } },
                        this.renderIcon(),
                        React.createElement(TextInput, { ref: (ref) => {
                                if (this.props.inputRef) {
                                    this.props.inputRef(ref);
                                }
                            }, autoCapitalize: type === "text" ? "sentences" : "none", autoFocus: this.props.autoFocus, blurOnSubmit: true, 
                            // TODO: uncomment with upgrade to React 0.56.
                            // textContentType={textContentType}
                            editable: this.isEditable(), keyboardType: keyboardType, multiline: this.props.multiline, numberOfLines: this.props.rows || 4, placeholder: this.props.placeholder, placeholderTextColor: Unifier.theme.gray, returnKeyType: type === "number" || type === "decimal" ? "done" : this.props.returnKeyType, secureTextEntry: type === "password", 
                            // For react-native-autofocus
                            style: Object.assign({ flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 0, height: this.getHeight(), width: "100%", color: Unifier.theme.darkGray, fontFamily: Unifier.theme.primaryFont, 
                                // Remove border in web.
                                outlineWidth: 0 }, this.props.style), underlineColorAndroid: "transparent", value: value, onBlur: () => {
                                if (!this.isHandledByModal()) {
                                    this.setState({ focused: false });
                                }
                                if (this.props.onBlur && this.props.value) {
                                    this.props.onBlur({ value: this.props.value });
                                }
                                // if (this.props.type === "date") {
                                //   this.actionSheetRef?.current?.setModalVisible(false);
                                // }
                            }, onChangeText: (text) => {
                                this.props.onChange({ value: text });
                            }, onContentSizeChange: (event) => {
                                if (!this.props.grow) {
                                    return;
                                }
                                this.setState({ height: event.nativeEvent.contentSize.height });
                            }, onFocus: () => {
                                if (!this.isHandledByModal()) {
                                    this.setState({ focused: true });
                                }
                            }, onSubmitEditing: () => {
                                if (this.props.onEnter) {
                                    this.props.onEnter();
                                }
                                if (this.props.onSubmitEditing) {
                                    this.props.onSubmitEditing();
                                }
                            } })))),
            this.props.type === "date" && (React.createElement(DateTimeActionSheet, { actionSheetRef: this.dateActionSheetRef, mode: "date", value: this.props.value, onChange: (result) => this.props.onChange(result) })),
            this.props.type === "numberRange" && this.props.value && (React.createElement(NumberPickerActionSheet, { actionSheetRef: this.numberRangeActionSheetRef, max: this.props.max || (this.props.min || 0) + 100, min: this.props.min || 0, value: this.props.value, onChange: (result) => this.props.onChange(result) })),
            this.props.type === "decimalRange" && this.props.value && (React.createElement(DecimalRangeActionSheet, { actionSheetRef: this.decimalRangeActionSheetRef, max: this.props.max || (this.props.min || 0) + 100, min: this.props.min || 0, value: this.props.value, onChange: (result) => this.props.onChange(result) })),
            this.props.type === "height" && (React.createElement(HeightActionSheet, { actionSheetRef: this.weightActionSheetRef, value: this.props.value, onChange: (result) => {
                    this.props.onChange(result);
                } }))));
    }
}
//# sourceMappingURL=TextField.js.map