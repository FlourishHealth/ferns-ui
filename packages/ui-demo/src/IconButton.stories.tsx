import {Box, IconButton} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";
import {action} from "./tools";

export const IconButtonStories = {
  title: "IconButton",
  component: IconButton,
  stories: {
    Colors() {
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
    Confirmation() {
      return (
        <Box padding={4}>
          <IconButton
            accessibilityLabel="Button with plus icon"
            bgColor="gray"
            icon="plus"
            iconColor="white"
            prefix="fas"
            withConfirmation
            onClick={() => {
              action("Clicked!");
            }}
          />
        </Box>
      );
    },
  },
};
