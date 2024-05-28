import {DemoConfiguration} from "@config";
import {Box, Spinner} from "ferns-ui";
import React from "react";

const Small = (): React.ReactElement => {
  return (
    <Box width="100%">
      <Spinner size="sm" />
    </Box>
  );
};

const Big = (): React.ReactElement => {
  return (
    <Box display="flex">
      <Spinner size="md" />
    </Box>
  );
};

const Dark = (): React.ReactElement => {
  return (
    <Box color="darkGray" paddingY={6}>
      <Spinner color="white" />
    </Box>
  );
};

export const SpinnerConfiguration: DemoConfiguration = {
  name: "Spinner",
  component: Spinner,
  related: ["Buttons"],
  description:
    "This is a microcomponent that’s used to indicate that the system is loading information. It can be used on a loading surface or on a button.",
  a11yNotes: [],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23466&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SpinnerProps",
  usage: {
    do: [
      "Use the default colors.",
      "If extra emphasis is needed (and if it’s built) use the other colors.",
    ],
    doNot: ["Do not arbitrarily change the colors or sizing."],
  },
  props: {},
  demo: Big,
  demoOptions: {},
  stories: {
    Small: {render: Small},
    Big: {render: Big},
    Dark: {render: Dark},
  },
};
