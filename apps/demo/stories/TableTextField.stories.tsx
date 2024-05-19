import {DemoConfiguration} from "@config";
import {TableTextField} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const TableTextFieldConfiguration: DemoConfiguration = {
  name: "Table text field",
  component: TableTextField, // Replace with actual component reference
  related: ["Table"],
  description: "This component adds a single line of text to the table.",
  a11yNotes: [],
  category: ["Data Display", "Table"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24141&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableTextFieldProps",
  usage: {
    do: [
      "Use the single line variant for short strings. For example, a name.",
      "Use the multi-line variant for longer strings. For example, a few sentences.",
    ],
    doNot: [
      "Do not populate placeholder text if no text is entered. Instead, leave the field empty.",
    ],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
  testMatrix: {},
  testMatrixDefaultProps: {},
};
