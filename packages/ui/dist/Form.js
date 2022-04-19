import React from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { SelectList } from "./SelectList";
import { Switch } from "./Switch";
import { Text } from "./Text";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";
function objToJoinedString(obj) {
    return Object.keys(obj || {})
        .map((k) => (obj[k] ? k : undefined))
        .filter((v) => v)
        .join(", ");
}
export class FormLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editing: false, value: "" };
    }
    renderMultiBoolean() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(Box, { direction: "column", display: "flex" }, Object.keys(this.props.value).map((k) => (React.createElement(React.Fragment, null,
                React.createElement(Text, { weight: "bold" }, k),
                React.createElement(Switch, { id: k, switched: this.state.value[k], onChange: () => {
                        this.setState({ value: Object.assign(Object.assign({}, this.state.value), { [k]: !this.state.value[k] }) });
                    } })))))));
    }
    renderBooleanField() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(Switch, { id: this.props.name, switched: this.state.value, onChange: () => this.setState({ value: !this.state.value }) })));
    }
    renderTextField() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(TextField, { id: this.props.name, value: this.state.value, onChange: (result) => this.setState({ value: result.value }) })));
    }
    renderTextArea() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(TextArea, { id: this.props.name, value: this.state.value, onChange: (result) => this.setState({ value: result.value }) }),
            React.createElement(Button, { size: "sm", text: "Save", onClick: () => this.props.onSave(this.state.value) })));
    }
    renderSelect() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(SelectList, { id: this.props.name, options: (this.props.options || []).map((o) => ({ label: o !== null && o !== void 0 ? o : "---", value: o })), value: this.state.value, onChange: (result) => {
                    this.setState({ value: result });
                } })));
    }
    render() {
        if (!this.state.editing) {
            let text = this.props.value;
            if (text === undefined) {
                text = " - ";
            }
            if (typeof text === "object") {
                text = objToJoinedString(text);
            }
            return (React.createElement(Box, { direction: "row", display: "flex" },
                React.createElement(IconButton, { accessibilityLabel: "edit", icon: "edit", iconColor: "darkGray", prefix: "far", size: "xs", onClick: () => this.setState({ editing: true, value: this.props.value }) }),
                React.createElement(Box, { marginRight: 2 },
                    React.createElement(Text, { weight: "bold" },
                        this.props.name,
                        ": ")),
                React.createElement(Text, null, text)));
        }
        return (React.createElement(Box, { direction: "row", display: "flex" },
            React.createElement(IconButton, { accessibilityLabel: "edit", icon: "cancel", iconColor: "darkGray", prefix: "far", size: "xs", onClick: () => this.setState({ editing: false }) }),
            this.props.kind === "boolean" && this.renderBooleanField(),
            this.props.kind === "multiboolean" && this.renderMultiBoolean(),
            this.props.kind === "string" && this.renderTextField(),
            this.props.kind === "textarea" && this.renderTextArea(),
            this.props.kind === "select" && this.renderSelect(),
            React.createElement(Box, { width: 60 },
                React.createElement(Button, { color: "blue", size: "sm", text: "Save", onClick: () => {
                        this.props.onSave(this.state.value);
                        this.setState({ editing: false });
                    } }))));
    }
}
//# sourceMappingURL=Form.js.map