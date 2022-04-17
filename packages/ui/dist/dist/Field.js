import isDate from "lodash/isDate";
import isNumber from "lodash/isNumber";
import moment from "moment-timezone";
import React from "react";
import { Box } from "./Box";
import { FieldWithLabels } from "./FieldWithLabels";
import { SelectList } from "./SelectList";
import { Switch } from "./Switch";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";
export class Field extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (value) => {
            if (this.props.type === "currency") {
                value = value.replace("$", "");
            }
            else if (this.props.type === "percent") {
                value = value.replace("%", "");
            }
            this.setState({ value });
            if (this.props.handleChange) {
                this.props.handleChange(this.props.name, value);
            }
        };
        this.handleSwitchChange = (value) => {
            this.setState({ value });
            if (this.props.handleChange) {
                this.props.handleChange(this.props.name, value);
            }
        };
        this.validate = () => {
            // console.log("VALIDATE", this.props.validate && this.props.validate(this.state.value));
            if (this.props.validate && !this.props.validate(this.state.value)) {
                return false;
            }
            switch (this.props.type) {
                case "boolean":
                    return true;
                case "currency":
                    return true;
                case "date":
                    return !this.state.value || isDate(this.state.value);
                case "email":
                    return (!this.state.value ||
                        (this.state.value.search("@") > -1 && this.state.value.search(".") > -1));
                case "number":
                    return !this.state.value || isNumber(this.state.value);
                case "password":
                    return true;
                case "percent":
                    return !this.state.value || isNumber(this.state.value.replace("%", ""));
                case "select":
                    return true;
                case "text":
                case undefined: // text is default
                    return true;
                case "textarea":
                    return true;
                case "url":
                    return true;
                default:
                    return true;
            }
        };
        this.state = { value: props.initialValue || "" };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.initialValue !== this.state.value) {
            this.setState({ value: nextProps.initialValue });
        }
    }
    renderField() {
        if (this.props.type === "select") {
            if (!this.props.options) {
                console.error("Field with type=select require options");
                return null;
            }
            return (React.createElement(SelectList, { id: this.props.name, options: this.props.options, onChange: this.handleChange, value: this.state.value, disabled: this.props.disabled }));
        }
        else if (this.props.type === "textarea") {
            return (React.createElement(TextArea, { id: this.props.name, placeholder: this.props.placeholder, onChange: ({ value }) => this.handleChange(value), value: String(this.state.value), disabled: this.props.disabled, rows: this.props.rows }));
        }
        else if (this.props.type === "boolean") {
            return (React.createElement(Switch, { id: this.props.name, switched: Boolean(this.state.value), disabled: this.props.disabled, name: this.props.name, onChange: (result) => this.handleSwitchChange(result) }));
        }
        else if (this.props.type === "date") {
            let value = this.state.value.seconds
                ? moment(this.state.value.seconds * 1000)
                : moment(this.state.value);
            return (React.createElement(TextField, { id: this.props.name, placeholder: this.props.placeholder, onChange: (result) => this.handleChange(result.value), value: value.format("MM/DD/YYYY HH:mmA"),
                // TODO: allow editing with a date picker
                disabled: true, type: "text" }));
        }
        else {
            let type = "text";
            // Number is supported differently because we need fractional numbers and they don't work
            // well on iOS.
            if (this.props.type && ["date", "email", "password", "url"].indexOf(this.props.type) > -1) {
                type = this.props.type;
            }
            else if (this.props.type === "percent" || this.props.type === "currency") {
                type = "text";
            }
            let autoComplete = "on";
            if (type === "password") {
                autoComplete = "current-password";
            }
            else if (type === "email") {
                autoComplete = "username";
            }
            let value = String(this.state.value);
            // if (this.props.type === "percent") {
            //   value = `${Number(this.state.value).toFixed(0)}%`;
            // } else if (this.props.type === "currency") {
            //   value = `$${Number(value).toFixed(2)}`;
            // }
            // console.log("VAL", value);
            return (React.createElement(TextField, { id: this.props.name, placeholder: this.props.placeholder, autoComplete: autoComplete, onChange: (result) => this.handleChange(result.value), value: value, disabled: this.props.disabled, type: type }));
        }
    }
    render() {
        let children = this.renderField();
        const { errorMessage, errorMessageColor, helperText, helperTextColor, label, labelColor, } = this.props;
        return (React.createElement(Box, { marginBottom: 5 }, React.createElement(FieldWithLabels, Object.assign({}, {
            errorMessage,
            errorMessageColor,
            helperText,
            helperTextColor,
            label,
            labelColor,
        }), children)));
    }
}
//# sourceMappingURL=Field.js.map
//# sourceMappingURL=Field.js.map