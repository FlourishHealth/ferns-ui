import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { TextField } from "./TextField";
export class TapToEdit extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { showEdit: false };
    }
    render() {
        if (!this.state.showEdit) {
            return (React.createElement(Box, { display: "flex", direction: "row", onClick: () => this.setState({ showEdit: true }) }, React.createElement(Box, { marginRight: 2 }, React.createElement(Icon, { name: "edit", size: 20, color: "primaryDark", prefix: "far" })), React.createElement(Text, null, this.props.children)));
        }
        else {
            return (React.createElement(Box, null, React.createElement(TextField, Object.assign({}, this.props)), React.createElement(Box, { width: 100, paddingY: 1 }, React.createElement(Button, { inline: true, color: "primary", text: "Save", onClick: () => {
                    this.setState({ showEdit: false });
                    if (this.props.onSubmitEditing) {
                        this.props.onSubmitEditing();
                    }
                } }))));
        }
    }
}
//# sourceMappingURL=TapToEdit.js.map
//# sourceMappingURL=TapToEdit.js.map