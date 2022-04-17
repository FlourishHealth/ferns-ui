import { Box } from "./Box";
import { Banner } from "./Banner";
import React from "react";
import { storiesOf } from "@storybook/react-native";
storiesOf("Banner", module)
    .add("Plain banner", () => (React.createElement(Box, { width: "100%", height: "100%", display: "flex", direction: "column" },
    React.createElement(Banner, { id: "banner", text: "When you click this banner, it dismisses", subtext: "And in a real app, it would stay dismissed", color: "primary", textColor: "white" }))))
    .add("Shape banner", () => (React.createElement(Box, { width: "100%", height: "100%", display: "flex", direction: "column" },
    React.createElement(Box, { paddingY: 2, width: "100%" },
        React.createElement(Banner, { id: "banner", text: "Banners can have multiple shapes like Boxes", subtext: "Here's a pill.", color: "primary", textColor: "white", shape: "pill" })),
    React.createElement(Box, { paddingY: 2, width: "100%" },
        React.createElement(Banner, { id: "banner", text: "And a rounded banner", color: "secondary", textColor: "white", shape: 3 })))));
//# sourceMappingURL=Banner.stories.js.map