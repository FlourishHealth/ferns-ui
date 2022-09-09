import {DateTimeField} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

interface DateTimeProps {
  mode: "date" | "time" | "datetime";
}

const DateTime = ({mode}: DateTimeProps) => {
  const [value, setValue] = useState(new Date());

  return (
    <StorybookContainer>
      <DateTimeField mode={mode} value={value} onChange={setValue} />
    </StorybookContainer>
  );
};

export const DateTimeStories = {
  title: "Date Time",
  component: DateTimeField,
  stories: {
    "Date and Time": function () {
      return <DateTime mode="datetime" />;
    },
    "Date without Time": function () {
      return <DateTime mode="date" />;
    },
    "Time without Date": function () {
      return <DateTime mode="time" />;
    },
  },
};
