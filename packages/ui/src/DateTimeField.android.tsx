import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, {ReactElement, useState} from "react";
import {TextInput} from "react-native-gesture-handler";

import {DateTimeFieldProps} from "./Common";
import {Unifier} from "./Unifier";
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
  const [date, setDate] = useState(new Date(1598051730000));
  const [pickerMode, setPickerMode] = useState(mode);
  const [show, setShow] = useState(false);
  console.log({state: {showCalendar, showClock}});

  const showCalendarFirst = mode === "datetime" || mode === "date";

  const onDateChange = (_event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(false);
    setPickerMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
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
          value={moment(value).format("MMMM Do YYYY, h:mm a")}
          onPressIn={() => {
            // setShowCalendar(false);
            // setShowClock(false);
            // showCalendarFirst ? setShowCalendar(true) : setShowClock(true);
          }}
        />
        {showCalendar && (
          <DateTimePicker
            display={pickerType}
            mode="date"
            testID="dateTimePicker"
            value={value}
            onChange={(event: any, newDate: any) => {
              console.log({event1: event});
              console.log({newDate});
              if (!newDate || event.type === "dismissed") {
                return;
              }
              if (mode === "datetime") {
                setShowClock(true);
                setTempDate(newDate);
              } else {
                onChange(newDate);
              }
              setShowCalendar(false);
            }}
          />
        )}
        {showClock && (
          <DateTimePicker
            display={pickerType}
            mode="time"
            testID="dateTimePicker"
            value={value}
            onChange={(event: any, newTime: any) => {
              console.log({event2: event});
              console.log({newTime: newTime.getTime()});
              const newDate = tempDate as Date;
              newDate.setTime(newTime.getTime());
              console.log({timeDate: newDate});
              if (!newTime) {
                console.log("returning");
                return;
              }
              onChange(newDate);
              setShowClock(false);
            }}
          />
        )}
      </WithLabel>
    </WithLabel>
  );
};
