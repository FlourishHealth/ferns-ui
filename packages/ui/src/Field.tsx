import isDate from "lodash/isDate";
import isNumber from "lodash/isNumber";
import moment from "moment-timezone";
import React, {useState} from "react";

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

/**
 * Field is a fully uncontrolled component for creating various inputs. Fully uncontrolled means Field manages its own
 * state for the TextFields/Switches/etc, not the parent component. When values are updated, Field will pass the data to
 * the parent through the handleChange prop. You can set an initialValue, but you should not update initialValue
 * this prop with the result of handleChange.
 *
 * Note: You MUST set a key={} prop for this component, otherwise you may wind up with stale data. Just changing
 * initialValue will not work.
 *
 */
export function Field(props: FieldProps) {
  const [value, setValue] = useState(props.initialValue || "");

  const handleChange = (newValue: string) => {
    if (props.type === "currency") {
      newValue = newValue.replace("$", "");
    } else if (props.type === "percent") {
      newValue = newValue.replace("%", "");
    }
    setValue(newValue);
    if (props.handleChange) {
      props.handleChange(props.name, newValue);
    }
  };

  const handleSwitchChange = (switchValue: boolean) => {
    setValue(switchValue);
    if (props.handleChange) {
      props.handleChange(props.name, switchValue);
    }
  };

  const validate = () => {
    // console.log("VALIDATE", props.validate && props.validate(value));
    if (props.validate && !props.validate(value)) {
      return false;
    }
    switch (props.type) {
      case "boolean":
        return true;
      case "currency":
        return true;
      case "date":
        return !value || isDate(value);
      case "email":
        return !value || (value.search("@") > -1 && value.search(".") > -1);
      case "number":
        return !value || isNumber(value);
      case "password":
        return true;
      case "percent":
        return !value || isNumber(value.replace("%", ""));
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

  const renderField = () => {
    if (props.type === "select") {
      if (!props.options) {
        console.error("Field with type=select require options");
        return null;
      }
      return (
        <SelectList
          disabled={props.disabled}
          id={props.name}
          options={props.options}
          value={value}
          onChange={handleChange}
        />
      );
    } else if (props.type === "textarea") {
      return (
        <TextArea
          disabled={props.disabled}
          id={props.name}
          placeholder={props.placeholder}
          rows={props.rows}
          value={String(value)}
          onChange={(result) => handleChange(result.value)}
        />
      );
    } else if (props.type === "boolean") {
      return (
        <Switch
          disabled={props.disabled}
          id={props.name}
          name={props.name}
          switched={Boolean(value)}
          onChange={(result) => handleSwitchChange(result)}
        />
      );
    } else if (props.type === "date") {
      const date = value.seconds ? moment(value.seconds * 1000) : moment(value);
      return (
        <TextField
          disabled
          id={props.name}
          placeholder={props.placeholder}
          type="text"
          // TODO: allow editing with a date picker
          value={date.format("MM/DD/YYYY HH:mmA")}
          onChange={(result) => handleChange(result.value)}
        />
      );
    } else {
      let type: TextFieldType = "text";
      // Number is supported differently because we need fractional numbers and they don't work
      // well on iOS.
      if (props.type && ["date", "email", "password", "url"].indexOf(props.type) > -1) {
        type = props.type as TextFieldType;
      } else if (props.type === "percent" || props.type === "currency") {
        type = "text";
      }
      let autoComplete: "on" | "current-password" | "username" = "on";
      if (type === "password") {
        autoComplete = "current-password";
      } else if (type === "email") {
        autoComplete = "username";
      }
      const stringValue = String(value);
      // if (props.type === "percent") {
      //   value = `${Number(value).toFixed(0)}%`;
      // } else if (props.type === "currency") {
      //   value = `$${Number(value).toFixed(2)}`;
      // }
      // console.log("VAL", value);
      return (
        <TextField
          autoComplete={autoComplete}
          disabled={props.disabled}
          id={props.name}
          placeholder={props.placeholder}
          type={type as "date" | "email" | "number" | "password" | "text" | "url"}
          value={stringValue}
          onChange={(result) => handleChange(result.value)}
        />
      );
    }
  };

  const children = renderField();
  const {errorMessage, errorMessageColor, helperText, helperTextColor, label, labelColor} = props;
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
