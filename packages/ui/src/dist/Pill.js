import React from "react";
import { Box } from "./Box";
import { Text } from "./Text";
export class Pill extends React.Component {
    render() {
        return (React.createElement(Box, { rounding: "pill", color: this.props.enabled ? this.props.color : "white", onClick: () => this.props.onClick(!this.props.enabled), border: this.props.color, paddingY: 2, paddingX: 4 },
            React.createElement(Text, { align: "center", color: this.props.enabled ? "white" : this.props.color }, this.props.text)));
    }
}
//# sourceMappingURL=Pill.js.map