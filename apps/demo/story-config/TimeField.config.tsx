import {DemoConfiguration} from "@config";
import {DefaultDemo} from "@stories";
import {TimeField} from "ferns-ui";

export const TimeFieldConfiguration: DemoConfiguration = {
  name: "Time field",
  component: TimeField, // Replace with actual component reference
  related: ["Date field", "Date/time modal & field pattern"],
  description:
    "This form field allows the user to select a time. Used in conjunction with the date & time modal in this pattern.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23846&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TimeFieldProps",
  usage: {
    do: [
      "Use the descriptive text when there’s an error.",
      "Whenever possible, tell a user why a field is disabled.",
    ],
    doNot: ["Do not remove the descriptive text when there’s an error."],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {},
};
