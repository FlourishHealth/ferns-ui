import { Picker } from "@react-native-picker/picker";
import range from "lodash/range";
import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
const PICKER_HEIGHT = 104;
export class NumberPickerActionSheet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(ActionSheet, { ref: this.props.actionSheetRef, bounceOnOpen: true, gestureEnabled: true },
            React.createElement(Box, { marginBottom: 8, paddingX: 4, width: "100%" },
                React.createElement(Box, { alignItems: "end", display: "flex", width: "100%" },
                    React.createElement(Box, { width: "33%" },
                        React.createElement(Button, { color: "blue", size: "lg", text: "Close", type: "ghost", onClick: () => {
                                var _a, _b;
                                (_b = (_a = this.props.actionSheetRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setModalVisible(false);
                            } }))),
                React.createElement(Picker, { itemStyle: {
                        height: PICKER_HEIGHT,
                    }, selectedValue: String(this.props.value), style: {
                        height: PICKER_HEIGHT,
                        backgroundColor: "#FFFFFF",
                    }, onValueChange: (itemValue) => this.props.onChange({ value: String(itemValue) }) }, range(this.props.min, this.props.max).map((n) => (React.createElement(Picker.Item, { key: String(n), label: String(n), value: String(n) })))))));
    }
}
//# sourceMappingURL=NumberPickerActionSheet.js.map