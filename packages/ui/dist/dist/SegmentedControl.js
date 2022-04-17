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
        return (React.createElement(Box, { rounding: 3, width: "100%", height: 40, display: "flex", direction: "row", color: "lightGray", padding: 1 }, this.props.items.map((item, index) => (React.createElement(Box, { key: index, rounding: 3, height: "100%", width: `${100 / this.props.items.length}%`, color: this.props.selectedItemIndex === index ? "white" : "lightGray" }, React.createElement(Box, { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", onClick: () => this.props.onChange({ activeIndex: index }) }, this.renderItem(item)))))));
    }
}
//# sourceMappingURL=SegmentedControl.js.map
//# sourceMappingURL=SegmentedControl.js.map