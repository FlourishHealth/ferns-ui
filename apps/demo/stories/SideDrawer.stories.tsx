import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {Box, Button, FlatList, Heading, SideDrawer, Text} from "ferns-ui";
import React, {useState} from "react";

import {DefaultDemo} from "./DefaultDemo";

interface DrawerStoryProps {
  position: "right" | "left";
}

const DrawerStory = ({position}: DrawerStoryProps) => {
  const [open, setOpen] = useState(false);

  const users = Array.from(Array(100).keys()).map((i) => ({
    name: `user${i}`,
    id: i,
  }));

  return (
    <SideDrawer
      isOpen={open}
      position={position}
      renderContent={() => (
        <Box height="100%">
          <Box>
            <Heading>Drawer Heading</Heading>
          </Box>
          <FlatList
            data={users}
            renderItem={(item) => (
              <Box>
                <Text>{item.item.name}</Text>
              </Box>
            )}
          />
        </Box>
      )}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <StorybookContainer>
        <Button
          text="Open drawer"
          onClick={() => {
            setOpen((prevOpen) => !prevOpen);
          }}
        />
      </StorybookContainer>
    </SideDrawer>
  );
};

export const SideDrawerConfiguration: DemoConfiguration = {
  name: "Side drawer",
  component: SideDrawer,
  related: ["Modals"],
  description:
    "Side drawers function like the Material navigation drawer. They open up a surface that allows the system to display information, navigation, or other content.",
  a11yNotes: [
    "If an element opens a side drawer, users should be able to click space/enter to do so.",
  ],
  category: ["Layout", "Utility"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24263&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SideDrawerProps",
  usage: {
    do: [
      "Use side drawer to display information from a table record row.",
      "Use side drawer to show non-critical information.",
    ],
    doNot: ["Do not use side drawer to show information that’s critical to a task or flow."],
  },
  props: {},
  demo: DefaultDemo,
  demoOptions: {},
  stories: {
    Left: {render: () => <DrawerStory position="left" />},
    Right: {render: () => <DrawerStory position="right" />},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
