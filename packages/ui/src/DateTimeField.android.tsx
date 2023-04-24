import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {ReactElement, useMemo, useState} from "react";
import {TextInput} from "react-native";

import {DateTimeFieldProps} from "./Common";
import {Unifier} from "./Unifier";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  pickerType = "default",
  dateFormat,
  errorMessageColor,
}: DateTimeFieldProps): ReactElement => {
  // const [showCalendar, setShowCalendar] = useState(false);
  // const [showClock, setShowClock] = useState(false);
  // const [tempDate, setTempDate] = useState<Date>();
  const [pickerMode, setPickerMode] = useState(mode);
  const [showPicker, setShowPicker] = useState(false);

  const showCalendarFirst = mode === "datetime" || mode === "date";

  const defaultFormat = useMemo(() => {
    if (dateFormat) {
      return dateFormat;
    } else {
      if (mode === "date") {
        return "MMMM Do YYYY";
      } else if (mode === "time") {
        return "h:mm a";
      } else {
        return "MMMM Do YYYY, h:mm a";
      }
    }
  }, [mode, dateFormat]);

  const showMode = (currentMode: "date" | "time") => {
    setShowPicker(true);
    setPickerMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  return (
    <WithLabel
      label={errorMessage}
      labelColor={errorMessageColor || "red"}
      labelPlacement="after"
      labelSize="sm"
    >
      <WithLabel>
        <TextInput
          inputMode="none"
          style={{
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            height: 40,
            width: "100%",
            color: Unifier.theme.darkGray,
            fontFamily: Unifier.theme.primaryFont,
            borderWidth: 1,
          }}
          value={moment(value).format(defaultFormat)}
          onPressIn={() => {
            showCalendarFirst ? showDatePicker() : showTimePicker();
          }}
        />
        {showPicker && (
          <DateTimePicker
            display={pickerType}
            mode={pickerMode}
            testID="dateTimePicker"
            value={value}
            onChange={(event, date) => {
              if (date) {
                onChange(date);
                if (pickerMode === "date" && mode === "datetime") {
                  showTimePicker();
                }
              }
              setShowPicker(false);
            }}
          />
        )}
      </WithLabel>
    </WithLabel>
  );
};
