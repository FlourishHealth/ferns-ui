import DateTimePicker from "@react-native-community/datetimepicker";
import React, {ReactElement, useContext, useMemo, useState} from "react";
import {TextInput} from "react-native";

import {DateTimeFieldProps} from "./Common";
import dayjs from "./dayjsExtended";
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
          value={dayjs(value).format(defaultFormat)}
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
            value={dayjs(value).toDate()}
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
