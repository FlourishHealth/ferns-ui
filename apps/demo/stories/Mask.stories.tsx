import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Mask, Text} from "ferns-ui";
import React from "react";

import {DefaultDemo} from "./DefaultDemo";

const Rounded = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box color="primary" padding={6} width="100%">
        <Mask rounding={3}>
          <Box
            alignItems="center"
            color="white"
            display="flex"
            height={50}
            justifyContent="center"
            width={50}
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  );
};

const Circle = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box color="primary" padding={6} width="100%">
        <Mask shape="circle">
          <Box
            alignItems="center"
            color="white"
            display="flex"
            height={50}
            justifyContent="center"
            width={50}
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  );
};

const Rounding = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box color="primary" padding={6} width="100%">
        <Mask rounding={1}>
          <Box
            alignItems="center"
            color="white"
            display="flex"
            height={50}
            justifyContent="center"
            width={50}
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  );
};

const Washed = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box color="primary" padding={6} width="100%">
        <Mask rounding={1} wash>
          <Box
            alignItems="center"
            color="white"
            display="flex"
            height={50}
            justifyContent="center"
            width={50}
          >
            <Text color="darkGray">MA</Text>
          </Box>
        </Mask>
      </Box>
    </StorybookContainer>
  );
};

export const MaskConfiguration: DemoConfiguration = {
  name: "Mask",
  component: Mask,
  related: ["Avatar"],
  description:
    "Mask is used to display content in a specific shape. It’s currently not used on the platform, but we might use it eventually.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "notSupported",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "MaskProps",
  usage: {
    do: [],
    doNot: [],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {
    Circle: {render: Circle},
    Rounding: {render: Rounding},
    Washed: {render: Washed},
    Rounded: {render: Rounded},
  },
};
