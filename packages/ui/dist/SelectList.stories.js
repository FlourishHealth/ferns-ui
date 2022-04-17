import React from "react";
import { SelectList } from "./SelectList";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
const options = [
    { label: "First", value: "first" },
    { label: "Second", value: "second" },
    { label: "Third, A Really Long Option", value: "third" },
];
storiesOf("Select List", module)
    .add("Select Lists", () => {
    const [item, setItem] = React.useState(options[0].value);
    return (React.createElement(StorybookContainer, null,
        React.createElement(SelectList, { id: "none", options: options, value: item, onChange: (item) => setItem(item), placeholder: "Here's some placeholder text." })));
})
    .add("With Label", () => {
    const [item, setItem] = React.useState(options[0].value);
    return (React.createElement(StorybookContainer, null,
        React.createElement(SelectList, { id: "none", label: "Enter a bunch of text", helperText: "And some subtext", options: options, value: item, onChange: (item) => setItem(item) })));
})
    .add("Disabled", () => {
    const [item, setItem] = React.useState(options[0].value);
    return (React.createElement(StorybookContainer, null,
        React.createElement(SelectList, { id: "none", options: options, value: item, onChange: (item) => setItem(item), disabled: true, placeholder: "This is disabled" })));
});
//# sourceMappingURL=SelectList.stories.js.map