import React from "react";
import { Box } from "./Box";
import { Mask } from "./Mask";
import { Text } from "./Text";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
storiesOf("Mask", module)
    .add("Rounded", () => (React.createElement(StorybookContainer, null,
    React.createElement(Box, { width: "100%", padding: 6, color: "primary" },
        React.createElement(Mask, { rounding: 3 },
            React.createElement(Box, { width: 50, height: 50, color: "white", display: "flex", justifyContent: "center", alignItems: "center" },
                React.createElement(Text, { color: "darkGray" }, "MA")))))))
    .add("Circle", () => (React.createElement(StorybookContainer, null,
    React.createElement(Box, { width: "100%", padding: 6, color: "primary" },
        React.createElement(Mask, { shape: "circle" },
            React.createElement(Box, { width: 50, height: 50, color: "white", display: "flex", justifyContent: "center", alignItems: "center" },
                React.createElement(Text, { color: "darkGray" }, "MA")))))))
    .add("Rounding", () => (React.createElement(StorybookContainer, null,
    React.createElement(Box, { width: "100%", padding: 6, color: "primary" },
        React.createElement(Mask, { rounding: 1 },
            React.createElement(Box, { width: 50, height: 50, color: "white", display: "flex", justifyContent: "center", alignItems: "center" },
                React.createElement(Text, { color: "darkGray" }, "MA")))))))
    .add("Washed", () => (React.createElement(StorybookContainer, null,
    React.createElement(Box, { width: "100%", padding: 6, color: "primary" },
        React.createElement(Mask, { rounding: 1, wash: true },
            React.createElement(Box, { width: 50, height: 50, color: "white", display: "flex", justifyContent: "center", alignItems: "center" },
                React.createElement(Text, { color: "darkGray" }, "MA")))))));
//# sourceMappingURL=Mask.stories.js.map