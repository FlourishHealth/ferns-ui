import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
import { Picker } from "@react-native-picker/picker";
import range from "lodash/range";
const PICKER_HEIGHT = 104;
export class DecimalRangeActionSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            whole: String(Math.floor(Number(props.value))),
            decimal: String((Number(props.value) * 10) % 10),
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
                            }, selectedValue: this.state.whole, onValueChange: (whole) => {
                                this.setState({ whole: String(whole) });
                                this.props.onChange({
                                    value: String(Number(whole) + Number(this.state.decimal) * 0.1),
                                });
                            } }, range(this.props.min, this.props.max + 1).map((n) => {
                            // console.log("FIRST", String(n));
                            return React.createElement(Picker.Item, { key: String(n), label: String(n), value: String(n) });
                        }))),
                    React.createElement(Box, { width: "50%" },
                        React.createElement(Picker, { style: {
                                height: PICKER_HEIGHT,
                                backgroundColor: "#FFFFFF",
                            }, itemStyle: {
                                height: PICKER_HEIGHT,
                            }, selectedValue: this.state.decimal, onValueChange: (decimal) => {
                                // console.log(
                                //   "DECIMAL",
                                //   decimal,
                                //   this.state.whole,
                                //   Number(decimal.toString()) * 0.1,
                                //   String(this.state.whole + Number(decimal) * 0.1)
                                // );
                                this.setState({ decimal: String(decimal) });
                                this.props.onChange({
                                    value: String(Number(this.state.whole) + Number(decimal) * 0.1),
                                });
                            } }, range(0, 10).map((n) => {
                            // console.log("N", n);
                            return React.createElement(Picker.Item, { key: String(n), label: "." + String(n), value: String(n) });
                        })))))));
    }
}
//# sourceMappingURL=DecimalRangeActionSheet.js.map