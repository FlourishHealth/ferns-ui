import {DemoConfiguration} from "@config";
import {BooleanFieldDemo} from "@stories";
import {BooleanField} from "ferns-ui";
import React from "react";

export const BooleanFieldConfiguration: DemoConfiguration = {
  name: "Boolean field",
  component: BooleanField,
  related: ["Switch", "Checkbox", "Radio"],
  description:
    "Use the Boolean field for single cell options that can be turned on and off only. Also called 'toggle fields' and 'switch fields'.",
  a11yNotes: [
    "Users should be able to use the tab key to focus on the switch, and then the enter/space keys to interact with it.",
    "Switches should have labels that can be read by screen readers.",
    "Users should be able to click the labels to interact with the toggle.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23539&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "BooleanFieldProps",
  usage: {
    do: [
      "Use a boolean field for a binary option that can be either active or inactive.",
      "Use this for an immediate state change. For example, turning off airplane mode.",
      "Communicate why a boolean field is disabled.",
      "Be concise; this is microcopy.",
    ],
    doNot: [
      "Do not use boolean to choose between non-binary options. Instead, use a multiselect (checkbox) or radio field.",
      "Do not truncate text.",
    ],
  },
  props: {},
  demo: BooleanFieldDemo,
  demoOptions: {},
  stories: {
    "Boolean Field": {
      render: () => <BooleanFieldDemo />,
    },
  },
};
