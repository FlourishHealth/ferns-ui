import {DemoConfiguration} from "@config";
import {SortableExpandableTableStory, StandardTable} from "@stories";
import {Table} from "ferns-ui";

export const TableConfiguration: DemoConfiguration = {
  name: "Table",
  component: Table,
  related: [
    "Table badge",
    "Table boolean",
    "Table date",
    "Table icon button",
    "Table number",
    "Table text field",
  ],
  description:
    "In this case, Table is a pattern, not a component. Build a table by sorting the table component items into rows. Each row should have an alternating color.",
  a11yNotes: [
    "Use a label to announce the content of the table.",
    "Don’t include the word 'table' in that label, as it’s redundant.",
    "The tab key should place focus on interactive elements, including sortable headers.",
  ],
  category: "Pattern",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24283&mode=design&t=iCiJI3xbrm6rrXPg-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "TableProps",
  usage: {
    do: [
      "Display structured data in a scannable way.",
      "Allow users to compare information in rows and columns.",
      "Keep scannability in mind whenever designing new components for this pattern.",
    ],
    doNot: [
      "Don’t use this if there will never be enough data to populate more than two rows.",
      "Display content that can’t be reasonably sorted and compared.",
    ],
  },
  props: {},
  demo: StandardTable,
  demoOptions: {},
  stories: {
    Standard: {render: StandardTable},
    SortableExpandable: {render: SortableExpandableTableStory},
  },
};
