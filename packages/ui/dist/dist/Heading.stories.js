import React from "react";
import { Box } from "./Box";
import { Heading } from "./Heading";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
function renderText(text, props) {
    return (React.createElement(Box, { width: "100%", paddingY: 1 }, React.createElement(Heading, Object.assign({}, props), text)));
}
storiesOf("Headings", module).add("Headings", () => (React.createElement(StorybookContainer, null, renderText("Default Heading - h1", {}), renderText("medium - h2", { size: "md" }), renderText("small - h3", { size: "sm" }), renderText("gray", { color: "gray" }), renderText("lightGray", { color: "lightGray" }), renderText("primary", { color: "primary" }), renderText("secondary", { color: "secondary" }), renderText("tertiary", { color: "tertiary" }), renderText("accent", { color: "accent" }), renderText("red", { color: "red" }), renderText("center", { align: "center" }))));
//# sourceMappingURL=Heading.stories.js.map
//# sourceMappingURL=Heading.stories.js.map