import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {AllColors, Box, Text} from "ferns-ui";
import React from "react";

const colors: AllColors[] = [
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "blue",
  "darkGray",
  "eggplant",
  "gray",
  "green",
  "lightGray",
  "maroon",
  "midnight",
  "navy",
  "olive",
  "orange",
  "orchid",
  "pine",
  "purple",
  "red",
  "watermelon",
  "white",
  "neutral900",
  "neutral200",
  "neutral70",
  "neutral10",
  "info",
  "error",
  "warning",
  "success",
  "neutral",
];

const BoxDemo = () => {
  return (
    <Box direction="row" justifyContent="between">
      <Box color="blue" height={50} rounding={4} width={50}>
        <Text size="lg" />
      </Box>
      <Box color="primary" height={50} width={50}>
        <Text size="lg" />
      </Box>
      <Box border="primary" color="lightGray" height={50} rounding="circle" width={50}>
        <Text size="lg" />
      </Box>
    </Box>
  );
};

const FlexBox = () => {
  return (
    <StorybookContainer>
      <Box
        alignItems="center"
        color="blue"
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
        <Text weight="bold">Josh Gachnang</Text>
        <Text>joined 2 years ago</Text>
      </Box>
    </StorybookContainer>
  );
};

const BoxColors = () => {
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

export const BoxConfiguration: DemoConfiguration = {
  name: "Box",
  component: Box,
  related: ["Div", "View"],
  description:
    "Box is a component primitive that can be used to build the foundation of pretty much any other component. It keeps details like spacing, borders and colors consistent with the rest of Gestalt, while allowing the developer to focus on the content. Also known as “div” or “view”.",
  shortDescription:
    "Box is a component primitive that can be used to build the foundation of pretty much any other component.",
  a11yNotes: [
    "Setting display='visuallyHidden' on Box allows for an element to be visually hidden but still be read by screen readers.",
    "The ‘visually-hidden’ CSS technique applies absolute positioning to the element. For a correct implementation, make sure the ‘visually-hidden’ element is correctly contained within a relative-positioned Box.",
  ],
  category: ["Layout", "Primitive"],
  status: {
    documentation: "ready",
    figma: "notSupported",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "BoxProps",
  usage: {
    do: [
      "Use Box as a building block when creating components or layouts that do not rely on flexbox.",
      "Use padding before you use margins, as padding will compose better and won’t collapse.",
      "Design on a grid of 8pt (2, 4, 8, 12, etc).",
      "Box is very similar to Figma’s Auto-layout functionality. Check that out here.",
    ],
    doNot: ["Avoid using arbitrary div elements. Prioritize using Box."],
  },
  props: {},
  demo: BoxDemo,
  demoOptions: {},
  stories: {
    FlexBox: {render: FlexBox},
    Colors: {render: BoxColors},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
