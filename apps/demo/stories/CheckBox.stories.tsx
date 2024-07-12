import {Box, CheckBox, CheckBoxProps, Heading} from "ferns-ui";
import React from "react";

export const CheckboxDemo = (props: Partial<CheckBoxProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <CheckBox selected {...props} />
    </Box>
  );
};

export const CheckboxSizes = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Small</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox selected size="sm" />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Medium</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox selected size="md" />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Large</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox selected size="lg" />
        </Box>
      </Box>
    </Box>
  );
};

export const CheckboxColors = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Default</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox bgColor="default" selected />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Gold</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox bgColor="gold" selected />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Black</Heading>
        </Box>
        <Box alignItems="center">
          <CheckBox bgColor="black" selected />
        </Box>
      </Box>
    </Box>
  );
};
