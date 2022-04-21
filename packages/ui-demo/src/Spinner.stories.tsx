import { Box, Spinner } from "ferns-ui";
import React from "react";

export const SpinnerStories = {
  title: "Spinner",
  component: Spinner,
  stories: {
    Small() {
      return (
        <Box width="100%">
          <Spinner size="sm" />
        </Box>
      );
    },
    Big() {
      return (
        <Box display="flex">
          <Spinner size="md" />
        </Box>
      );
    },
    Dark() {
      return (
        <Box color="darkGray" paddingY={6}>
          <Spinner color="white" />
        </Box>
      );
    },
  },
};
