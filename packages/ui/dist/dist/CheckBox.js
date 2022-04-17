// import {library} from "@fortawesome/fontawesome-svg-core";
// import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";
// library.add(faCheck);
export class CheckBox extends React.Component {
    renderCheckBox() {
        return (React.createElement(Box, { rounding: this.props.radio ? "circle" : 3, border: this.props.color || "darkGray", height: this.props.size === "sm" ? 16 : 24, width: this.props.size === "sm" ? 16 : 24, color: this.props.checked ? this.props.color || "darkGray" : "white", onClick: () => {
                this.props.onChange({ value: !this.props.checked });
                this.props.onClick && this.props.onClick();
            } }, React.createElement(Box, { display: "flex", direction: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }, this.props.checked && (React.createElement(Icon, { prefix: "fas", size: this.props.size === "sm" ? 7 : 10, name: "check", color: "white" })))));
    }
    render() {
        return (React.createElement(Box, { paddingY: 1, display: "flex", direction: "row", maxHeight: 60, width: "100%", alignItems: "center" }, React.createElement(Box, { display: "flex", justifyContent: "center", width: this.props.size === "sm" ? 14 : 20, maxWidth: this.props.size === "sm" ? 14 : 20 }, this.renderCheckBox()), React.createElement(Box, { onClick: () => {
                this.props.onChange({ value: !this.props.checked });
                this.props.onClick && this.props.onClick();
            }, marginLeft: 4, height: "100%", display: "flex", direction: "column", justifyContent: "center" }, React.createElement(Text, { numberOfLines: this.props.subLabel ? 1 : 2, color: this.props.labelColor || "darkGray", weight: "bold", size: this.props.size }, this.props.label), Boolean(this.props.subLabel) && (React.createElement(Text, { size: "sm", color: this.props.labelColor || "darkGray", weight: "bold" }, this.props.subLabel)))));
    }
}
//# sourceMappingURL=CheckBox.js.map
//# sourceMappingURL=CheckBox.js.map