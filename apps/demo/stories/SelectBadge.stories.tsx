import {Box, SelectBadge, SelectBadgeProps, Text} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

export const SelectBadgeDemo = (props: Partial<SelectBadgeProps>) => {
  const [value, setValue] = useState("option1");
  const sampleOptions = [
    {label: "Option 1", value: "option1"},
    {label: "Option 2", value: "option2"},
    {label: "Option 3", value: "option3"},
  ];
  return (
    <Box alignItems="center" justifyContent="center">
      <SelectBadge options={sampleOptions} value={value} onChange={setValue} {...props} />
    </Box>
  );
};

const BadgeLine = (text: string, badgeProps: Partial<SelectBadgeProps>) => {
  const [value, setValue] = useState("option1");
  const sampleOptions = [
    {label: "Option 1", value: "option1"},
    {label: "Option 2", value: "option2"},
    {label: "Option 3", value: "option3"},
  ];
  return (
    <Box direction="row" paddingY={2}>
      <Box width={100}>
        <SelectBadge options={sampleOptions} value={value} onChange={setValue} {...badgeProps} />
      </Box>
      <Box>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};

export const SelectBadgeStories = () => {
  return (
    <StorybookContainer>
      <Box direction="column">
        {BadgeLine("Default", {})}
        {BadgeLine("Disabled", {disabled: true})}
        {BadgeLine("Secondary", {secondary: true})}
        {BadgeLine("Error", {status: "error"})}
        {BadgeLine("Warning", {status: "warning"})}
        {BadgeLine("Success", {status: "success"})}
        {BadgeLine("Neutral", {status: "neutral"})}
        {BadgeLine("Custom", {
          status: "custom",
          customBackgroundColor: "#FFD700",
          customTextColor: "#000000",
          customBorderColor: "#007AFF",
        })}
      </Box>
    </StorybookContainer>
  );
};
