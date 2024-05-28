import {DemoConfiguration} from "@config";
import {TableDate} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const TableDateConfiguration: DemoConfiguration = {
  name: "Table date",
  component: TableDate, // Replace with actual component reference
  related: ["Table"],
  description:
    "This field displays a date. There are two kinds, annotated and default. The annotated date shows an annotation - ex, '10 days ago'.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24129&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableDateProps",
  usage: {
    do: [
      "Use this field to display a date.",
      "Use the annotated version to display a date that has an immediacy relevancy (for example, a hospital visit that was 10 days ago).",
    ],
    doNot: [
      "Do not use the annotated version for recurring, immediately irrelevant dates. For example, birthdays.",
    ],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
};
