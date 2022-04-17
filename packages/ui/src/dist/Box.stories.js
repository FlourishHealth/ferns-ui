import React from "react";
import { Box } from "./Box";
import { storiesOf } from "@storybook/react-native";
import { Text } from "./Text";
import { StorybookContainer } from "./StorybookContainer";
const colors = [
    "primary",
    "secondary",
    "tertiary",
    "accent",
    "blue",
    "darkGray",
    "eggplant",
    "gray",
    "green",
    "lightGray",
    "maroon",
    "midnight",
    "navy",
    "olive",
    "orange",
    "orchid",
    "pine",
    "purple",
    "red",
    "watermelon",
    "white",
    "neutral900",
    "neutral200",
    "neutral70",
    "neutral10",
];
storiesOf("Box", module)
    .add("FlexBox", () => (React.createElement(StorybookContainer, null,
    React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", width: 50, height: 50, rounding: "circle", color: "blue", marginRight: 2 },
        React.createElement(Text, { size: "lg" }, "JG")),
    React.createElement(Box, { paddingX: 2, direction: "column" },
        React.createElement(Text, { weight: "bold" }, "Josh Gachnang"),
        React.createElement(Text, null, "joined 2 years ago")))))
    .add("Box Colors", () => (React.createElement(StorybookContainer, null, colors.map((c) => (React.createElement(Box, { key: c, display: "flex", direction: "column" },
    React.createElement(Box, { marginBottom: 2 },
        React.createElement(Text, { align: "center" }, c)),
    React.createElement(Box, { key: c, color: c, rounding: "circle", height: 50, width: 50 },
        React.createElement(Text, null, " "))))))));
//# sourceMappingURL=Box.stories.js.map