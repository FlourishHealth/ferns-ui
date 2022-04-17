import React from "react";
import { TextArea } from "./TextArea";
import { StorybookContainer } from "./StorybookContainer";
export default {
    title: "TextArea",
    component: TextArea,
};
export const TextAreas = () => {
    return (React.createElement(StorybookContainer, null, React.createElement(TextArea, { id: "none", onChange: () => { }, placeholder: "Here's some placeholder text." })));
};
export const WithLabelTextArea = () => {
    return (React.createElement(StorybookContainer, null, React.createElement(TextArea, { label: "Enter a bunch of text", helperText: "And some subtext", id: "none", onChange: () => { } })));
};
export const TextAreaDisabled = () => {
    return (React.createElement(StorybookContainer, null, React.createElement(TextArea, { id: "none", onChange: () => { }, disabled: true, placeholder: "This is disabled" })));
};
export const TextAreaErrored = () => {
    return (React.createElement(StorybookContainer, null, React.createElement(TextArea, { label: "Enter a bunch of text", helperText: "And some subtext", errorMessage: "There's been an error", id: "none", onChange: () => { } })));
};
//# sourceMappingURL=TextArea.stories.js.map
//# sourceMappingURL=TextArea.stories.js.map