import {DemoConfiguration} from "@config";
import {PhoneNumberFieldDemo} from "@stories";
import {EmailField} from "ferns-ui";

export const PhoneNumberConfiguration: DemoConfiguration = {
  name: "Phone number field",
  component: EmailField,
  related: ["Text area"],
  description: "Use the phone number field to allow a user to input a valid phone number.",
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
  interfaceName: "PhoneNumberFieldProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: PhoneNumberFieldDemo,
  demoOptions: {},
  stories: {
    "Phone Number Field": {
      render: PhoneNumberFieldDemo,
    },
  },
};
