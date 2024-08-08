import {Box, Button, Field, Heading, IconButton, SelectField, Text, ThemeContext} from "ferns-ui";
import React, {useContext, useState} from "react";

const darkPrimitives = {
  neutral000: "#1C1C1C",
  neutral050: "#353535",
  neutral100: "#4E4E4E",
  neutral200: "#686868",
  neutral300: "#9A9A9A",
  neutral400: "#B3B3B3",
  neutral500: "#CDCDCD",
  neutral600: "#D9D9D9",
  neutral700: "#E6E6E6",
  neutral800: "#121212",
  neutral900: "#FFFFFF",

  primary000: "#013749",
  primary050: "#004B64",
  primary100: "#035D7E",
  primary200: "#0A7092",
  primary300: "#0086B3",
  primary400: "#0E9DCD",
  primary500: "#40B8E0",
  primary600: "#73CAE8",
  primary700: "#90D8F0",
  primary800: "#BCE9F7",
  primary900: "#EBFAFF",

  secondary000: "#041E27",
  secondary050: "#092E3A",
  secondary100: "#0F3D4D",
  secondary200: "#1C4E5F",
  secondary300: "#2B6072",
  secondary400: "#608997",
  secondary500: "#87A1AA",
  secondary600: "#9EB7BF",
  secondary700: "#B6CDD5",
  secondary800: "#D7E5EA",
  secondary900: "#F2F9FA",

  accent000: "#332400",
  accent050: "#543C00",
  accent100: "#956A00",
  accent200: "#B58201",
  accent300: "#D69C0E",
  accent400: "#E5B132",
  accent500: "#F2CB62",
  accent600: "#F7D582",
  accent700: "#F9E0A1",
  accent800: "#FCECC2",
  accent900: "#FFFDF7",

  error000: "#BD1111",
  error100: "#D33232",
  error200: "#FDD7D7",

  warning000: "#B14202",
  warning100: "#F36719",
  warning200: "#FFE3C6",

  success000: "#1A7F36",
  success100: "#3EA45C",
  success200: "#DCF2E2",

  spacing0: 0,
  spacing1: 4,
  spacing2: 8,
  spacing3: 12,
  spacing4: 16,
  spacing5: 24,
  spacing6: 32,
  spacing7: 40,
  spacing8: 48,
  spacing9: 56,
  spacing10: 64,
  spacing11: 72,
  spacing12: 80,

  radiusSm: 1,
  radiusMd: 3,
  radiusLg: 16,
  radiusXl: 32,
  radius2xl: 128,
  radius3xl: 360,
};

export const ThemeComponentStories = () => {
  const [themeName, setThemeName] = useState<"default" | "pink" | "dark">("default");
  const {resetTheme, setPrimitives} = useContext(ThemeContext);

  return (
    <Box
      color="base"
      direction="column"
      display="flex"
      justifyContent="around"
      marginLeft={2}
      marginTop={12}
      padding={4}
      width={300}
    >
      <Box paddingY={2}>
        <SelectField
          options={[
            {label: "Default", value: "default"},
            {label: "Pink", value: "pink"},
            {label: "Dark", value: "dark"},
          ]}
          value={themeName}
          onChange={(value: any) => {
            setThemeName(value);
            if (value === "pink") {
              setPrimitives({
                primary400: "#e0218a",
                secondary100: "#ed5c9b",
                secondary500: "#f18dbc",
              });
            } else if (value === "dark") {
              setPrimitives(darkPrimitives);
            } else {
              resetTheme();
            }
          }}
        />
      </Box>
      <Box>
        <Heading>Heading</Heading>
        <Text>Text</Text>
      </Box>
      <Box paddingY={1}>
        <Button text="primary" variant="primary" onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button text="secondary" variant="secondary" onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button text="muted" variant="muted" onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button text="outline" variant="outline" onClick={() => {}} />
      </Box>
      <Box paddingY={1}>
        <Button text="destructive" variant="destructive" onClick={() => {}} />
      </Box>
      <Box direction="row" justifyContent="between" paddingY={2} width="100%">
        <IconButton
          accessibilityLabel=""
          iconName="spaghetti-monster-flying"
          variant="primary"
          onClick={() => {}}
        />
        <IconButton
          accessibilityLabel=""
          iconName="user-astronaut"
          variant="secondary"
          onClick={() => {}}
        />
        <IconButton accessibilityLabel="" iconName="soap" variant="secondary" onClick={() => {}} />
        <IconButton
          accessibilityLabel=""
          iconName="people-roof"
          variant="secondary"
          onClick={() => {}}
        />
      </Box>
    </Box>
  );
};

// TODO: Font change story is not working
export const ThemeFontStories = () => {
  const [font, setFont] = useState<string | undefined>();
  const {resetTheme, setTheme} = useContext(ThemeContext);
  const fonts = ["Comfortaa-Light", "Comfortaa-Bold", "IMFellEnglishSC", "DancingScript-Regular"];

  return (
    <Box
      color="base"
      direction="column"
      display="flex"
      height={300}
      justifyContent="around"
      padding={4}
      width={300}
    >
      <SelectField
        options={fonts.map((f) => ({label: f, value: f}))}
        value={font}
        onChange={(value: string | undefined) => {
          if (!value) {
            resetTheme();
            return;
          }
          setFont(value);
          setTheme({
            font: {
              primary: value,
              title: value,
            },
          });
        }}
      />
      <Heading>This is a heading</Heading>
      <Text>This is some text in a new font</Text>
      <Text bold>And some bolded text in a new font</Text>
      <Button text="Some Button Text" variant="primary" onClick={() => {}} />
      <Field
        helperText="Here's some help text"
        placeholder="Placeholder text"
        title="Text Field"
        type="text"
        value=""
        onChange={(): void => {}}
      />
    </Box>
  );
};
