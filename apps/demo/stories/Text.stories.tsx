import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Text, TextColor, TextProps} from "ferns-ui";
import React from "react";

const renderText = (text: string, props: Partial<TextProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Text {...props}>{text}</Text>
    </Box>
  );
};

const Texts = (): React.ReactElement => {
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

const Truncate = (): React.ReactElement => {
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

const TextLinks = (): React.ReactElement => {
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

export const TextConfiguration: DemoConfiguration = {
  name: "Text",
  component: Text, // Replace with actual component reference
  related: ["Paragraph"],
  description: "",
  a11yNotes: [""],
  category: ["Data Entry", "Form"],
  status: {
    documentation: "ready",
    figma: "inProgress",
    figmaLink: "",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TextProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: (props: TextProps & {text: string}) => {
    const {text, ...rest} = props;
    return renderText(text, rest);
  },
  demoOptions: {},
  stories: {
    Texts: {render: Texts},
    Truncate: {render: Truncate},
    TextLinks: {render: TextLinks},
  },
};
