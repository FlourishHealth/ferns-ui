import {Box, IconButton} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const IconButtonStories = {
  title: "IconButton",
  component: IconButton,
  stories: {
    "Icon Buttons": function () {
      return (
        <StorybookContainer>
          <IconButton
            accessibilityLabel="label"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            onClick={() => {}}
          />
          <IconButton
            accessibilityLabel="label"
            icon="plus"
            iconColor="secondary"
            prefix="fas"
            onClick={() => {}}
          />
          <IconButton
            accessibilityLabel="label"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            onClick={() => {}}
          />
          <IconButton
            accessibilityLabel="label"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            size="xl"
            onClick={() => {}}
          />

          <IconButton
            accessibilityLabel="label"
            bgColor="lightGray"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            onClick={() => {}}
          />
          <IconButton
            accessibilityLabel="label"
            bgColor="gray"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            onClick={() => {}}
          />
          <IconButton
            accessibilityLabel="label"
            bgColor="transparentDarkGray"
            icon="plus"
            iconColor="primary"
            prefix="fas"
            onClick={() => {}}
          />
          <Box color="darkGray" padding={4}>
            <IconButton
              accessibilityLabel="label"
              bgColor="white"
              icon="plus"
              iconColor="primary"
              prefix="fas"
              onClick={() => {}}
            />
          </Box>
        </StorybookContainer>
      );
    },
  },
};
