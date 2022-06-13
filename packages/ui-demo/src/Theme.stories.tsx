import {useFonts} from "expo-font";
import {Box, Button, Heading, Text, Unifier} from "ferns-ui";
import React from "react";

function buttonsForColor(color: "primary" | "secondary" | "accent" | "tertiary") {
  return (
    <>
      <Button color={`${color}Lighter` as any} text="Primary Lighter Ghost" onClick={() => {}} />
      <Button color={`${color}Light` as any} text="Primary Light Ghost" onClick={() => {}} />
      <Button color={color} text="Primary Solid" onClick={() => {}} />
      <Button color={`${color}Dark` as any} text="Primary Dark Ghost" onClick={() => {}} />
      <Button color={`${color}Darker` as any} text="Primary Darker Ghost" onClick={() => {}} />
      <Button color={color} text="Primary Ghost" type="ghost" onClick={() => {}} />
      <Button color={color} text="Primary Outline" type="outline" onClick={() => {}} />
    </>
  );
}

export const ThemeStories = {
  title: "Theme",

  stories: {
    ButtonTheme() {
      Unifier.setTheme({
        primary: "#5c58bb",
        secondary: "#8d58bb",
        tertiary: "#58b3bb",
        // Leaving accent as default
      });
      return (
        <Box direction="column" display="flex" height="100%" justifyContent="around" width="100%">
          {buttonsForColor("primary")}
          {buttonsForColor("secondary")}
          {buttonsForColor("accent")}
          {buttonsForColor("tertiary")}
        </Box>
      );
    },
    FontTheme() {
      Unifier.setTheme({
        primaryFont: "Comfortaa-Light",
        primaryBoldFont: "Comfortaa-Bold",
        buttonFont: "IMFellEnglishSC",
        titleFont: "DancingScript-Regular",
      });
      return (
        <Box
          direction="column"
          display="flex"
          height={300}
          justifyContent="around"
          padding={4}
          width={300}
        >
          <Heading>This is a heading</Heading>
          <Text>This is some text in a new font</Text>
          <Text weight="bold">And some bolded text in a new font</Text>
          <Button color="blue" text="Some Button Text" onClick={() => {}} />
        </Box>
      );
    },
  },
};
