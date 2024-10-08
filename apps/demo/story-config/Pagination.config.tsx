import {DemoConfiguration} from "@config";
import {Pagination} from "ferns-ui";

import {PaginationDemo, PaginationMoreStory, PaginationStory} from "../stories";

export const PaginationConfiguration: DemoConfiguration = {
  name: "Pagination",
  component: Pagination,
  related: ["Top navigation", "Bottom navigation"],
  description:
    "Break large sets of content into smaller, manageable pages. Used primarily in the staff portal to parse large tables.",
  a11yNotes: ["The tappable area of each pagination item should fit within a 44pt square."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=659%3A19120&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [
    {name: "Medium article: 'Pagination do’s & don’ts'", link: "https://medium.com/"},
  ],
  interfaceName: "PaginationProps",
  usage: {
    do: [
      "Use pagination to reduce the resources required when loading data.",
      "Split information across multiple pages.",
    ],
    doNot: ["Use pagination if only one page is needed."],
  },
  props: {},
  demo: PaginationDemo,
  demoOptions: {
    controls: {
      totalPages: {type: "number", defaultValue: 5},
    },
  },
  stories: {
    PaginationSizes: {render: PaginationStory},
    PaginationMore: {render: PaginationMoreStory},
  },
};
