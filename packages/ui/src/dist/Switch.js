import React from "react";
import { Switch as NativeSwitch } from "react-native";
import { WithLabel } from "./WithLabel";
export class Switch extends React.Component {
    render() {
        return (React.createElement(WithLabel, Object.assign({ labelJustifyContent: "between", labelInline: true }, this.props),
            React.createElement(NativeSwitch, { disabled: this.props.disabled, onValueChange: this.props.onChange, value: this.props.switched })));
    }
}
//# sourceMappingURL=Switch.js.map