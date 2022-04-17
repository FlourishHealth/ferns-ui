import React from "react";
import { Box } from "./Box";
import { Card } from "./Card";
import { storiesOf } from "@storybook/react-native";
export default {
    title: "Card",
    component: Card,
};
storiesOf("Card", module).add("Plain", () => (React.createElement(Box, { width: "100%", height: "100%", display: "flex", direction: "column", color: "lightGray", padding: 12 },
    React.createElement(Card, null,
        React.createElement(Box, { display: "flex", direction: "row", alignItems: "center" },
            React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", width: 50, height: 50, rounding: "circle", color: "blue", marginRight: 2 },
                React.createElement("h2", null, "JG")),
            React.createElement(Box, { paddingX: 2, direction: "column" },
                React.createElement("div", null,
                    React.createElement("b", null, "Josh Gachnang")),
                React.createElement("div", null, "joined 2 years ago")))))));
//# sourceMappingURL=Card.stories.js.map