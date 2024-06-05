import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Heading, HeadingProps, TextColor} from "ferns-ui";
import React from "react";
import {View} from "react-native";

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
      {renderText("large - h2", {size: "lg"})}
      {renderText("medium - h3", {size: "md"})}
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

      <View style={{paddingTop: 8, paddingBottom: 8, backgroundColor: "black"}}>
        {renderText("inverted", {color: "inverted"})}
      </View>
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
