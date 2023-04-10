import {DateTimeField} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

interface DateTimeProps {
  mode: "date" | "time" | "datetime";
  label?: string;
}

const DateTime = ({mode, label}: DateTimeProps) => {
  const [value, setValue] = useState(new Date());

  return <DateTimeField label={label} mode={mode} value={value} onChange={setValue} />;
};

export const DateTimeStories = {
  title: "Date Time",
  component: DateTimeField,
  stories: {
    "Date and Time": function () {
      return (
        // Placed two here to ensure that the calendar z-index does
        // not conflict with the second one
        <StorybookContainer>
          <DateTime label="This is new" mode="datetime" />
          {/* <DateTime mode="datetime" /> */}
        </StorybookContainer>
      );
    },
    "Date without Time": function () {
      return (
        <StorybookContainer>
          <DateTime label="birthday" mode="date" />
        </StorybookContainer>
      );
    },
    "Time without Date": function () {
      return (
        <StorybookContainer>
          <DateTime mode="time" />
        </StorybookContainer>
      );
    },
  },
};
