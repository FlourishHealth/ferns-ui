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
export const BadgeStories = {
  title: "Badge",
  component: Badge,
  stories: {
    Badges() {
      return (
        <StorybookContainer>
          <Box direction="column" display="flex" height="100%" width="100%">
            <Box direction="row" paddingY={2}>
              <Badge title="default" />
            </Box>
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
            <Box direction="row" paddingY={2}>
              <Badge iconProps={{name: "check"}} position="top" title="XS W ICON" type="success" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge iconProps={{name: "check"}} size="sm" title="SM W ICON" type="success" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge iconProps={{name: "check"}} size="md" title="MD W ICON" type="success" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge iconProps={{name: "check"}} size="lg" title="LG W ICON" type="success" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge position="top" rounding="pill" title="XS PILL" type="info" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge rounding="pill" size="sm" title="SM PILL" type="info" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge rounding="pill" size="md" title="MD PILL" type="info" />
            </Box>
            <Box direction="row" paddingY={2}>
              <Badge rounding="pill" size="lg" title="LG PILL" type="info" />
            </Box>
          </Box>
        </StorybookContainer>
      );
    },
  },
};
