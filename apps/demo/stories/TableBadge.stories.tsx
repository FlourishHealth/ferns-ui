import {DemoConfiguration} from "@config";
import {Table} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

export const TableBadgeConfiguration: DemoConfiguration = {
  name: "Table badge",
  component: Table,
  related: ["Table"],
  description: "Use the table badges to create easily scannable tags for a record.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24165&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TableBadgeProps",
  usage: {
    do: ["Use the preset badge styles."],
    doNot: ["Do not create new badge styles without consulting the head of product."],
  },
  props: {},
  demo: () => <DefaultDemo />,
  demoOptions: {},
  stories: {},
};
