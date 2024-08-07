import {DemoConfiguration} from "@config";
import {BadgeDemo, BadgeStories} from "@stories";
import {Badge} from "ferns-ui";
import React from "react";

export const BadgeConfiguration: DemoConfiguration = {
  name: "Badge",
  related: [],
  description:
    "Badge is a label that indicates status or importance. Badges should provide quick recognition.\n",
  category: "Component",
  component: Badge,
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
      "Use badges to bring awareness to a specific element or feature",
      "Use the colors to indicate urgency for scannability",
      "Keep the language simple; this should be microcopy",
      "Align the badge to the top of titles, or center align for base text",
      "Choose a color style (default or secondary) for each kind of badge and stick with it. For example, all “needs interpreter” badges should share the same style\n",
    ],
    doNot: [
      "Use badges over photos or other colored media",
      "Use multiple lines of text",
      "Use different badge styles for the same kind of badge. For example, alternating between default and primary for “needs interpreter”\n",
    ],
  },
  a11yNotes: [
    "Screen readers can easily read badge elements, so no additional props are needed",
    "Make sure that the text can demonstrate sentiment/urgency clearly enough to be understood without relying on color alone.",
  ],
  interfaceName: "BadgeProps",
  props: {},
  demo: BadgeDemo,
  demoOptions: {
    size: "md",
    controls: {
      value: {
        type: "text",
        defaultValue: "Some Text",
      },
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
      variant: {
        type: "select",
        options: [
          {label: "Text", value: "text"},
          {label: "Icon Only", value: "iconOnly"},
          {label: "Number Only", value: "numberOnly"},
        ],
        defaultValue: "text",
      },
      iconName: {
        type: "select",
        options: [
          {label: "check", value: "check"},
          {label: "triangle-exclamation", value: "triangle-exclamation"},
          {label: "heart", value: "heart"},
          {label: "poo-storm", value: "poo-storm"},
          {label: "pencil", value: "pencil"},
        ],
        defaultValue: "check",
      },
      secondary: {
        type: "boolean",
        defaultValue: false,
      },
      maxValue: {
        type: "number",
        defaultValue: "0",
      },
    },
  },
  stories: {
    Badges: {
      description: "",
      render: () => <BadgeStories />,
    },
  },
};
