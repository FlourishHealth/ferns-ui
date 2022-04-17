import React from "react";
import { Box } from "./Box";
import { Text } from "./Text";
export class WithLabel extends React.Component {
    render() {
        const { label, labelInline, labelColor, children } = this.props;
        // If show is undefined or true, show, only hide for actual false for simplicity.
        if (this.props.show === false) {
            return children;
        }
        if (!children) {
            return null;
        }
        if (label) {
            return (React.createElement(Box, { direction: labelInline ? "row" : "column", justifyContent: this.props.labelJustifyContent, width: "100%" },
                this.props.labelPlacement !== "after" && (React.createElement(Box, { paddingY: 1 },
                    React.createElement(Text, { size: this.props.labelSize, color: labelColor || "darkGray", weight: "bold" }, label))),
                children,
                this.props.labelPlacement === "after" && (React.createElement(Box, { paddingY: 1 },
                    React.createElement(Text, { size: this.props.labelSize, color: labelColor || "darkGray" }, label)))));
        }
        else {
            return children;
        }
    }
}
//# sourceMappingURL=WithLabel.js.map