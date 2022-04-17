import isDate from "lodash/isDate";
import isNumber from "lodash/isNumber";
import moment from "moment-timezone";
import React from "react";
import {Box} from "./Box";
import {FieldProps, TextFieldType} from "./Common";
import {FieldWithLabels} from "./FieldWithLabels";
import {SelectList} from "./SelectList";
import {Switch} from "./Switch";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";

interface State {
  value: any;
}

export class Field extends React.Component<FieldProps, State> {
  constructor(props: FieldProps) {
    super(props);
    this.state = {value: props.initialValue || ""};
  }

  UNSAFE_componentWillReceiveProps(nextProps: FieldProps) {
    if (nextProps.initialValue !== this.state.value) {
      this.setState({value: nextProps.initialValue});
    }
  }

  handleChange = (value: string) => {
    if (this.props.type === "currency") {
      value = value.replace("$", "");
    } else if (this.props.type === "percent") {
      value = value.replace("%", "");
    }
    this.setState({value});
    if (this.props.handleChange) {
      this.props.handleChange(this.props.name, value);
    }
  };

  handleSwitchChange = (value: boolean) => {
    this.setState({value});
    if (this.props.handleChange) {
      this.props.handleChange(this.props.name, value);
    }
  };

  validate = () => {
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
        return (
          !this.state.value ||
          (this.state.value.search("@") > -1 && this.state.value.search(".") > -1)
        );
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

  renderField() {
    if (this.props.type === "select") {
      if (!this.props.options) {
        console.error("Field with type=select require options");
        return null;
      }
      return (
        <SelectList
          id={this.props.name}
          options={this.props.options}
          onChange={this.handleChange}
          value={this.state.value}
          disabled={this.props.disabled}
        />
      );
    } else if (this.props.type === "textarea") {
      return (
        <TextArea
          id={this.props.name}
          placeholder={this.props.placeholder}
          onChange={({value}) => this.handleChange(value)}
          value={String(this.state.value)}
          disabled={this.props.disabled}
          rows={this.props.rows}
        />
      );
    } else if (this.props.type === "boolean") {
      return (
        <Switch
          id={this.props.name}
          switched={Boolean(this.state.value)}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={(result) => this.handleSwitchChange(result)}
        />
      );
    } else if (this.props.type === "date") {
      let value = this.state.value.seconds
        ? moment(this.state.value.seconds * 1000)
        : moment(this.state.value);
      return (
        <TextField
          id={this.props.name}
          placeholder={this.props.placeholder}
          onChange={(result) => this.handleChange(result.value)}
          value={value.format("MM/DD/YYYY HH:mmA")}
          // TODO: allow editing with a date picker
          disabled={true}
          type="text"
        />
      );
    } else {
      let type: TextFieldType = "text";
      // Number is supported differently because we need fractional numbers and they don't work
      // well on iOS.
      if (this.props.type && ["date", "email", "password", "url"].indexOf(this.props.type) > -1) {
        type = this.props.type as TextFieldType;
      } else if (this.props.type === "percent" || this.props.type === "currency") {
        type = "text";
      }
      let autoComplete: "on" | "current-password" | "username" = "on";
      if (type === "password") {
        autoComplete = "current-password";
      } else if (type === "email") {
        autoComplete = "username";
      }
      let value = String(this.state.value);
      // if (this.props.type === "percent") {
      //   value = `${Number(this.state.value).toFixed(0)}%`;
      // } else if (this.props.type === "currency") {
      //   value = `$${Number(value).toFixed(2)}`;
      // }
      // console.log("VAL", value);
      return (
        <TextField
          id={this.props.name}
          placeholder={this.props.placeholder}
          autoComplete={autoComplete}
          onChange={(result) => this.handleChange(result.value)}
          value={value}
          disabled={this.props.disabled}
          type={type as "date" | "email" | "number" | "password" | "text" | "url"}
        />
      );
    }
  }

  render() {
    let children = this.renderField();
    const {
      errorMessage,
      errorMessageColor,
      helperText,
      helperTextColor,
      label,
      labelColor,
    } = this.props;
    return (
      <Box marginBottom={5}>
        <FieldWithLabels
          {...{
            errorMessage,
            errorMessageColor,
            helperText,
            helperTextColor,
            label,
            labelColor,
          }}
        >
          {children}
        </FieldWithLabels>
      </Box>
    );
  }
}
