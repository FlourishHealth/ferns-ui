import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
export class NumberPickerActionSheet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(ActionSheet, { ref: this.props.actionSheetRef, bounceOnOpen: true, gestureEnabled: true },
            React.createElement(Box, { marginBottom: 8, paddingX: 4, width: "100%" },
                React.createElement(Box, { alignItems: "end", display: "flex", width: "100%" },
                    React.createElement(Box, { width: "33%" },
                        React.createElement(Button, { color: "blue", size: "lg", text: "Save", type: "ghost", onClick: () => {
                                var _a, _b;
                                (_b = (_a = this.props.actionSheetRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setModalVisible(false);
                            } }))),
                React.createElement(DateTimePicker, { display: "spinner", is24Hour: true, mode: this.props.mode, testID: "dateTimePicker", value: moment(this.props.value).toDate(), onChange: (event, date) => {
                        if (!date) {
                            return;
                        }
                        this.props.onChange({ event, value: date.toString() });
                    } }))));
    }
}
//# sourceMappingURL=TextFieldNumberActionSheet.js.map