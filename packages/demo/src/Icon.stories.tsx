import {Box, Icon, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const IconStories = {
  title: "Icon",
  component: Icon,
  stories: {
    "Solid Icons": function () {
      return (
        <StorybookContainer>
          <Box direction="row" display="flex" height="100%" justifyContent="between" width="100%">
            <Icon name="heart" />
            <Icon name="plus" />
            <Icon name="edit" />
            <Icon name="heart" />
          </Box>
        </StorybookContainer>
      );
    },
    "Icon Styles": function () {
      return (
        <StorybookContainer>
          <Box padding={6}>
            <Text>Regular</Text>
            <Icon name="heart" prefix="far" size="xl" />
          </Box>
          <Box padding={6}>
            <Text>Solid</Text>
            <Icon name="heart" prefix="fas" size="xl" />
          </Box>
        </StorybookContainer>
      );
    },
    "Icon Sizes": function () {
      return (
        <StorybookContainer>
          <Box direction="row" display="flex" height="100%" justifyContent="between" width="100%">
            <Icon name="heart" prefix="fas" size="xs" />
            <Icon name="heart" prefix="far" size="xs" />

            <Icon name="heart" prefix="fas" size="sm" />
            <Icon name="heart" prefix="far" size="sm" />

            <Icon name="heart" prefix="fas" size="md" />
            <Icon name="heart" prefix="far" size="md" />

            <Icon name="heart" prefix="fas" size="lg" />
            <Icon name="heart" prefix="far" size="lg" />

            <Icon name="heart" prefix="fas" size="xl" />
            <Icon name="heart" prefix="far" size="xl" />
          </Box>
        </StorybookContainer>
      );
    },
  },
};
