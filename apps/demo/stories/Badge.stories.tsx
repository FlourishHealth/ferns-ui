import {Badge, BadgeProps, Box, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BadgeDemo = (props: Partial<BadgeProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <Badge iconName="check" status="info" value="Default" {...props} />
    </Box>
  );
};

function badgeLine(text: string, badgeProps: Partial<BadgeProps>) {
  return (
    <Box direction="row" paddingY={2}>
      <Box width={100}>
        <Badge iconName="check" {...badgeProps} />
      </Box>
      <Box>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
}

export const BadgeStories = () => {
  return (
    <StorybookContainer>
      <Box direction="column">
        {badgeLine("Default", {value: "Default"})}
        {badgeLine("Icon Only", {variant: "iconOnly"})}
        {badgeLine("Number Only", {variant: "numberOnly", value: "10"})}
        {badgeLine("Secondary Default", {secondary: true, value: "Default"})}
        {badgeLine("Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
        })}
        {badgeLine("Secondary Number Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
        })}

        {badgeLine("Error", {value: "Failed", status: "error"})}
        {badgeLine("Error Icon Only", {variant: "iconOnly", value: "Failed", status: "error"})}
        {badgeLine("Error Number Only", {variant: "numberOnly", value: "10", status: "error"})}
        {badgeLine("Error Secondary", {secondary: true, value: "Failed", status: "error"})}
        {badgeLine("Error Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "error",
        })}
        {badgeLine("Error Secondary Number Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "error",
        })}

        {badgeLine("Warning", {value: "Failed", status: "warning"})}
        {badgeLine("Warning Icon Only", {variant: "iconOnly", value: "Failed", status: "warning"})}
        {badgeLine("Warning Number Only", {variant: "numberOnly", value: "10", status: "warning"})}
        {badgeLine("Warning Secondary", {secondary: true, value: "Failed", status: "warning"})}
        {badgeLine("Warning Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "warning",
        })}
        {badgeLine("Warning Secondary Number Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "warning",
        })}
        {badgeLine("Success", {value: "Failed", status: "success"})}
        {badgeLine("Success Icon Only", {variant: "iconOnly", value: "Failed", status: "success"})}
        {badgeLine("Success Number Only", {variant: "numberOnly", value: "10", status: "success"})}
        {badgeLine("Success Secondary", {secondary: true, value: "Failed", status: "success"})}
        {badgeLine("Success Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "success",
        })}
        {badgeLine("Success Secondary Number Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "success",
        })}
        {badgeLine("Neutral", {value: "Failed", status: "neutral"})}
        {badgeLine("Neutral Icon Only", {variant: "iconOnly", value: "Failed", status: "neutral"})}
        {badgeLine("Neutral Number Only", {variant: "numberOnly", value: "10", status: "neutral"})}
        {badgeLine("Neutral Secondary", {secondary: true, value: "Failed", status: "neutral"})}
        {badgeLine("Neutral Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "neutral",
        })}
        {badgeLine("Neutral Secondary Nubmer Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "neutral",
        })}

        {badgeLine("Custom", {
          value: "Custom",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
          customTextColor: "#FFFFFF",
        })}
        {badgeLine("Custom Icon Only", {
          variant: "iconOnly",
          value: "Failed",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
        })}
        {badgeLine("Custom Number Only", {
          variant: "numberOnly",
          value: "10",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
        })}
        {badgeLine("Custom Secondary", {
          secondary: true,
          value: "Failed",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
        })}
        {badgeLine("Custom Secondary Icon Only", {
          secondary: true,
          variant: "iconOnly",
          value: "Failed",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
        })}
        {badgeLine("Custom Secondary Nubmer Only", {
          secondary: true,
          variant: "numberOnly",
          value: "5",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
        })}
        {badgeLine("Custom Secondary Font And Border", {
          secondary: true,
          value: "Very Custom!",
          status: "custom",
          customBackgroundColor: "#FFA6C9",
          customBorderColor: "#6600CC",
          customTextColor: "#6600CC",
          customIconColor: "success",
          customIconName: "user-astronaut",
        })}
      </Box>
    </StorybookContainer>
  );
};
