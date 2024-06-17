import {DemoConfiguration} from "@config";
import {Date, DisabledTextField, Errored, TextFields, TextWithLabel} from "@stories";
import {TextField} from "ferns-ui";

export const TextFieldConfiguration: DemoConfiguration = {
  name: "Text field",
  component: TextField, // Replace with actual component reference
  related: ["Text area"],
  description: "Use the text field to allow a user to input a single line of text.",
  a11yNotes: ["The user should be able to use tab to navigate between elements."],
  category: "Component",
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
    "With Label": {render: TextWithLabel},
    Date: {render: Date},
    Disabled: {render: DisabledTextField},
    Errored: {render: Errored},
  },
};
