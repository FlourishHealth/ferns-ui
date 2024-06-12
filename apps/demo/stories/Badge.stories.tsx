import {DemoConfiguration} from "@config";
import {Badge, BadgeProps, Box, Heading, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BadgeDemo = (props: Partial<BadgeProps>) => {
  return (
    <Box direction="row" paddingY={2}>
      <Text>Some Text</Text>
      <Badge title="Failed" type="error" {...props} />
    </Box>
  );
};

function badgeLine(text: string, badgeProps: any) {
  return (
    <Box direction="row" paddingY={2}>
      <Text>{text}</Text>
      <Badge {...badgeProps} />
    </Box>
  );
}

export const BadgeStories = () => {
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
};

export const BadgeConfiguration: DemoConfiguration = {
  name: "Badge",
  related: [],
  description:
    "Badge is a label that indicates status or importance. Badges should provide quick recognition.\n",
  category: "Component",
  component: Badge,
  status: {
    documentation: "planned",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23330&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  usage: {
    do: [
      "Use badges to bring awareness to a specific element or feature",
      "Use the colors to indicate urgency for scannability",
      "Keep the language simple; this should be microcopy",
      "Align the badge to the top of titles, or center align for base text",
      "Choose a color style (bold or light) for each kind of badge and stick with it. For example, all “needs interpreter” badges should share the same style\n",
    ],
    doNot: [
      "Use badges over photos or other colored media",
      "Use multiple lines of text",
      "Use different badge styles for the same kind of badge. For example, alternating between light and dark for “needs interpreter”\n",
    ],
  },
  a11yNotes: [
    "Screen readers can easily read badge elements, so no additional props are needed",
    "Make sure that the text can demonstrate sentiment/urgency clearly enough to be understood without relying on color alone.",
  ],
  interfaceName: "BadgeProps",
  props: {},
  demo: BadgeDemo,
  demoOptions: {
    size: "md",
    controls: {
      title: {
        type: "text",
        defaultValue: "Some Text",
      },
      type: {
        type: "select",
        options: [
          {label: "Info", value: "info"},
          {label: "Error", value: "error"},
          {label: "Warning", value: "warning"},
          {label: "Success", value: "success"},
          {label: "Neutral", value: "neutral"},
          {label: "Custom", value: "custom"},
        ],
        defaultValue: "info",
      },
    },
  },
  stories: {
    Badges: {
      description: "",
      render: () => <BadgeStories />,
    },
  },
};
