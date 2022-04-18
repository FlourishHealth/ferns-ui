import { Box, Mask, Text } from "@ferns/ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const MaskStories = {
  title: "Mask",
  component: Mask,
  stories: {
    Rounded() {
      return (
        <StorybookContainer>
          <Box color="primary" padding={6} width="100%">
            <Mask rounding={3}>
              <Box
                alignItems="center"
                color="white"
                display="flex"
                height={50}
                justifyContent="center"
                width={50}
              >
                <Text color="darkGray">MA</Text>
              </Box>
            </Mask>
          </Box>
        </StorybookContainer>
      );
    },
    Circle() {
      return (
        <StorybookContainer>
          <Box color="primary" padding={6} width="100%">
            <Mask shape="circle">
              <Box
                alignItems="center"
                color="white"
                display="flex"
                height={50}
                justifyContent="center"
                width={50}
              >
                <Text color="darkGray">MA</Text>
              </Box>
            </Mask>
          </Box>
        </StorybookContainer>
      );
    },
    Rounding() {
      return (
        <StorybookContainer>
          <Box color="primary" padding={6} width="100%">
            <Mask rounding={1}>
              <Box
                alignItems="center"
                color="white"
                display="flex"
                height={50}
                justifyContent="center"
                width={50}
              >
                <Text color="darkGray">MA</Text>
              </Box>
            </Mask>
          </Box>
        </StorybookContainer>
      );
    },
    Washed() {
      return (
        <StorybookContainer>
          <Box color="primary" padding={6} width="100%">
            <Mask rounding={1} wash>
              <Box
                alignItems="center"
                color="white"
                display="flex"
                height={50}
                justifyContent="center"
                width={50}
              >
                <Text color="darkGray">MA</Text>
              </Box>
            </Mask>
          </Box>
        </StorybookContainer>
      );
    },
  },
};
