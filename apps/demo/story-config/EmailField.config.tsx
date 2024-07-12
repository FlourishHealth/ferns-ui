import {DemoConfiguration} from "@config";
import {EmailFieldDemo} from "@stories";
import {EmailField} from "ferns-ui";

export const EmailFieldConfiguration: DemoConfiguration = {
  name: "Email field",
  component: EmailField,
  related: ["Text area"],
  description: "Use the email field to allow a user to input a valid email.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "planned",
    figma: "planned",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "EmailFieldProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: EmailFieldDemo,
  demoOptions: {},
  stories: {
    "Email Field": {
      render: EmailFieldDemo,
    },
  },
};
