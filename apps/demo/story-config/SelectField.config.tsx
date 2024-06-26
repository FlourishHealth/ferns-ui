import {DemoConfiguration} from "@config";
import {Disabled, SelectListDemo, SelectLists, WithLabel} from "@stories";
import {SelectList} from "ferns-ui";

export const SelectFieldConfiguration: DemoConfiguration = {
  name: "Select field",
  component: SelectList,
  related: ["Checkbox", "Radio field"],
  description: "Displays a list of actions or options using the browser’s native select.",
  a11yNotes: ["The list should be labeled so that screen readers know that the list is related."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23563&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SelectFieldProps",
  usage: {
    do: ["Present users with a list of options.", "Allow users to choose one option."],
    doNot: [
      "When more than 10 options are needed, consider using another component instead.",
      "If two or more choices are allowed, use the checkbox field.",
      "If fewer than 4 choices are needed, consider using a Radio field instead.",
    ],
  },
  props: {},
  demo: SelectListDemo,
  demoOptions: {},
  stories: {
    "Select Lists": {render: SelectLists},
    "Select List Label": {render: WithLabel},
    "Select List Disabled": {render: Disabled},
  },
};
