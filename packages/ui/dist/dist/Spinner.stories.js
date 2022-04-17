import React from "react";
import { Spinner } from "./Spinner";
import { Box } from "./Box";
import { storiesOf } from "@storybook/react-native";
storiesOf("Spinner", module)
    .add("Small", () => (React.createElement(Box, { width: "100%" }, React.createElement(Spinner, { size: "sm" }))))
    .add("Big", () => (React.createElement(Box, { display: "flex" }, React.createElement(Spinner, { size: "md" }))))
    .add("Dark", () => (React.createElement(Box, { color: "darkGray", paddingY: 6 }, React.createElement(Spinner, { color: "white" }))));
//# sourceMappingURL=Spinner.stories.js.map
//# sourceMappingURL=Spinner.stories.js.map