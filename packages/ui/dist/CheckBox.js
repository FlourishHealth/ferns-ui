// import {library} from "@fortawesome/fontawesome-svg-core";
// import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";
// library.add(faCheck);
export class CheckBox extends React.Component {
    renderCheckBox() {
        return (React.createElement(Box, { border: this.props.color || "darkGray", color: this.props.checked ? this.props.color || "darkGray" : "white", height: this.props.size === "sm" ? 16 : 24, rounding: this.props.radio ? "circle" : 3, width: this.props.size === "sm" ? 16 : 24, onClick: () => {
                this.props.onChange({ value: !this.props.checked });
                this.props.onClick && this.props.onClick();
            } },
            React.createElement(Box, { alignItems: "center", direction: "column", display: "flex", height: "100%", justifyContent: "center", width: "100%" }, this.props.checked && (React.createElement(Icon, { color: "white", name: "check", prefix: "fas", size: this.props.size === "sm" ? "sm" : "md" })))));
    }
    render() {
        return (React.createElement(Box, { alignItems: "center", direction: "row", display: "flex", maxHeight: 60, paddingY: 1, width: "100%" },
            React.createElement(Box, { display: "flex", justifyContent: "center", maxWidth: this.props.size === "sm" ? 14 : 20, width: this.props.size === "sm" ? 14 : 20 }, this.renderCheckBox()),
            React.createElement(Box, { direction: "column", display: "flex", height: "100%", justifyContent: "center", marginLeft: 4, onClick: () => {
                    this.props.onChange({ value: !this.props.checked });
                    this.props.onClick && this.props.onClick();
                } },
                React.createElement(Text, { color: this.props.labelColor || "darkGray", numberOfLines: this.props.subLabel ? 1 : 2, size: this.props.size, weight: "bold" }, this.props.label),
                Boolean(this.props.subLabel) && (React.createElement(Text, { color: this.props.labelColor || "darkGray", size: "sm", weight: "bold" }, this.props.subLabel)))));
    }
}
//# sourceMappingURL=CheckBox.js.map