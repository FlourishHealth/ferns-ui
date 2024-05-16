import {Box, Text, TextProps} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "@components";
const renderText = (text: string, props: Partial<TextProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Text {...props}>{text}</Text>
    </Box>
  );
};

export const TextStories = {
  title: "Text",
  component: Text,
  stories: {
    Texts() {
      return (
        <StorybookContainer>
          <Box direction="column" display="flex" height="100%" width="100%">
            {renderText("default", {})}
            {renderText("small", {size: "sm"})}
            {renderText("large", {size: "lg"})}
            {renderText("gray", {color: "gray"})}
            {renderText("lightGray", {color: "lightGray"})}
            {renderText("primary", {color: "primary"})}
            {renderText("secondary", {color: "secondary"})}
            {renderText("tertiary", {color: "tertiary"})}
            {renderText("accent", {color: "accent"})}
            {renderText("red", {color: "red"})}
            {renderText("bold", {weight: "bold"})}
            {renderText("italic", {italic: true})}
            {renderText("center", {align: "center"})}
          </Box>
        </StorybookContainer>
      );
    },
    Truncate() {
      return (
        <StorybookContainer>
          <Box maxWidth={160}>
            <Box marginBottom={2}>
              <Text weight="bold">normal:</Text>
              <Text>
                This is a long and Supercalifragilisticexpialidocious sentence.
                次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉&#39;
              </Text>
            </Box>
            <Box marginBottom={2}>
              <Text weight="bold">truncate:</Text>
              <Text truncate>
                This is a long and Supercalifragilisticexpialidocious sentence.
                次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
              </Text>
            </Box>
          </Box>
        </StorybookContainer>
      );
    },
    TextLinks() {
      return (
        <StorybookContainer>
          <Box direction="column" display="flex" height="100%" width="100%">
            <Text>Go to google: https://google.com they have stuff.</Text>
            <Text>Here is my email: josh@example.com.</Text>
            <Text skipLinking>No link here: https://google.com.</Text>
          </Box>
        </StorybookContainer>
      );
    },
  },
};
