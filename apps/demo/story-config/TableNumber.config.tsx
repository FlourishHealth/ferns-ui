import {DemoConfiguration} from "@config";
import {TableNumber} from "ferns-ui";

import {TableNumberDemo} from "../stories/TableNumber.stories";

export const TableNumberConfiguration: DemoConfiguration = {
  name: "Table number",
  component: TableNumber, // Replace with actual component reference
  related: ["Table"],
  description:
    "Use this component to display a number on the table that’s NOT a date or a currency.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24177&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableNumberProps",
  usage: {
    do: ["Use this component to display a number."],
    doNot: ["Do not use this component for dates or currency."],
  },
  props: {},
  demo: TableNumberDemo,
  demoOptions: {},
  stories: {
    TableNumber: {render: TableNumberDemo},
  },
};
