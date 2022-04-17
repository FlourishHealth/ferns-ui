import range from "lodash/range";
import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
import { Picker } from "@react-native-picker/picker";
const PICKER_HEIGHT = 104;
export class HeightActionSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feet: String(Math.floor(Number(props.value) / 12)),
            inches: String(Number(props.value) % 12),
        };
    }
    render() {
        return (React.createElement(ActionSheet, { ref: this.props.actionSheetRef, gestureEnabled: true, bounceOnOpen: true },
            React.createElement(Box, { width: "100%", paddingX: 4, marginBottom: 8 },
                React.createElement(Box, { width: "100%", display: "flex", alignItems: "end" },
                    React.createElement(Box, { width: "33%" },
                        React.createElement(Button, { type: "ghost", text: "Close", color: "blue", size: "lg", onClick: () => {
                                var _a, _b;
                                (_b = (_a = this.props.actionSheetRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setModalVisible(false);
                            } }))),
                React.createElement(Box, { width: "100%", direction: "row" },
                    React.createElement(Box, { width: "50%" },
                        React.createElement(Picker, { style: {
                                height: PICKER_HEIGHT,
                                backgroundColor: "#FFFFFF",
                            }, itemStyle: {
                                height: PICKER_HEIGHT,
                            }, selectedValue: this.state.feet, onValueChange: (feet) => {
                                this.setState({ feet: String(feet) });
                                this.props.onChange({
                                    value: String(Number(feet) * 12 + Number(this.state.inches)),
                                });
                            } }, range(4, 8).map((n) => {
                            // console.log("FIRST", String(n));
                            return React.createElement(Picker.Item, { key: String(n), label: String(n) + "ft", value: String(n) });
                        }))),
                    React.createElement(Box, { width: "50%" },
                        React.createElement(Picker, { style: {
                                height: PICKER_HEIGHT,
                                backgroundColor: "#FFFFFF",
                            }, itemStyle: {
                                height: PICKER_HEIGHT,
                            }, selectedValue: this.state.inches, onValueChange: (inches) => {
                                this.setState({ inches: String(inches) });
                                this.props.onChange({
                                    value: String(Number(this.state.feet) * 12 + Number(inches)),
                                });
                            } }, range(0, 12).map((n) => {
                            // console.log("N", n);
                            return React.createElement(Picker.Item, { key: String(n), label: String(n) + "in", value: String(n) });
                        })))))));
    }
}
//# sourceMappingURL=HeightActionSheet.js.map