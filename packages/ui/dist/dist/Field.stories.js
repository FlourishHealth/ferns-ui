import React from "react";
import { Field } from "./Field";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
export default {
    title: "Field",
    component: Field,
};
storiesOf("Field", module)
    .add("TextField", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Text Field", type: "text", name: "text", helperText: "Here's some help text", initialValue: "Pre-filled text", handleChange: () => { } }), React.createElement(Field, { label: "Disabled Field", type: "text", name: "text", disabled: true, helperText: "Here's some help text", initialValue: "Pre-filled text", handleChange: () => { } }))))
    .add("Boolean Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Boolean Field", type: "boolean", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Email Text Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Email Field", type: "email", name: "text", helperText: "Here's some help text", handleChange: () => { } }), React.createElement(Field, { label: "Email Field With Extra Validation", type: "email", name: "text", helperText: "Requires @example.com", handleChange: () => { }, validate: (value) => value.search("@example.com") > -1, validateErrorMessage: "Must be an example.com email" }))))
    .add("Text Area Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "TextArea Field", type: "textarea", name: "text", helperText: "Here's some help text", handleChange: () => { } }), React.createElement(Field, { label: "Large TextArea ", type: "textarea", name: "text", rows: 10, helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Number Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Number Field", type: "number", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Currency Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Currency Field", type: "currency", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Percent Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Percent Field", type: "percent", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Select Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Select Field", type: "select", name: "text", helperText: "Here's some help text", handleChange: () => { }, options: [
        { label: "Option 1", value: "Option 1" },
        { label: "Option 2", value: "Option 2" },
    ] }))))
    .add("Password Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Password Field", type: "password", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("URL Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Url Field", type: "url", name: "text", helperText: "Here's some help text", handleChange: () => { } }))))
    .add("Date Field", () => (React.createElement(StorybookContainer, null, React.createElement(Field, { label: "Date Field", type: "date", name: "text", helperText: "Here's some help text", handleChange: () => { } }))));
//# sourceMappingURL=Field.stories.js.map
//# sourceMappingURL=Field.stories.js.map