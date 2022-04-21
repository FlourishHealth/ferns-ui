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
            return (React.createElement(Box, { direction: "row", display: "flex", onClick: () => this.setState({ showEdit: true }) },
                React.createElement(Box, { marginRight: 2 },
                    React.createElement(Icon, { color: "primaryDark", name: "edit", prefix: "far", size: "lg" })),
                React.createElement(Text, null, this.props.children)));
        }
        else {
            return (React.createElement(Box, null,
                React.createElement(TextField, Object.assign({}, this.props)),
                React.createElement(Box, { paddingY: 1, width: 100 },
                    React.createElement(Button, { color: "primary", inline: true, text: "Save", onClick: () => {
                            this.setState({ showEdit: false });
                            if (this.props.onSubmitEditing) {
                                this.props.onSubmitEditing();
                            }
                        } }))));
        }
    }
}
//# sourceMappingURL=TapToEdit.js.map