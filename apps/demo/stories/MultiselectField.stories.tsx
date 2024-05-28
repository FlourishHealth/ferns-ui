import {DemoConfiguration} from "@config";
import {MultiselectField} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const MultiselectFieldConfiguration: DemoConfiguration = {
  name: "Multiselect Field",
  component: MultiselectField,
  related: ["Checkbox microcomponent"],
  description:
    "Also called 'checkbox field'. This component is a list of checkable items. In this case, a user can choose one, many, all, or no options.",
  a11yNotes: [
    "Screen readers should know when a set of checkboxes is related.",
    "When a user clicks the checkbox label, they should be able to interact with the checkbox. Learn more about that here.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23587&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "MultiselectFieldProps",
  usage: {
    do: [
      "When inputs within a broader form are closely related and would benefit from a shared legend.",
      "When the user can choose one, many, or no options.",
    ],
    doNot: ["When the fields are unrelated."],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
};
