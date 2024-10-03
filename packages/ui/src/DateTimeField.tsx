import {getCalendars} from "expo-localization";
import {DateTime} from "luxon";
import React, {useCallback, useEffect, useState} from "react";

import {DateTimeFieldProps, IconName} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {printDate, printDateAndTime, printTime} from "./DateUtilities";
import {TextField} from "./TextField";

// TODO: allow use of keyboard to type in date/time
export const DateTimeField = ({
  type,
  value,
  onChange,
  timezone: tz,
  errorText,
  disabled,
  ...rest
}: DateTimeFieldProps): React.ReactElement => {
  const calendar = getCalendars()[0];
  const timezone = (tz || calendar?.timeZone) ?? "UTC"; // Fallback to UTC if timezone is undefined

  let placeholder: string = "";
  if (type === "time") {
    placeholder = "hh:mm a";
  } else if (type === "datetime") {
    placeholder = "mm/dd/yyyy hh:mm a";
  } else if (type === "date") {
    placeholder = "mm/dd/yyyy";
  }

  let iconName: IconName | undefined;
  if (disabled) {
    iconName = undefined;
  } else if (type === "time") {
    iconName = "clock";
  } else {
    iconName = "calendar";
  }

  const formatValue = useCallback(
    (val: string) => {
      switch (type) {
        case "time":
          return printTime(val, {timezone, showTimezone: true});
        case "datetime":
          return printDateAndTime(val, {timezone, showTimezone: true});
        case "date":
        default:
          return printDate(val, {ignoreTime: true});
      }
    },
    [timezone, type]
  );

  const formatInputDate = useCallback(
    (input: string) => {
      const cleanedInput = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      let formatted = input;

      switch (type) {
        case "time":
          if (cleanedInput.length >= 2) {
            formatted = `${cleanedInput.slice(0, 2)}:${cleanedInput.slice(2, 4)}`;
          } else {
            formatted = cleanedInput;
          }
          break;
        case "datetime":
          if (cleanedInput.length >= 2) {
            formatted = `${cleanedInput.slice(0, 2)}`;
            if (cleanedInput.length > 2) {
              formatted += `/${cleanedInput.slice(2, 4)}`;
            }
            if (cleanedInput.length > 4) {
              formatted += `/${cleanedInput.slice(4, 8)}`;
            }
            if (cleanedInput.length > 8) {
              formatted += ` ${cleanedInput.slice(8, 10)}:${cleanedInput.slice(10, 12)}`;
            }
          }
          break;
        case "date":
        default:
          if (cleanedInput.length >= 2) {
            formatted = `${cleanedInput.slice(0, 2)}`;
            if (cleanedInput.length > 2) {
              formatted += `/${cleanedInput.slice(2, 4)}`;
            }
            if (cleanedInput.length > 4) {
              formatted += `/${cleanedInput.slice(4, 8)}`;
            }
          }
          break;
      }

      return formatted;
    },
    [type]
  );

  const dateActionSheetRef: React.RefObject<any> = React.createRef();
  const [formattedDate, setFormattedDate] = useState<string>(value ? formatValue(value) : "");
  const [showDate, setShowDate] = useState(false);
  const [localError, setLocalError] = useState<string>("");

  const onTextFieldChange = useCallback(
    (inputDate: string) => {
      const formattedInput = formatInputDate(inputDate);
      const cleanedInput = formattedInput.replace(/[^0-9]/g, "");

      let parsedDate;
      if (type === "datetime" && cleanedInput.length === 12) {
        const month = cleanedInput.slice(0, 2);
        const day = cleanedInput.slice(2, 4);
        const year = cleanedInput.slice(4, 8);
        const hour = cleanedInput.slice(8, 10);
        const minute = cleanedInput.slice(10, 12);
        parsedDate = DateTime.fromFormat(`${month}${day}${year}${hour}${minute}`, "MMddyyyyHHmm", {
          zone: timezone,
        });
      } else if (type === "time" && cleanedInput.length === 4) {
        const hour = cleanedInput.slice(0, 2);
        const minute = cleanedInput.slice(2, 4);
        parsedDate = DateTime.fromFormat(`${hour}${minute}`, "HHmm", {
          zone: timezone,
        });
      } else if (type === "date" && cleanedInput.length === 8) {
        const month = cleanedInput.slice(0, 2);
        const day = cleanedInput.slice(2, 4);
        const year = cleanedInput.slice(4, 8);
        parsedDate = DateTime.fromFormat(`${month}${day}${year}`, "MMddyyyy", {zone: timezone})
          .startOf("day")
          .toUTC(0, {keepLocalTime: true});
      }

      if (!parsedDate) {
        setLocalError("Invalid date/time. Please format as " + `${placeholder}`);
        setFormattedDate(formattedInput);
        onChange("");
        return;
      }
      if (parsedDate?.isValid) {
        setFormattedDate(formatValue(parsedDate.toISO()));
        setLocalError("");
        onChange(parsedDate.toISO());
      } else if (cleanedInput.length > (type === "datetime" ? 12 : type === "time" ? 4 : 8)) {
        setLocalError("Invalid date/time");
        setFormattedDate(formattedInput);
        onChange("");
      } else {
        setFormattedDate(formattedInput);
        setLocalError("Invalid date/time. Please format as " + `${placeholder}`);
      }
    },
    [formatInputDate, type, timezone, formatValue, onChange, placeholder]
  );

  const onActionSheetChange = useCallback(
    (inputDate: string) => {
      onChange(inputDate);
      setFormattedDate(formatValue(inputDate));
      setShowDate(false);
      setLocalError("");
    },
    [formatValue, onChange]
  );

  // if the value of the overall field changes via prop from the parent,
  // update the formattedDate to keep the value of the TextField and DateTimeActionSheet in sync
  useEffect(() => {
    if (value) {
      const formatted = formatValue(value);
      if (formattedDate !== formatted) {
        setFormattedDate(formatted);
      }
      if (errorText) {
        setLocalError(errorText);
      }
    }
  }, [value, formatValue, formattedDate, errorText]);

  return (
    <>
      <TextField
        disabled={disabled}
        errorText={localError}
        iconName={iconName}
        placeholder={placeholder}
        type="text"
        value={formattedDate}
        onChange={onTextFieldChange}
        onIconClick={() => {
          setShowDate(true);
        }}
        {...rest}
      />
      {!disabled && (
        <DateTimeActionSheet
          actionSheetRef={dateActionSheetRef}
          timezone={timezone}
          type={type}
          value={value}
          visible={showDate}
          onChange={onActionSheetChange}
          onDismiss={() => setShowDate(false)}
        />
      )}
    </>
  );
};
