import {DemoConfiguration} from "@config";
import {SelectFieldDemo, SelectFieldExamples} from "@stories";
import {SelectField} from "ferns-ui";

export const SelectFieldConfiguration: DemoConfiguration = {
  name: "Select field",
  component: SelectField,
  related: ["Checkbox", "Radio field"],
  description: "Displays a list of actions or options using the browser’s native select.",
  a11yNotes: ["The list should be labeled so that screen readers know that the list is related."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23563&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SelectFieldProps",
  usage: {
    do: ["Present users with a list of options.", "Allow users to choose one option."],
    doNot: [
      "When more than 10 options are needed, consider using another component instead.",
      "If two or more choices are allowed, use the checkbox field.",
      "If fewer than 4 choices are needed, consider using a Radio field instead.",
    ],
  },
  props: {},
  demo: SelectFieldDemo,
  demoOptions: {
    controls: {
      withTitle: {
        type: "boolean",
        defaultValue: true,
      },
      withHelperText: {
        type: "boolean",
        defaultValue: false,
      },
      withErrorText: {
        type: "boolean",
        defaultValue: false,
      },
      disabled: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    "Select Field Examples": {render: SelectFieldExamples},
  },
};
