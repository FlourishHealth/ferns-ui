import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {ReactElement} from "react";
import DatePicker from "react-date-picker";
import DateTimePickerWeb from "react-datetime-picker";
import {Platform, View} from "react-native";
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
      <WithLabel>
        <View>
          <Box maxWidth={300}>
            {Platform.OS === "ios" && (
              <DateTimePicker
                display="spinner"
                mode={mode}
                testID="dateTimePicker"
                value={moment(value).toDate()}
                onChange={(event: any, date: any) => {
                  if (!date) {
                    return;
                  }
                  onChange(value);
                }}
              />
            )}
            {Platform.OS === "android" && (
              <>
                <DateTimePicker
                  display="spinner"
                  mode={mode === "datetime" ? "date" : mode}
                  testID="dateTimePicker"
                  value={moment(value).toDate()}
                  onChange={(event: any, date: any) => {
                    if (!date) {
                      return;
                    }
                    onChange(value);
                  }}
                />
                {mode === "datetime" && (
                  <DateTimePicker
                    display="spinner"
                    mode="time"
                    testID="dateTimePicker"
                    value={moment(value).toDate()}
                    onChange={(event: any, date: any) => {
                      // fix to append to date object
                      if (!date) {
                        return;
                      }
                      onChange(value);
                    }}
                  />
                )}
              </>
            )}
            {Platform.OS === "web" && (
              <>
                {mode === "datetime" && (
                  <DateTimePickerWeb disableClock value={value} onChange={onChange} />
                )}
                {mode === "date" && <DatePicker value={value} onChange={onChange} />}
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
              </>
            )}
          </Box>
        </View>
      </WithLabel>
    </WithLabel>
  );
};
