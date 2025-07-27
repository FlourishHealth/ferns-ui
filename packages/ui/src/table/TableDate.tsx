import {DateTime} from "luxon";
import React, {useState} from "react";
import {Text} from "react-native";

import {TableDateProps} from "../Common";

export const TableDate: React.FC<TableDateProps> = ({value, annotated = false}) => {
  const initialDate =
    typeof value === "string" ? DateTime.fromISO(value) : DateTime.fromJSDate(value);
  const [dateVal] = useState(initialDate);

  // TODO: Formatting date with annotations should be in DateUtilities and tested.
  const formatDate = (date: DateTime) => {
    const now = DateTime.now();
    const diff = now.diff(date, ["years", "months", "days"]).toObject();

    let diffString = "";
    if (diff.years) {
      diffString += `${Math.floor(diff.years)} Year${Math.floor(diff.years) > 1 ? "s" : ""} `;
    }
    if (diff.months) {
      diffString += `${Math.floor(diff.months)} Mo${Math.floor(diff.months) > 1 ? "s" : ""} `;
    }
    if (diff.days) {
      diffString += `${Math.floor(diff.days)} Day${Math.floor(diff.days) > 1 ? "s" : ""}`;
    }

    return `${date.toFormat("MM/dd/yyyy")} (${diffString.trim()})`;
  };

  return (
    <Text style={{fontSize: 16}}>
      {annotated ? formatDate(dateVal) : dateVal.toFormat("MM/dd/yyyy")}
    </Text>
  );
};

TableDate.displayName = "TableDate";
