import { AllColors, Box, Text } from "@ferns/ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

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

export const BoxStories = {
  title: "Box",
  component: Box,
  stories: {
    FlexBox() {
      return (
        <StorybookContainer>
          <Box
            alignItems="center"
            color="blue"
            display="flex"
            height={50}
            justifyContent="center"
            marginRight={2}
            rounding="circle"
            width={50}
          >
            <Text size="lg">JG</Text>
          </Box>
          <Box direction="column" paddingX={2}>
            <Text weight="bold">Josh Gachnang</Text>
            <Text>joined 2 years ago</Text>
          </Box>
        </StorybookContainer>
      );
    },
    BoxColors() {
      return (
        <StorybookContainer>
          {colors.map((c) => (
            <Box key={c} direction="column" display="flex">
              <Box marginBottom={2}>
                <Text align="center">{c}</Text>
              </Box>
              <Box key={c} color={c} height={50} rounding="circle" width={50}>
                <Text> </Text>
              </Box>
            </Box>
          ))}
        </StorybookContainer>
      );
    },
  },
};
