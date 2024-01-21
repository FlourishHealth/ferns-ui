import {Box, Chip, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const ChipStories = {
  title: "Chip",
  component: Chip,
  stories: {
    Chip() {
      return (
        <StorybookContainer>
          <Box padding={2}>
            <Text weight="bold">Default</Text>
            <Chip label="Default Chip" />
          </Box>
          <Box padding={2}>
            <Text weight="bold">With Icon & Label</Text>
            <Chip bgColor="warning" iconName="frown" label="Icon & Label" />
          </Box>
          <Box padding={2}>
            <Text weight="bold">With Icon</Text>
            <Chip bgColor="success" iconName="check" />
          </Box>
        </StorybookContainer>
      );
    },
  },
};
