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
  errorMessageColor,
  dateFormat,
  pickerType = "inline",
  label,
}: DateTimeFieldProps): ReactElement => {
  const [showPicker, setShowPicker] = useState(false);

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
            color: Unifier.theme.darkGray,
            fontFamily: Unifier.theme.primaryFont,
            borderWidth: 1,
          }}
          value={moment(value).format(defaultFormat)}
          onPressIn={() => {
            setShowPicker(!showPicker);
          }}
        />

        {showPicker && (
          <DateTimePicker
            accentColor={Unifier.theme.primary}
            display={pickerType}
            mode={mode}
            style={{alignSelf: "flex-start"}}
            testID="dateTimePicker"
            value={moment(value).toDate()}
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
