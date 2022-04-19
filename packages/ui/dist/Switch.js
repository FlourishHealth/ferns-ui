import React from "react";
import { Switch as NativeSwitch } from "react-native";
import { WithLabel } from "./WithLabel";
export class Switch extends React.Component {
    render() {
        return (React.createElement(WithLabel, Object.assign({ labelInline: true, labelJustifyContent: "between" }, this.props),
            React.createElement(NativeSwitch, { disabled: this.props.disabled, value: this.props.switched, onValueChange: this.props.onChange })));
    }
}
//# sourceMappingURL=Switch.js.map