import React from "react";
import { Box } from "./Box";
export class Card extends React.Component {
    render() {
        return (React.createElement(Box, Object.assign({ direction: "column", display: "flex", color: this.props.color || "white", rounding: 3, shadow: true, padding: this.props.padding || 4, width: this.props.width }, this.props), this.props.children));
    }
}
//# sourceMappingURL=Card.js.map
//# sourceMappingURL=Card.js.map