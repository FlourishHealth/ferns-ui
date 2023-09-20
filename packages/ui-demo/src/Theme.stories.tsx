import {Box, Button, Field, Heading, SelectList, Text, ThemeContext, Unifier} from "ferns-ui";
import React, {useContext, useEffect, useState} from "react";

function buttonsForColor(color: "primary" | "secondary" | "accent" | "tertiary") {
  return (
    <>
      <Box paddingY={1}>
        <Button
          color={`${color}Lighter` as any}
          text={`${color} Lighter Ghost`}
          onClick={() => {}}
        />
      </Box>
      <Box paddingY={1}>
        <Button color={`${color}Light` as any} text={`${color} Light Ghost`} onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button color={color} text={`${color} Solid`} onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button color={`${color}Dark` as any} text={`${color} Dark Ghost`} onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button color={`${color}Darker` as any} text={`${color} Darker Ghost`} onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button color={color} text={`${color} Ghost`} type="ghost" onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button color={color} text={`${color} Outline`} type="outline" onClick={() => {}} />
      </Box>
    </>
  );
}

const ButtonStories = () => {
  const [themeName, setThemeName] = useState<"purple" | "pink">("purple");
  const {setTheme} = useContext(ThemeContext);

  useEffect(() => {
    if (themeName === "pink") {
      setTheme({
        primary: "#e0218a",
        secondary: "#ed5c9b",
        tertiary: "#f18dbc",
        // Leaving accent as default
      });
    } else if (themeName === "purple") {
      setTheme({
        primary: "#5c58bb",
        secondary: "#8d58bb",
        tertiary: "#58b3bb",
        // Leaving accent as default
      });
    }
  }, [setTheme, themeName]);
  return (
    <Box
      direction="column"
      display="flex"
      justifyContent="around"
      marginLeft={2}
      marginTop={12}
      width={300}
    >
      <Box paddingY={2}>
        <SelectList
          options={[
            {label: "Pink", value: "pink"},
            {label: "Purple", value: "purple"},
          ]}
          value={themeName}
          onChange={(value) => {
            setThemeName(value as any);
          }}
        />
      </Box>
      {buttonsForColor("primary")}
      {buttonsForColor("secondary")}
      {buttonsForColor("accent")}
      {buttonsForColor("tertiary")}
    </Box>
  );
};

export const ThemeStories = {
  title: "Theme",
  stories: {
    ButtonTheme() {
      return <ButtonStories />;
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
          <Field
            helperText="Here's some help text"
            label="Text Field"
            name="text"
            type="text"
            value="Cannot change"
            onChange={(): void => {}}
          />
        </Box>
      );
    },
  },
};
