import {TextField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

const TextFieldStory = ({
  initialValue,
  type,
  label,
}: {
  initialValue?: string;
  type: string;
  label: string;
}): ReactElement => {
  const [value, setValue] = useState(initialValue);
  return (
    <TextField
      id="none"
      label={label}
      type={type as any}
      value={value}
      onChange={(v) => {
        setValue(v.value);
      }}
    />
  );
};

export const TextFieldStories = {
  title: "TextField",
  component: TextField,
  stories: {
    "Text Fields": function () {
      return (
        <StorybookContainer>
          <TextField id="none" placeholder="Here's some placeholder text." onChange={() => {}} />
        </StorybookContainer>
      );
    },
    "With Label": function () {
      return (
        <StorybookContainer>
          <TextField
            helperText="And some subtext"
            id="none"
            label="Enter some text"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    Date() {
      return (
        <StorybookContainer>
          <TextFieldStory initialValue="2021-01-30T19:20:31.493Z" label="Pick a date" type="date" />
          <TextFieldStory initialValue="2021-01-30T19:20:31.493Z" label="Pick a time" type="time" />
          <TextFieldStory
            initialValue="2021-01-30T19:20:31.493Z"
            label="Pick a date and time"
            type="datetime"
          />
          <TextFieldStory label="Datetime starting from undefined" type="datetime" />
        </StorybookContainer>
      );
    },
    Disabled() {
      return (
        <StorybookContainer>
          <TextField disabled id="none" placeholder="This is disabled" onChange={() => {}} />
        </StorybookContainer>
      );
    },
    Errored() {
      return (
        <StorybookContainer>
          <TextField
            errorMessage="There's been an error"
            helperText="And some subtext"
            id="none"
            label="Enter some text"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
  },
};
