import {Badge, BadgeProps, Box, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BadgeDemo = (props: Partial<BadgeProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <Badge iconName="check" status="info" value="Default" variant="text" {...props} />
    </Box>
  );
};

function badgeLine(text: string, badgeProps: any) {
  return (
    <Box direction="row" paddingY={2}>
      <Box marginRight={2}>
        <Text>{text}</Text>
      </Box>
      <Badge iconName="check" {...badgeProps} />
    </Box>
  );
}

export const BadgeStories = () => {
  return (
    <StorybookContainer>
      <Box direction="column">
        {badgeLine("Default", {value: "Default"})}
        {badgeLine("Default Secondary", {variant: "iconOnly"})}
        {badgeLine("Default", {variant: "numberOnly", value: "10"})}
        {badgeLine("Default Secondary", {secondary: true, value: "Default"})}
        {badgeLine("Default", {
          secondary: true,
          variant: "iconOnly",
        })}
        {badgeLine("Default Secondary", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
        })}

        {badgeLine("Error", {value: "Failed", status: "error"})}
        {badgeLine("Error Secondary", {variant: "iconOnly", value: "Failed", status: "error"})}
        {badgeLine("Error", {variant: "numberOnly", value: "10", status: "error"})}
        {badgeLine("Error Secondary", {secondary: true, value: "Failed", status: "error"})}
        {badgeLine("Error", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "error",
        })}
        {badgeLine("Error Secondary", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "error",
        })}

        {badgeLine("Warning", {value: "Failed", status: "warning"})}
        {badgeLine("Warning Secondary", {variant: "iconOnly", value: "Failed", status: "warning"})}
        {badgeLine("Warning", {variant: "numberOnly", value: "10", status: "warning"})}
        {badgeLine("Warning Secondary", {secondary: true, value: "Failed", status: "warning"})}
        {badgeLine("Warning", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "warning",
        })}
        {badgeLine("Warning Secondary", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "warning",
        })}
        {badgeLine("Success", {value: "Failed", status: "success"})}
        {badgeLine("Success Secondary", {variant: "iconOnly", value: "Failed", status: "success"})}
        {badgeLine("Success", {variant: "numberOnly", value: "10", status: "success"})}
        {badgeLine("Success Secondary", {secondary: true, value: "Failed", status: "success"})}
        {badgeLine("Success", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "success",
        })}
        {badgeLine("Success Secondary", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "success",
        })}
        {badgeLine("Neutral", {value: "Failed", status: "neutral"})}
        {badgeLine("Neutral Secondary", {variant: "iconOnly", value: "Failed", status: "neutral"})}
        {badgeLine("Neutral", {variant: "numberOnly", value: "10", status: "neutral"})}
        {badgeLine("Neutral Secondary", {secondary: true, value: "Failed", status: "neutral"})}
        {badgeLine("Neutral", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "neutral",
        })}
        {badgeLine("Neutral Secondary", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "neutral",
        })}
      </Box>
    </StorybookContainer>
  );
};
