import {DateTime} from "luxon";
import React, {useCallback, useState} from "react";

import {DateTimeFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {TextField} from "./TextField";

export const DateTimeField = ({
  type,
  value,
  onChange,
  ...rest
}: DateTimeFieldProps): React.ReactElement => {
  const dateActionSheetRef: React.RefObject<any> = React.createRef();
  const [formattedDate, setFormattedDate] = useState<string>(
    value ? DateTime.fromISO(value).toFormat("MM / dd / yyyy") : ""
  );
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState<string>("");

  const formatInputDate = (input: string) => {
    const cleanedInput = input.replace(/\D/g, ""); // Remove non-numeric characters
    let formatted = cleanedInput;

    if (cleanedInput.length >= 2) {
      formatted = `${cleanedInput.slice(0, 2)}`;
      if (cleanedInput.length > 2) {
        formatted += ` / ${cleanedInput.slice(2, 4)}`;
      }
      if (cleanedInput.length > 4) {
        formatted += ` / ${cleanedInput.slice(4, 8)}`;
      }
    }

    return formatted;
  };

  const onTextFieldChange = useCallback(
    (inputDate: string) => {
      const formattedInput = formatInputDate(inputDate);
      const cleanedInput = formattedInput.replace(/\D/g, "");

      if (cleanedInput.length === 8) {
        const month = cleanedInput.slice(0, 2);
        const day = cleanedInput.slice(2, 4);
        const year = cleanedInput.slice(4, 8);
        const parsedDate = DateTime.fromFormat(`${month}${day}${year}`, "MMddyyyy");

        if (parsedDate.isValid) {
          setFormattedDate(parsedDate.toFormat("MM / dd / yyyy"));
          setError("");
          onChange(parsedDate.toISO());
        } else {
          setFormattedDate(formattedInput);
          setError("Invalid date");
          onChange("");
        }
      } else if (cleanedInput.length > 8) {
        setError("Invalid date");
        setFormattedDate(formattedInput);
        onChange("");
      } else {
        setFormattedDate(formattedInput);
        setError("");
      }
    },
    [onChange]
  );

  const onActionSheetChange = useCallback(
    (inputDate: string) => {
      onChange(inputDate);
      setFormattedDate(DateTime.fromISO(inputDate).toFormat("MM / dd / yyyy"));
      setShowDate(false);
      setError("");
    },
    [onChange]
  );

  return (
    <>
      <TextField
        errorText={error}
        iconName={type === "time" ? "clock" : "calendar"}
        placeholderText="MM / dd / yyyy"
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
        type={type}
        value={showDate ? value : undefined}
        visible={showDate}
        onChange={onActionSheetChange}
        onDismiss={() => setShowDate(false)}
      />
    </>
  );
};
