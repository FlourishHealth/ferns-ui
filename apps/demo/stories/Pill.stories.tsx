import {DemoConfiguration} from "@config";
import {AllColors, Box, Pill} from "ferns-ui";
import React from "react";

const renderPill = (color: AllColors) => (
  <Box alignItems="center" direction="row" display="flex" paddingY={1}>
    <Box marginRight={2}>
      <Pill color={color} text={color} onClick={() => {}} />
    </Box>
    <Pill color={color} enabled text={color} onClick={() => {}} />
  </Box>
);

const colors: AllColors[] = [
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "blue",
  "darkGray",
  "eggplant",
  "gray",
  "green",
  "lightGray",
  "maroon",
  "midnight",
  "navy",
  "olive",
  "orange",
  "orchid",
  "pine",
  "purple",
  "red",
  "watermelon",
  "white",
  "neutral900",
  "neutral200",
  "neutral70",
  "neutral10",
];

const PillDemo = () => {
  return renderPill("primary");
};

export const PillConfiguration: DemoConfiguration = {
  name: "Pill",
  component: Pill,
  related: ["Filtered items"],
  description:
    "A small, rounded UI element used to represent and display discrete units of information, often styled like a small, capsule-shaped button. Used for tags, filters, or to represent selected items in a list.",
  shortDescription:
    "A small, rounded UI element used to represent and display discrete units of information, often styled like a small, capsule-shaped button.",

  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23430&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "PillProps",
  usage: {
    do: [
      "Use these to indicate that filtering has happened.",
      "Allow the user to 'dismiss' the filter.",
    ],
    doNot: ["Do not remove the rounded corners; the pills would be indistinct from badges."],
  },
  props: {},
  demo: PillDemo,
  demoOptions: {},
  stories: {
    Pills: {render: PillDemo},
  },
};
