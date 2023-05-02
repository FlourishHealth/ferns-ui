import {isArray} from "lodash";
import React, {ReactElement} from "react";
import DatePicker from "react-date-picker";
import DateTimePickerWeb from "react-datetime-picker";
import TimePicker from "react-time-picker";

import {Box} from "./Box";
import {DateTimeFieldProps, WithChildren} from "./Common";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  errorMessageColor,
}: WithChildren<DateTimeFieldProps>): ReactElement => {
  return (
    <WithLabel
      label={errorMessage}
      labelColor={errorMessageColor || "red"}
      labelPlacement="after"
      labelSize="sm"
    >
      <Box flex="grow" maxWidth={300} zIndex="auto">
        {mode === "datetime" && (
          <DateTimePickerWeb
            disableClock
            value={value}
            onChange={(newVal) => {
              if (isArray(newVal) || !newVal) {
                console.warn("DateTimePicker returned an array", newVal);
                return;
              }
              onChange(newVal);
            }}
          />
        )}
        {mode === "date" && (
          <DatePicker
            value={value}
            onChange={(newVal) => {
              if (isArray(newVal) || !newVal) {
                console.warn("DatePicker returned an array", newVal);
                return;
              }
              onChange(newVal);
            }}
          />
        )}
        {mode === "time" && (
          <TimePicker
            disableClock
            value={value}
            onChange={(newVal) => {
              if (isArray(newVal) || !newVal) {
                console.warn("TimePicker returned an array", newVal);
                return;
              }
              // TimePicker returns a string or Date, so we need to make sure it's a Date
              const newDate = new Date(newVal);
              onChange(newDate);
            }}
          />
        )}
      </Box>
    </WithLabel>
  );
};
