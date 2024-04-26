import {Box, Heading, HeadingProps} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const renderText = (text: string, props: Partial<HeadingProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Heading {...props}>{text}</Heading>
    </Box>
  );
};

export const HeadingStories = {
  title: "Heading",
  component: Heading,
  stories: {
    Heading() {
      return (
        <StorybookContainer>
          {renderText("Default Heading - h1", {})}
          {renderText("medium - h2", {size: "md"})}
          {renderText("small - h3", {size: "sm"})}
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
    },
  },
};
