import {DemoConfiguration} from "@config";
import {SelectBadgeDemo, SelectBadgeStories} from "@stories";
import {SelectBadge} from "ferns-ui";
import React from "react";

export const SelectBadgeConfiguration: DemoConfiguration = {
  name: "SelectBadge",
  related: [],
  description:
    "SelectBadge is an interactive badge that can open a dropdown with selectable options.",
  category: "Component",
  component: SelectBadge,
  status: {
    documentation: "planned",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23330&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  usage: {
    do: [
      "Use to show status and allow selecting one or more options",
      "Use consistent colors for each status type",
      "Use concise option labels",
    ],
    doNot: ["Overload with too many options", "Use for non-interactive status-only indicators"],
  },
  a11yNotes: [
    "Ensure options are accessible via screen readers",
    "Do not rely solely on color to convey meaning",
  ],
  interfaceName: "SelectBadgeProps",
  props: {},
  demo: SelectBadgeDemo,
  demoOptions: {
    size: "md",
    controls: {
      status: {
        type: "select",
        options: [
          {label: "Info", value: "info"},
          {label: "Error", value: "error"},
          {label: "Warning", value: "warning"},
          {label: "Success", value: "success"},
          {label: "Neutral", value: "neutral"},
        ],
        defaultValue: "info",
      },
      secondary: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
  stories: {
    SelectBadges: {
      description: "",
      render: () => <SelectBadgeStories />,
    },
  },
};
