import React from "react";
import { CheckBox } from "./CheckBox";
import { WithLabel } from "./WithLabel";
import { storiesOf } from "@storybook/react-native";
import { StorybookContainer } from "./StorybookContainer";
class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boolean: false,
            withLabel: false,
            primary: false,
            small: false,
        };
    }
    render() {
        return (React.createElement(StorybookContainer, null, React.createElement(CheckBox, { id: "check", checked: this.state.boolean, onChange: (result) => this.setState({ boolean: result.value }) }), React.createElement(WithLabel, { label: "With A Label" }, React.createElement(CheckBox, { id: "withLabel", checked: this.state.withLabel, onChange: (result) => this.setState({ withLabel: result.value }) })), React.createElement(WithLabel, { label: "Primary Color" }, React.createElement(CheckBox, { id: "primary", checked: this.state.primary, label: "Primary Color", color: "primary", labelColor: "primary", onChange: (result) => this.setState({ primary: result.value }) })), React.createElement(WithLabel, { label: "Small" }, React.createElement(CheckBox, { id: "small", checked: this.state.small, label: "Small", size: "sm", onChange: (result) => this.setState({ small: result.value }) }))));
    }
}
storiesOf("Check Box", module).add("Plain", () => React.createElement(Forms, null));
//# sourceMappingURL=CheckBox.stories.js.map
//# sourceMappingURL=CheckBox.stories.js.map