import {Box, SurfaceColor, Text} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const colors: SurfaceColor[] = [
  "base",
  "primary",
  "secondaryLight",
  "secondaryDark",
  "secondaryExtraDark",
  "neutral",
  "neutralLight",
  "neutralDark",
  "disabled",
  "error",
  "errorLight",
  "warning",
  "warningLight",
  "success",
  "successLight",
];

export const BoxDemo = () => {
  return (
    <Box direction="row" justifyContent="between">
      <Box color="primary" height={50} rounding="full" width={50}>
        <Text size="lg" />
      </Box>
      <Box color="secondaryLight" height={50} width={50}>
        <Text size="lg" />
      </Box>
      <Box border="activeAccent" color="neutralLight" height={50} rounding="rounded" width={50}>
        <Text size="lg" />
      </Box>
    </Box>
  );
};

export const FlexBox = () => {
  return (
    <StorybookContainer>
      <Box
        alignItems="center"
        color="primary"
        display="flex"
        height={50}
        justifyContent="center"
        marginRight={2}
        rounding="circle"
        width={50}
      >
        <Text size="lg">JG</Text>
      </Box>
      <Box direction="column" paddingX={2}>
        <Text bold>Josh Gachnang</Text>
        <Text>joined 2 years ago</Text>
      </Box>
    </StorybookContainer>
  );
};

export const BoxColors = () => {
  return (
    <StorybookContainer>
      {colors.map((c) => (
        <Box key={c} direction="column" display="flex">
          <Box alignSelf="start" marginBottom={2}>
            <Text align="center">{c}</Text>
          </Box>
          <Box
            key={c}
            alignSelf="start"
            color={c}
            height={50}
            marginBottom={2}
            rounding="circle"
            width={50}
          >
            <Text> </Text>
          </Box>
        </Box>
      ))}
    </StorybookContainer>
  );
};
