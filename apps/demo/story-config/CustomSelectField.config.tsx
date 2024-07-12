import {DemoConfiguration} from "@config";
import {CustomSelectFieldDemo} from "@stories";
import {Box, CustomSelectField} from "ferns-ui";
import React from "react";

export const CustomSelectFieldConfiguration: DemoConfiguration = {
  name: "Custom Select Field",
  component: CustomSelectField,
  related: ["SelectField", "Field", "Tap-to-edit"],
  description:
    "Displays a list of options using the browser’s native select and includes a custom option that renders a text field when selected and allows user to input value not included in predefined options.",
  a11yNotes: ["The list should be labeled so that screen readers know that the list is related."],
  category: "Component",
  status: {
    // TODO: ensure custom select component meets accessibility requirements
    documentation: "inProgress",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23563&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "CustomSelectFieldProps",
  usage: {
    do: [
      "Present users with a list of options.",
      "Allow users to choose one provided option or enter a custom option.",
    ],
    doNot: [
      "When more than 10 options are needed, consider using another component instead.",
      "If two or more choices are allowed, use the checkbox field.",
    ],
  },
  props: {},
  demo: CustomSelectFieldDemo,
  demoOptions: {
    controls: {
      title: {
        type: "text",
        defaultValue: "Custom Select Field Title",
      },
      helperText: {
        type: "text",
        defaultValue: "Helper text goes here",
      },
      errorText: {
        type: "text",
        defaultValue: "",
      },
      disabled: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    WithTitle: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex">
            <CustomSelectField
              options={[
                {label: "One option", value: "option1"},
                {label: "Another option", value: "option2"},
                {label: "A third option", value: "option3"},
              ]}
              title="Custom Select Field Title"
              value={undefined}
              onChange={() => {}}
            />
          </Box>
        );
      },
    },
    HelperText: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex">
            <CustomSelectField
              helperText="Some info here about the field"
              options={[
                {label: "One option", value: "option1"},
                {label: "Another option", value: "option2"},
                {label: "A third option", value: "option3"},
              ]}
              value={undefined}
              onChange={() => {}}
            />
          </Box>
        );
      },
    },
    ErrorText: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex">
            <CustomSelectField
              errorText="Something went wrong!"
              options={[
                {label: "One option", value: "option1"},
                {label: "Another option", value: "option2"},
                {label: "A third option", value: "option3"},
              ]}
              value={undefined}
              onChange={() => {}}
            />
          </Box>
        );
      },
    },
    Disabled: {
      description: "",
      render: () => {
        return (
          <Box direction="column" display="flex">
            <CustomSelectField
              disabled
              options={[
                {label: "One option", value: "option1"},
                {label: "Another option", value: "option2"},
                {label: "A third option", value: "option3"},
              ]}
              value={undefined}
              onChange={() => {}}
            />
          </Box>
        );
      },
    },
  },
};
