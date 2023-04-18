import React, {ReactElement} from "react";
import DateTimePickerWeb from "react-datetime-picker";
import TimePicker from "react-time-picker";

import {Box} from "./Box";
import {DateTimeFieldProps} from "./Common";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  errorMessageColor,
}: DateTimeFieldProps): ReactElement => {
  return (
    <WithLabel
      label={errorMessage}
      labelColor={errorMessageColor || "red"}
      labelPlacement="after"
      labelSize="sm"
    >
      <Box flex="grow" maxWidth={300} zIndex="auto">
        {mode === "datetime" && (
          <DateTimePickerWeb disableClock value={value} onChange={onChange} />
        )}
        {/* {mode === "date" && <DatePicker value={value} onChange={onChange} />} */}
        {mode === "time" && (
          <TimePicker
            disableClock
            value={value}
            onChange={(newVal) => {
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
