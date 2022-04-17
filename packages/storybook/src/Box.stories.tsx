import React from "react";
import {Box} from "@ferns/ui"
import {AllColors} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {Text} from "@ferns/ui"
import {StorybookContainer} from "./StorybookContainer"

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

storiesOf("Box", module)
  .add("FlexBox", () => (
    <StorybookContainer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={50}
        height={50}
        rounding="circle"
        color="blue"
        marginRight={2}
      >
        <Text size="lg">JG</Text>
      </Box>
      <Box paddingX={2} direction="column">
        <Text weight="bold">Josh Gachnang</Text>
        <Text>joined 2 years ago</Text>
      </Box>
    </StorybookContainer>
  ))
  .add("Box Colors", () => (
    <StorybookContainer>
      {colors.map((c) => (
        <Box key={c} display="flex" direction="column">
          <Box marginBottom={2}>
            <Text align="center">{c}</Text>
          </Box>
          <Box key={c} color={c} rounding="circle" height={50} width={50}>
            <Text> </Text>
          </Box>
        </Box>
      ))}
    </StorybookContainer>
  ));
