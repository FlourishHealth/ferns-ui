import React from "react";
import { TextField } from "./TextField";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
export default {
    title: "TextField",
    component: TextField,
};
storiesOf("Text Field", module)
    .add("Text Fields", () => (React.createElement(StorybookContainer, null, React.createElement(TextField, { id: "none", onChange: () => { }, placeholder: "Here's some placeholder text." }))))
    .add("With Label", () => (React.createElement(StorybookContainer, null, React.createElement(TextField, { label: "Enter some text", helperText: "And some subtext", id: "none", onChange: () => { } }))))
    .add("Disabled", () => (React.createElement(StorybookContainer, null, React.createElement(TextField, { id: "none", onChange: () => { }, disabled: true, placeholder: "This is disabled" }))))
    .add("Errored", () => (React.createElement(StorybookContainer, null, React.createElement(TextField, { label: "Enter some text", helperText: "And some subtext", errorMessage: "There's been an error", id: "none", onChange: () => { } }))));
//# sourceMappingURL=TextField.stories.js.map
//# sourceMappingURL=TextField.stories.js.map