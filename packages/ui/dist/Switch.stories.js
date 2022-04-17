import { Switch } from "./Switch";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Box } from "./Box";
import { WithLabel } from "./WithLabel";
import { StorybookContainer } from "./StorybookContainer";
class SwitchForms extends React.Component {
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
        return (React.createElement(StorybookContainer, null,
            React.createElement(Box, { width: "100%", height: "100%", display: "flex", direction: "column" },
                React.createElement(Switch, { id: "check", switched: this.state.boolean, onChange: (result) => this.setState({ boolean: result }) }),
                React.createElement(WithLabel, { label: "With A Label" },
                    React.createElement(Switch, { id: "withLabel", switched: this.state.withLabel, onChange: (result) => this.setState({ withLabel: result }) })),
                React.createElement(WithLabel, { label: "Primary Color" },
                    React.createElement(Switch, { id: "primary", switched: this.state.primary, label: "Primary Color", 
                        // color="primary"
                        labelColor: "primary", onChange: (result) => this.setState({ primary: result }) })),
                React.createElement(WithLabel, { label: "Small" },
                    React.createElement(Switch, { id: "small", switched: this.state.small, label: "Small", 
                        // size="sm"
                        onChange: (result) => this.setState({ small: result }) })))));
    }
}
storiesOf("Switch", module).add("Switch", () => React.createElement(SwitchForms, null));
//# sourceMappingURL=Switch.stories.js.map