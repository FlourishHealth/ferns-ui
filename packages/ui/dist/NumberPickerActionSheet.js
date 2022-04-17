import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
import { Picker } from "@react-native-picker/picker";
import range from "lodash/range";
const PICKER_HEIGHT = 104;
export class NumberPickerActionSheet extends React.Component {
    constructor(props) {
        super(props);
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
                React.createElement(Picker, { style: {
                        height: PICKER_HEIGHT,
                        backgroundColor: "#FFFFFF",
                    }, itemStyle: {
                        height: PICKER_HEIGHT,
                    }, selectedValue: String(this.props.value), onValueChange: (itemValue) => this.props.onChange({ value: String(itemValue) }) }, range(this.props.min, this.props.max).map((n) => (React.createElement(Picker.Item, { key: String(n), label: String(n), value: String(n) })))))));
    }
}
//# sourceMappingURL=NumberPickerActionSheet.js.map