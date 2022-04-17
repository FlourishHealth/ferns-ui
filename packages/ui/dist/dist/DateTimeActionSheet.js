import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React from "react";
import { ActionSheet } from "./ActionSheet";
import { Box } from "./Box";
import { Button } from "./Button";
export class DateTimeActionSheet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(ActionSheet, { ref: this.props.actionSheetRef, gestureEnabled: true, bounceOnOpen: true }, React.createElement(Box, { width: "100%", paddingX: 4, marginBottom: 8 }, React.createElement(Box, { width: "100%", display: "flex", alignItems: "end" }, React.createElement(Box, { width: "33%" }, React.createElement(Button, { type: "ghost", text: "Save", color: "blue", size: "lg", onClick: () => {
                var _a, _b;
                (_b = (_a = this.props.actionSheetRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setModalVisible(false);
            } }))), React.createElement(DateTimePicker, { testID: "dateTimePicker", value: moment(this.props.value).toDate(), mode: this.props.mode, is24Hour: true, display: "spinner", onChange: (event, date) => {
                if (!date) {
                    return;
                }
                this.props.onChange({ event, value: date.toString() });
            } }))));
    }
}
//# sourceMappingURL=DateTimeActionSheet.js.map
//# sourceMappingURL=DateTimeActionSheet.js.map