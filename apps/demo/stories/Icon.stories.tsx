import {Box, Icon, IconProps, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const IconDemo = (props: Partial<IconProps>) => (
  <Box alignItems="center" direction="row" justifyContent="center" padding={6}>
    <Icon iconName="triangle-exclamation" size="xl" {...props} />
  </Box>
);

export const SolidIcons = (
  <StorybookContainer>
    <Box
      direction="row"
      display="flex"
      height="100%"
      justifyContent="between"
      maxWidth={300}
      width="100%"
    >
      <Icon iconName="heart" />
      <Icon iconName="plus" />
      <Icon iconName="pencil" />
      <Icon iconName="heart" />
    </Box>
  </StorybookContainer>
);

export const IconStyles = (
  <StorybookContainer>
    <Box padding={6}>
      <Text>Solid</Text>
      <Icon iconName="heart" size="xl" type="solid" />
    </Box>
    <Box padding={6}>
      <Text>Regular</Text>
      <Icon iconName="heart" size="xl" type="regular" />
    </Box>
  </StorybookContainer>
);

export const IconSizes = (
  <StorybookContainer>
    <Box
      direction="row"
      display="flex"
      height="100%"
      justifyContent="between"
      maxWidth={300}
      width="100%"
    >
      <Icon iconName="heart" size="xs" type="solid" />
      <Icon iconName="heart" size="xs" type="regular" />

      <Icon iconName="heart" size="sm" type="solid" />
      <Icon iconName="heart" size="sm" type="regular" />

      <Icon iconName="heart" size="md" type="solid" />
      <Icon iconName="heart" size="md" type="regular" />

      <Icon iconName="heart" size="lg" type="solid" />
      <Icon iconName="heart" size="lg" type="regular" />

      <Icon iconName="heart" size="xl" type="solid" />
      <Icon iconName="heart" size="xl" type="regular" />
    </Box>
  </StorybookContainer>
);
