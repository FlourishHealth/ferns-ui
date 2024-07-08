import {DemoConfiguration} from "@config";
import {TableIconButtonDemo, TableIconButtonStates} from "@stories";
import {TableIconButton} from "ferns-ui";

export const TableIconButtonConfiguration: DemoConfiguration = {
  name: "Table icon button",
  component: TableIconButton, // Replace with actual component reference
  related: ["Table"],
  description:
    "The table icon button is an interactive element that allows the user to edit record rows, open drawers, and close them.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24189&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableIconButtonProps",
  usage: {
    do: ["Use this component to interact with an entire row."],
    doNot: [
      "Do not use this component to edit a single data set. For example, only the birthday date of the record. Use the date field 'Edit' variant instead.",
    ],
  },
  props: {},
  demo: TableIconButtonDemo,
  demoOptions: {
    controls: {
      tableIconButtonName: {
        type: "select",
        options: [
          {label: "Edit", value: "edit"},
          {label: "Save and Close", value: "saveAndClose"},
          {label: "Insert", value: "insert"},
          {label: "Drawer Open", value: "drawerOpen"},
          {label: "Drawer Close", value: "drawerClose"},
        ],
        defaultValue: "edit",
      },
    },
  },
  stories: {
    States: {
      render: TableIconButtonStates,
    },
  },
};
