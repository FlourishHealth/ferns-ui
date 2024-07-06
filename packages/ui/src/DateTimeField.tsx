import {getCalendars} from "expo-localization";
import {DateTime} from "luxon";
import React, {useCallback, useState} from "react";

import {DateTimeFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {printDate, printDateAndTime, printTime} from "./DateUtilities";
import {TextField} from "./TextField";

export const DateTimeField = ({
  type,
  value,
  onChange,
  timezone: tz,
  ...rest
}: DateTimeFieldProps): React.ReactElement => {
  const calendar = getCalendars()[0];
  const timezone = (tz || calendar?.timeZone) ?? "UTC"; // Fallback to UTC if timezone is undefined

  const formatValue = useCallback(
    (val: string) => {
      switch (type) {
        case "time":
          return printTime(val, {timezone, showTimezone: true});
        case "datetime":
          return printDateAndTime(val, {timezone, showTimezone: true});
        case "date":
        default:
          return printDate(val, {timezone, showTimezone: true});
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
              formatted += ` / ${cleanedInput.slice(2, 4)}`;
            }
            if (cleanedInput.length > 4) {
              formatted += ` / ${cleanedInput.slice(4, 8)}`;
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
              formatted += ` / ${cleanedInput.slice(2, 4)}`;
            }
            if (cleanedInput.length > 4) {
              formatted += ` / ${cleanedInput.slice(4, 8)}`;
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
  const [error, setError] = useState<string>("");

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
        parsedDate = DateTime.fromFormat(`${month}${day}${year}`, "MMddyyyy", {
          zone: timezone,
        });
      }

      if (parsedDate?.isValid) {
        setFormattedDate(formatValue(parsedDate.toISO()));
        setError("");
        onChange(parsedDate.toISO());
      } else if (cleanedInput.length > (type === "datetime" ? 12 : type === "time" ? 4 : 8)) {
        setError("Invalid date/time");
        setFormattedDate(formattedInput);
        onChange("");
      } else {
        setFormattedDate(formattedInput);
        setError("");
      }
    },
    [formatInputDate, type, timezone, formatValue, onChange]
  );

  const onActionSheetChange = useCallback(
    (inputDate: string) => {
      onChange(inputDate);
      setFormattedDate(formatValue(inputDate));
      setShowDate(false);
      setError("");
    },
    [formatValue, onChange]
  );

  return (
    <>
      <TextField
        errorText={error}
        iconName={type === "time" ? "clock" : "calendar"}
        placeholderText={
          type === "time"
            ? "hh:mm a"
            : type === "datetime"
              ? "MM / dd / yyyy hh:mm a"
              : "MM / dd / yyyy"
        }
        type="text"
        value={formattedDate}
        onChange={onTextFieldChange}
        onIconClick={() => {
          setShowDate(true);
        }}
        {...rest}
      />
      <DateTimeActionSheet
        actionSheetRef={dateActionSheetRef}
        timezone={timezone}
        type={type}
        value={value}
        visible={showDate}
        onChange={onActionSheetChange}
        onDismiss={() => setShowDate(false)}
      />
    </>
  );
};
