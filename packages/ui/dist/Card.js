import React from "react";
import { Box } from "./Box";
export class Card extends React.Component {
    render() {
        return (React.createElement(Box, Object.assign({ color: this.props.color || "white", direction: "column", display: "flex", padding: this.props.padding || 4, rounding: 3, shadow: true, width: this.props.width }, this.props), this.props.children));
    }
}
//# sourceMappingURL=Card.js.map