import React from "react";
import { Box } from "./Box";
import { IconButton } from "./IconButton";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
storiesOf("IconButton", module).add("Icon Buttons", () => (React.createElement(StorybookContainer, null,
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { } }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "secondary", onClick: () => { } }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { } }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { }, size: "xl" }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { }, bgColor: "lightGray" }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { }, bgColor: "gray" }),
    React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { }, bgColor: "transparentDarkGray" }),
    React.createElement(Box, { padding: 4, color: "darkGray" },
        React.createElement(IconButton, { icon: "plus", prefix: "fas", accessibilityLabel: "label", iconColor: "primary", onClick: () => { }, bgColor: "white" })))));
//# sourceMappingURL=IconButton.stories.js.map