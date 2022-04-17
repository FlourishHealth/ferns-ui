import React from "react";
import {Box} from "@ferns/ui"
import {AllColors} from "@ferns/ui"
import {Pill} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

const renderPill = (color: AllColors) => (
  <Box display="flex" direction="row" alignItems="center" paddingY={1}>
    <Box marginRight={2}>
      <Pill text={color} color={color} onClick={() => {}} />
    </Box>
    <Pill text={color} color={color} onClick={() => {}} enabled={true} />
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

storiesOf("Pills", module).add("Pills", () => (
  <StorybookContainer>{colors.map((c) => renderPill(c))}</StorybookContainer>
));
