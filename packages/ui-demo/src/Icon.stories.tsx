import { Box, Icon, IconExpo } from "ferns-ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const IconStories = {
  title: "Icon",
  component: Icon,
  stories: {
    "Solid Icons": function () {
      return (
        <StorybookContainer>
          <Box
            direction="row"
            display="flex"
            height="100%"
            justifyContent="between"
            width="100%"
          >
            <IconExpo name="heart" prefix="fas" />
            <Icon name="plus" prefix="fas" />
            <Icon name="edit" prefix="fas" />
          </Box>
        </StorybookContainer>
      );
    },
    "Regular Icons": function () {
      return (
        <StorybookContainer>
          <Box
            direction="row"
            display="flex"
            height="100%"
            justifyContent="between"
            width="100%"
          >
            <Icon name="heart" prefix="far" />
            <Icon name="plus" prefix="far" />
            <Icon name="edit" prefix="far" />
            <Icon name="heart" prefix="far" />
          </Box>
        </StorybookContainer>
      );
    },
    "Icon Sizes": function () {
      return (
        <StorybookContainer>
          <Box
            direction="row"
            display="flex"
            height="100%"
            justifyContent="between"
            width="100%"
          >
            <Icon name="heart" prefix="fas" size={8} />
            <Icon name="heart" prefix="far" size={8} />

            <Icon name="heart" prefix="fas" size={12} />
            <Icon name="heart" prefix="far" size={12} />

            <Icon name="heart" prefix="fas" size={15} />
            <Icon name="heart" prefix="far" size={15} />

            <Icon name="heart" prefix="fas" size={22} />
            <Icon name="heart" prefix="far" size={22} />

            <Icon name="heart" prefix="fas" size={28} />
            <Icon name="heart" prefix="far" size={28} />
          </Box>
        </StorybookContainer>
      );
    },
  },
};
