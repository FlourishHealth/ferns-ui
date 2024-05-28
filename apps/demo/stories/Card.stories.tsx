import {DemoConfiguration} from "@config";
import {Box, Card, Text} from "ferns-ui";
import React from "react";

const CardDemo = () => {
  return (
    <Box color="lightGray" direction="column" display="flex" height="100%" width="100%">
      <Card>
        <Box alignItems="center" direction="row" display="flex">
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
            <Text>JG</Text>
          </Box>
          <Box direction="column" paddingX={2}>
            <Text>Josh Gachnang</Text>
            <Text>joined 2 years ago</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const Plain = () => {
  return (
    <Box
      color="lightGray"
      direction="column"
      display="flex"
      height="100%"
      padding={12}
      width="100%"
    >
      <Card>
        <Box alignItems="center" direction="row" display="flex">
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
            <Text>JG</Text>
          </Box>
          <Box direction="column" paddingX={2}>
            <Text>Josh Gachnang</Text>

            <Text>joined 2 years ago</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export const CardConfiguration: DemoConfiguration = {
  name: "Card",
  component: Card,
  related: ["Box"],
  description:
    "A card serves as a surface for information. It helps organize and highlight information while providing visual hierarchy. This design system has two kinds of cards: Display and Container.",
  shortDescription:
    "A card serves as a surface for information. It helps organize and highlight information while providing visual hierarchy.",
  a11yNotes: [
    "If using an image, be sure to provide an appropriate alt tag.",
    "If using a button, be sure to follow all of the relevant accessibility standards found here.",
  ],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24249&mode=design&t=AKQ8wyFQBA4qC5eF-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "CardProps",
  usage: {
    do: [
      "Use a display card to highlight a new feature or flow.",
      "Use a container card to pull longform information into a tidy column, especially on larger screens.",
    ],
    doNot: ["Do not put information for a task or flow on a card. Consider using a modal instead."],
  },
  props: {},
  demo: CardDemo,
  demoOptions: {},
  stories: {
    Plain: {render: Plain},
  },
};
