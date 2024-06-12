import {Box, Text, TextColor, TextProps} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const renderText = (text: string, props: Partial<TextProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Text {...props}>{text}</Text>
    </Box>
  );
};

export const Texts = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box direction="column" display="flex" height="100%" width="100%">
        {renderText("default", {})}
        {renderText("small", {size: "sm"})}
        {renderText("large", {size: "lg"})}
        {[
          "primary",
          "secondaryLight",
          "extraLight",
          "secondaryDark",
          "link",
          "linkLight",
          "accent",
          "error",
          "warning",
          "success",
        ].map((color) => renderText(color, {color: color as TextColor}))}

        {renderText("bold", {weight: "bold"})}
        {renderText("italic", {italic: true})}
        {renderText("bold italic", {italic: true, weight: "bold"})}
        {renderText("bold italic accent", {italic: true, weight: "bold", color: "accent"})}

        {renderText("center", {align: "center"})}
      </Box>
    </StorybookContainer>
  );
};

export const Truncate = (): React.ReactElement => {
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
};

export const TextLinks = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box direction="column" display="flex" height="100%" width="100%">
        <Text>Go to google: https://google.com they have stuff.</Text>
        <Text>Here is my email: josh@example.com.</Text>
        <Text skipLinking>No link here: https://google.com.</Text>
      </Box>
    </StorybookContainer>
  );
};
