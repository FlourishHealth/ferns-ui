import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Text, TextField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

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
    <>
      <TextField
        id="none"
        label={label}
        type={type as any}
        value={value}
        onChange={(v) => {
          setValue(v.value);
        }}
      />
      <Text>Value: {value}</Text>
    </>
  );
};

const TextFields = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextField id="none" placeholder="Here's some placeholder text." onChange={() => {}} />
    </StorybookContainer>
  );
};
const WithLabel = (): React.ReactElement => {
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
};
const Date = (): React.ReactElement => {
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
};
const Disabled = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <TextField disabled id="none" placeholder="This is disabled" onChange={() => {}} />
    </StorybookContainer>
  );
};
const Errored = (): React.ReactElement => {
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
};

export const TextFieldConfiguration: DemoConfiguration = {
  name: "Text field",
  component: TextField, // Replace with actual component reference
  related: ["Text area"],
  description: "Use the text field to allow a user to input a single line of text.",
  a11yNotes: ["The user should be able to use tab to navigate between elements."],
  category: ["Data Entry", "Form"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23515&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TextFieldProps",
  usage: {
    do: [
      "Use this component for shorter strings. For example, a name.",
      "If an error is returned, tell the user why.",
      "If the field is disabled, tell the user why.",
    ],
    doNot: [
      "Do not use this component if a larger string is allowed or expected. Instead, use Text area.",
    ],
  },
  props: {},
  demo: TextFields,
  demoOptions: {},
  stories: {
    "Text Fields": {render: TextFields},
    "With Label": {render: WithLabel},
    Date: {render: Date},
    Disabled: {render: Disabled},
    Errored: {render: Errored},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
