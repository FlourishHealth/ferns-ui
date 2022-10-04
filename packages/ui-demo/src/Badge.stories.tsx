import {Badge, Box, Heading, Text} from "ferns-ui";
import React from "react";

function badgeLine(text: string, badgeProps: any) {
  return (
    <Box direction="row" paddingY={2}>
      <Text>{text}</Text>
      <Badge {...badgeProps} />
    </Box>
  );
}

import {StorybookContainer} from "./StorybookContainer";
export const TextStories = {
  title: "Badge",
  component: Badge,
  stories: {
    Badges() {
      return (
        <StorybookContainer>
          <Box direction="column" display="flex" height="100%" width="100%">
            {badgeLine("Info", {title: "New", type: "info"})}
            {badgeLine("Error", {title: "Failed", type: "error"})}
            {badgeLine("Warning", {title: "Needs attention", type: "warning"})}
            {badgeLine("Info", {title: "Completed", type: "success"})}
            {badgeLine("Info", {title: "Not started", type: "neutral"})}
            {badgeLine("Custom", {title: "Hey! Listen!", type: "custom", color: "primary"})}

            <Box direction="row" paddingY={2}>
              <Text size="lg">Larger Text</Text>
              <Badge title="Failed" type="error" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Heading size="sm">Small Heading</Heading>
              <Badge title="Failed" type="error" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Heading size="md">Heading</Heading>
              <Badge title="Failed" type="error" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Heading size="lg">Biggest Heading</Heading>
              <Badge title="Failed" type="error" />
            </Box>

            <Box direction="row" paddingY={2}>
              <Heading size="sm">Small Heading Top</Heading>
              <Badge position="top" title="Failed" type="error" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Heading size="md">Heading Top</Heading>
              <Badge position="top" title="Failed" type="error" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Heading size="lg">Biggest Heading Top</Heading>
              <Badge position="top" title="Failed" type="error" />
            </Box>
          </Box>
        </StorybookContainer>
      );
    },
  },
};
