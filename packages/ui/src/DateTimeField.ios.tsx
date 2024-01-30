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
  errorMessageColor,
  dateFormat,
  pickerType = "inline",
  label,
}: DateTimeFieldProps): ReactElement => {
  const [showPicker, setShowPicker] = useState(false);
  const {theme} = useContext(ThemeContext);

  const calendar = getCalendars()[0];
  const timezone = calendar?.timeZone;

  let formattedValue;
  if (mode === "date") {
    formattedValue = printDate(value.toISOString(), {showTimezone: true, ignoreTime: true});
  } else if (mode === "time") {
    formattedValue = printTime(value.toISOString(), {
      timezone: timezone ?? "America/New_York",
      showTimezone: true,
    });
  } else {
    formattedValue = printDateAndTime(value.toISOString(), {showTimezone: true});
  }

  return (
    <WithLabel label={label} labelSize="lg">
      <WithLabel
        label={errorMessage}
        labelColor={errorMessageColor || "red"}
        labelPlacement="after"
        labelSize="sm"
      >
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
            setShowPicker(!showPicker);
          }}
        />

        {showPicker && (
          <DateTimePicker
            accentColor={theme.primary}
            display={pickerType}
            mode={mode}
            style={{alignSelf: "flex-start"}}
            testID="dateTimePicker"
            value={value}
            onChange={(event: any, date: any) => {
              if (!date) {
                return;
              }
              onChange(date);
            }}
          />
        )}
      </WithLabel>
    </WithLabel>
  );
};
