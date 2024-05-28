import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Heading, HeadingProps} from "ferns-ui";
import React from "react";

const renderText = (text: string, props: Partial<HeadingProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Heading {...props}>{text}</Heading>
    </Box>
  );
};

const Headings = (): React.ReactElement => {
  return (
    <StorybookContainer>
      {renderText("Default Heading/sm - h4", {})}
      {renderText("xl - h1", {size: "xl"})}
      {renderText("medium - h2", {size: "md"})}
      {renderText("large - h3", {size: "lg"})}
      {renderText("gray", {color: "gray"})}
      {renderText("lightGray", {color: "lightGray"})}
      {renderText("primary", {color: "primary"})}
      {renderText("secondary", {color: "secondary"})}
      {renderText("tertiary", {color: "tertiary"})}
      {renderText("accent", {color: "accent"})}
      {renderText("red", {color: "red"})}
      {renderText("center", {align: "center"})}
    </StorybookContainer>
  );
};

export const HeadingConfiguration: DemoConfiguration = {
  name: "Heading",
  component: Headings, // Replace with actual component reference
  related: ["Title"],
  description: "",
  a11yNotes: [""],
  category: [""],
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink: "",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "HeadingProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: (props: HeadingProps & {text: string}) => {
    const {text, ...rest} = props;
    return renderText(text, rest);
  },
  demoOptions: {},
  stories: {
    Headings: {render: Headings},
  },
};
