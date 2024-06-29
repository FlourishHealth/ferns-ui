import {DemoConfiguration} from "@config";
import {TableBooleanDemo, TableBooleanStates} from "@stories";
import {TableBoolean} from "ferns-ui";

export const TableBooleanConfiguration: DemoConfiguration = {
  name: "Table boolean",
  component: TableBoolean,
  related: ["Table"],
  description: "Use the table boolean to create easily scannable binary information for a user.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24153&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableBooleanProps",
  usage: {
    do: ["Use this field to represent a binary. Has/has not, for example."],
    doNot: ["Do not use this to represent data that’s not a true binary."],
  },
  props: {},
  demo: TableBooleanDemo,
  demoOptions: {
    controls: {
      value: {
        type: "boolean",
        defaultValue: true,
      },
      isEditing: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    States: {
      render: TableBooleanStates,
    },
  },
};
