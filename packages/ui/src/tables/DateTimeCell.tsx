import get from "lodash/get";
import startCase from "lodash/startCase";
import React, {useState} from "react";

import {ModelAdminFieldConfig} from "../Common";
import dayjs from "../dayjsExtended";
import {Field} from "../Field";
import {printDate, printDateTime} from "../Utilities";
import {TextCell} from "./TextCell";

export const DateTimeCell = ({
  doc,
  dateOnly = false,
  editing,
  field,
  onChange,
  displaySince = false,
}: {
  doc: any;
  dateOnly?: boolean;
  editing: boolean;
  field: ModelAdminFieldConfig;
  onChange?: (value: string) => void;
  displaySince?: boolean;
}): React.ReactElement => {
  const userField = get(doc, field.fieldKey);
  const [date, setDate] = useState<string | undefined>(
    userField ? dayjs.utc(userField).toISOString() : undefined
  );
  let since = "";
  if (displaySince && date) {
    since = ` (${dayjs.utc(date).fromNow(true)})`;
  }

  let value;
  if (dateOnly && date) {
    value = printDate(date);
  } else if (date) {
    value = printDateTime(date);
  }

  if (editing) {
    return (
      <Field
        {...field}
        label={startCase(field.fieldKey)}
        name="date"
        options={field.options?.map((option) => ({label: option, value: option}))}
        type={dateOnly ? "date" : "datetime"}
        value={date}
        onChange={(v: any) => {
          setDate(v);
          onChange?.(v);
        }}
      />
    );
  } else {
    return <TextCell text={`${value}${since}`} />;
  }
};
