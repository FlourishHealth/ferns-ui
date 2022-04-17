import { action } from "@storybook/addon-actions";
import React from "react";
import { Button } from "./Button";
import { storiesOf } from "@storybook/react-native";
import { Box } from "./Box";
import { StorybookContainer } from "./StorybookContainer";
function allColorButtons(props) {
    return (React.createElement(StorybookContainer, null, React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Default" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Primary", color: "primary" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Secondary", color: "secondary" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Tertiary", color: "tertiary" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Accent", color: "accent" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Red", color: "red" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Dark Gray", color: "darkGray" }, props))), React.createElement(Box, { paddingY: 1 }, React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Gray", color: "gray" }, props)))));
}
storiesOf("Button", module)
    .add("Colors", () => allColorButtons({}))
    .add("Loading", () => allColorButtons({ loading: true }))
    .add("Ghost", () => allColorButtons({ type: "ghost" }))
    .add("Outline", () => allColorButtons({ type: "outline" }));
const Template = (args) => React.createElement(Button, Object.assign({ onClick: action("clicked"), text: "Button" }, args));
export const Primary = Template.bind({});
Primary.args = {
    size: "md",
    color: "primary",
    text: "PRIMARY",
    type: "solid",
    inline: false,
    disabled: false,
};
//# sourceMappingURL=Button.stories.js.map
//# sourceMappingURL=Button.stories.js.map