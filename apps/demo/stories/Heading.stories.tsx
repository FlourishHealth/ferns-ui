import {StorybookContainer} from "@components";
import {Box, Heading, HeadingProps, TextColor} from "ferns-ui";
import React from "react";
import {View} from "react-native";

export const renderHeadingText = (text: string, props: Partial<HeadingProps>) => {
  return (
    <Box paddingY={1} width="100%">
      <Heading {...props}>{text}</Heading>
    </Box>
  );
};

export const Headings = (): React.ReactElement => {
  return (
    <StorybookContainer>
      {renderHeadingText("Default Heading/sm - h4", {})}
      {renderHeadingText("xl - h1", {size: "xl"})}
      {renderHeadingText("large - h2", {size: "lg"})}
      {renderHeadingText("medium - h3", {size: "md"})}
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
      ].map((color) => renderHeadingText(color, {color: color as TextColor}))}

      <View style={{paddingTop: 8, paddingBottom: 8, backgroundColor: "black"}}>
        {renderHeadingText("inverted", {color: "inverted"})}
      </View>
      {renderHeadingText("center", {align: "center"})}
    </StorybookContainer>
  );
};
