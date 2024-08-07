import {DemoConfiguration} from "@config";
import {TextAreaDisabled, TextAreaErrored, TextAreas, WithLabelTextArea} from "@stories";
import {TextArea} from "ferns-ui";

export const TextAreaConfiguration: DemoConfiguration = {
  name: "Text area",
  component: TextArea, // Replace with actual component reference
  related: ["Text field"],
  description: "Use the text area form field to allow the user to enter multiple lines of text.",
  a11yNotes: ["The user should be able to use tab to navigate between elements."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23527&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TextAreaProps",
  usage: {
    do: [
      "Allow the user to enter multiple lines of text.",
      "Use this when longform text is allowed or needed.",
      "If an error is returned, tell the user why.",
      "If the field is disabled, tell the user why.",
    ],
    doNot: [
      "Do not use if the vast majority of inputs will be shorter strings. For example, a name.",
    ],
  },
  props: {},
  demo: TextAreas,
  demoOptions: {},
  stories: {
    TextArea: {render: TextAreas},
    WithLabelTextArea: {render: WithLabelTextArea},
    TextAreaDisabled: {render: TextAreaDisabled},
    TextAreaErrored: {render: TextAreaErrored},
  },
};
