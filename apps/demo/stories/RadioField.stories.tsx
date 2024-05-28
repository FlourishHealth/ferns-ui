import {DemoConfiguration} from "@config";
import {RadioField} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const RadioFieldConfiguration: DemoConfiguration = {
  name: "Radio field",
  component: RadioField,
  related: ["Radio", "Checkbox"],
  description:
    "Radio fields are used for selecting only 1 item from a list of 2 or more items. If you have a binary choice, consider using checkboxes or toggles instead.",
  a11yNotes: [
    "Labels should be readable by screen readers.",
    "Labels should be able to be clicked or tapped to select a radio field.",
    "Keyboards should be able to tab back and forth between the radio buttons.",
    "The radio buttons should have a focus state.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23599&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "RadioFieldProps",
  usage: {
    do: ["Use radio buttons when only one option can be selected from a list."],
    doNot: [
      "Do not use radio buttons when there’s only one option to be selected. Use a checkbox or switch instead.",
    ],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
};
