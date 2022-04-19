import React from "react";
import { Box } from "./Box";
import { Text } from "./Text";
export class SegmentedControl extends React.Component {
    renderItem(item) {
        return React.createElement(Text, { weight: "bold" }, item);
        // if (typeof item === "string") {
        //   return <Text weight="bold">{item}</Text>;
        // } else {
        //   return item;
        // }
    }
    render() {
        return (React.createElement(Box, { color: "lightGray", direction: "row", display: "flex", height: 40, padding: 1, rounding: 3, width: "100%" }, this.props.items.map((item, index) => (React.createElement(Box, { key: index, color: this.props.selectedItemIndex === index ? "white" : "lightGray", height: "100%", rounding: 3, width: `${100 / this.props.items.length}%` },
            React.createElement(Box, { alignItems: "center", display: "flex", height: "100%", justifyContent: "center", width: "100%", onClick: () => this.props.onChange({ activeIndex: index }) }, this.renderItem(item)))))));
    }
}
//# sourceMappingURL=SegmentedControl.js.map