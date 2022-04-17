import React from "react";
import { Box } from "./Box";
import { Pill } from "./Pill";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
const renderPill = (color) => (React.createElement(Box, { display: "flex", direction: "row", alignItems: "center", paddingY: 1 },
    React.createElement(Box, { marginRight: 2 },
        React.createElement(Pill, { text: color, color: color, onClick: () => { } })),
    React.createElement(Pill, { text: color, color: color, onClick: () => { }, enabled: true })));
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
storiesOf("Pills", module).add("Pills", () => (React.createElement(StorybookContainer, null, colors.map((c) => renderPill(c)))));
//# sourceMappingURL=Pill.stories.js.map