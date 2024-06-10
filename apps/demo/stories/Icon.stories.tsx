import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Icon, IconProps, Text} from "ferns-ui";
import React from "react";

export const IconDemo = (props: Partial<IconProps>) => (
  <Box alignItems="center" direction="row" justifyContent="center" padding={6}>
    <Icon name="circle-exclamation" size="xl" {...props} />
  </Box>
);

const SolidIcons = (
  <StorybookContainer>
    <Box
      direction="row"
      display="flex"
      height="100%"
      justifyContent="between"
      maxWidth={300}
      width="100%"
    >
      <Icon name="heart" />
      <Icon name="plus" />
      <Icon name="pencil" />
      <Icon name="heart" />
    </Box>
  </StorybookContainer>
);

const IconStyles = (
  <StorybookContainer>
    <Box padding={6}>
      <Text>Regular</Text>
      <Icon name="heart" size="xl" />
    </Box>
    <Box padding={6}>
      <Text>Solid</Text>
      <Icon name="heart" size="xl" type="solid" />
    </Box>
  </StorybookContainer>
);

const IconSizes = (
  <StorybookContainer>
    <Box
      direction="row"
      display="flex"
      height="100%"
      justifyContent="between"
      maxWidth={300}
      width="100%"
    >
      <Icon name="heart" size="xs" type="solid" />
      <Icon name="heart" size="xs" type="regular" />

      <Icon name="heart" size="sm" type="solid" />
      <Icon name="heart" size="sm" type="regular" />

      <Icon name="heart" size="md" type="solid" />
      <Icon name="heart" size="md" type="regular" />

      <Icon name="heart" size="lg" type="solid" />
      <Icon name="heart" size="lg" type="regular" />

      <Icon name="heart" size="xl" type="solid" />
      <Icon name="heart" size="xl" type="regular" />
    </Box>
  </StorybookContainer>
);

export const IconConfiguration: DemoConfiguration = {
  name: "Icon",
  related: [],
  description:
    "Icons are used to visually communicate core actions or information to the user. They are used to represent a particular action or category of information.",
  category: "Foundation",
  component: Icon,
  status: {
    documentation: "planned",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FykXj5qjjtFjOYkAvTasu9r%2FFlourish-Health-Design-System%3Ftype%3Ddesign%26node-id%3D220%253A7719%26mode%3Ddesign%26t%3DiCiJI3xbrm6rrXPg-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  usage: {
    do: [],
    doNot: [],
  },
  a11yNotes: ["All icons must have accessibility labels"],
  interfaceName: "IconProps",
  props: {},
  demo: IconDemo,
  demoOptions: {
    size: "md",
    controls: {
      name: {
        type: "select",
        defaultValue: "circle-exclamation",
        options: [
          {label: "Circle Exclamation", value: "circle-exclamation"},
          {label: "Message", value: "message"},
          {label: "Ninja", value: "user-ninja"},
          {label: "Heart", value: "heart"},
        ],
      },
      type: {
        type: "select",
        defaultValue: "regular",
        options: [
          {label: "Regular", value: "regular"},
          {label: "Solid", value: "solid"},
        ],
      },
      color: {
        type: "select",
        defaultValue: "primary",
        options: [
          {label: "Primary", value: "primary"},
          {label: "Secondary", value: "secondary"},
          {label: "Secondary Light", value: "secondaryLight"},
          {label: "Secondary Dark", value: "secondaryDark"},
          {label: "Accent", value: "accent"},
          {label: "Error", value: "error"},
          {label: "Warning", value: "warning"},
          {label: "Success", value: "success"},
        ],
      },
      size: {
        type: "select",
        defaultValue: "md",
        options: [
          {label: "Extra Small", value: "xs"},
          {label: "Small", value: "sm"},
          {label: "Medium", value: "md"},
          {label: "Large", value: "lg"},
          {label: "Extra Large", value: "xl"},
          {label: "2XL", value: "2xl"},
        ],
      },
    },
  },
  stories: {
    SolidIcons: {
      description: "",
      render: () => SolidIcons,
    },
    IconStyles: {
      description: "",
      render: () => IconStyles,
    },
    IconSizes: {
      description: "",
      render: () => IconSizes,
    },
  },
};
