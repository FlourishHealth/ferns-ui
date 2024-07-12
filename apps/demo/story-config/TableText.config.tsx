import {DemoConfiguration} from "@config";
import {TableTextDemo, TableTextVariants} from "@stories";
import {TableText} from "ferns-ui";

export const TableTextConfiguration: DemoConfiguration = {
  name: "Table Text",
  component: TableText,
  related: ["Table"],
  description: "This component adds a single line of text to the table.",
  a11yNotes: [],
  category: "Component",
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
  interfaceName: "TableTextProps",
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
  demo: TableTextDemo,
  demoOptions: {},
  stories: {
    Variants: {
      render: TableTextVariants,
    },
  },
};
