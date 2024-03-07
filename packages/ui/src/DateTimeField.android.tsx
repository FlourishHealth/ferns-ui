import DateTimePicker from "@react-native-community/datetimepicker";
import {getCalendars} from "expo-localization";
import React, {ReactElement, useContext, useState} from "react";
import {TextInput} from "react-native";

import {DateTimeFieldProps} from "./Common";
import {printDate, printDateAndTime, printTime} from "./DateUtilities";
import {ThemeContext} from "./Theme";
import {WithLabel} from "./WithLabel";

export const DateTimeField = ({
  mode,
  value,
  onChange,
  errorMessage,
  pickerType = "default",
  errorMessageColor,
}: DateTimeFieldProps): ReactElement => {
  // const [showCalendar, setShowCalendar] = useState(false);
  // const [showClock, setShowClock] = useState(false);
  // const [tempDate, setTempDate] = useState<Date>();
  const [pickerMode, setPickerMode] = useState(mode);
  const [showPicker, setShowPicker] = useState(false);
  const {theme} = useContext(ThemeContext);

  const showCalendarFirst = mode === "datetime" || mode === "date";

  const calendar = getCalendars()[0];
  const timezone = calendar?.timeZone;

  let formattedValue;
  if (mode === "date") {
    formattedValue = printDate(value.toISOString(), {showTimezone: true, ignoreTime: true});
  } else if (mode === "time") {
    formattedValue = printTime(value.toISOString(), {
      showTimezone: true,
      timezone: timezone ?? "America/New_York",
    });
  } else {
    formattedValue = printDateAndTime(value.toISOString(), {showTimezone: true});
  }

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
            color: theme.darkGray,
            fontFamily: theme.primaryFont,
            borderWidth: 1,
          }}
          value={formattedValue}
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
