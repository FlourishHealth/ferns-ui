import {DemoConfiguration} from "@config";
import {PasswordField} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const PasswordFieldConfiguration: DemoConfiguration = {
  name: "Password field",
  component: PasswordField,
  related: [],
  description: "A form field that allows the user to enter a protected password.",
  a11yNotes: [
    "In general, this field is already accessible.",
    "Some additional WCAG documentation can be found here.",
  ],
  category: ["Form", "Input"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23575&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "PasswordFieldProps",
  usage: {
    do: ["Use the correct variant for the device size."],
    doNot: ["Do not show the user’s inputted text by default."],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
  testMatrix: {},
  testMatrixDefaultProps: {},
};
