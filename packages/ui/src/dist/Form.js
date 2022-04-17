import React from "react";
import { Box } from "./Box";
import { Text } from "./Text";
import { Switch } from "./Switch";
import { TextField } from "./TextField";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { SelectList } from "./SelectList";
import { IconButton } from "./IconButton";
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
            React.createElement(Box, { display: "flex", direction: "column" }, Object.keys(this.props.value).map((k) => (React.createElement(React.Fragment, null,
                React.createElement(Text, { weight: "bold" }, k),
                React.createElement(Switch, { switched: this.state.value[k], onChange: () => this.setState({ value: Object.assign(Object.assign({}, this.state.value), { [k]: !this.state.value[k] }) }), id: k })))))));
    }
    renderBooleanField() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(Switch, { switched: this.state.value, onChange: () => this.setState({ value: !this.state.value }), id: this.props.name })));
    }
    renderTextField() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(TextField, { value: this.state.value, onChange: (result) => this.setState({ value: result.value }), id: this.props.name })));
    }
    renderTextArea() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { marginRight: 2 },
                React.createElement(Text, { weight: "bold" }, this.props.name)),
            React.createElement(TextArea, { value: this.state.value, onChange: (result) => this.setState({ value: result.value }), id: this.props.name }),
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
            return (React.createElement(Box, { display: "flex", direction: "row" },
                React.createElement(IconButton, { iconColor: "darkGray", prefix: "far", size: "xs", accessibilityLabel: "edit", icon: "edit", onClick: () => this.setState({ editing: true, value: this.props.value }) }),
                React.createElement(Box, { marginRight: 2 },
                    React.createElement(Text, { weight: "bold" },
                        this.props.name,
                        ": ")),
                React.createElement(Text, null, text)));
        }
        return (React.createElement(Box, { display: "flex", direction: "row" },
            React.createElement(IconButton, { iconColor: "darkGray", prefix: "far", size: "xs", accessibilityLabel: "edit", icon: "cancel", onClick: () => this.setState({ editing: false }) }),
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