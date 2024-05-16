import {AllColors, Box, Pill} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "@components";

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

export const PillStories = {
  title: "Pills",
  component: Pill,
  stories: {
    Pills() {
      return <StorybookContainer>{colors.map((c) => renderPill(c))}</StorybookContainer>;
    },
  },
};
