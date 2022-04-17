import React from "react";
import { Box } from "./Box";
import { FormLine } from "./Form";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
export default {
    title: "FormLine",
    component: FormLine,
};
class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            boolean: true,
            textarea: "",
            multiboolean: { one: true, two: true, three: true },
            select: undefined,
        };
    }
    render() {
        return (React.createElement(StorybookContainer, null, React.createElement(Box, { paddingY: 2 }, React.createElement(FormLine, { name: "name", value: this.state.name, onSave: (name) => this.setState({ name }), kind: "string" })), React.createElement(Box, { paddingY: 2 }, React.createElement(FormLine, { name: "boolean", value: this.state.boolean, onSave: (boolean) => this.setState({ boolean }), kind: "boolean" })), React.createElement(Box, { paddingY: 2 }, React.createElement(FormLine, { name: "textarea", value: this.state.textarea, onSave: (textarea) => this.setState({ textarea }), kind: "textarea" })), React.createElement(Box, { paddingY: 2 }, React.createElement(FormLine, { name: "multiboolean", value: this.state.multiboolean, onSave: (multiboolean) => this.setState({ multiboolean }), kind: "multiboolean" })), React.createElement(Box, { paddingY: 2 }, React.createElement(FormLine, { name: "select", value: this.state.select, onSave: (select) => this.setState({ select }), kind: "select", options: [undefined, "ay", "bee", "see"] }))));
    }
}
storiesOf("Form", module).add("Forms", () => React.createElement(Forms, null));
//# sourceMappingURL=Form.stories.js.map
//# sourceMappingURL=Form.stories.js.map