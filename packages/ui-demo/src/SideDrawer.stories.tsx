import {Box, Button, Heading, SideDrawer} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

const DrawerStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <SideDrawer
      isOpen={open}
      position="right"
      renderContent={() => (
        <Box>
          <Box>
            <Heading>Drawer Heading</Heading>
          </Box>
          <Button color="blue" text="Hello" onClick={() => {}} />
        </Box>
      )}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <StorybookContainer>
        <Button text="Open drawer" onClick={() => setOpen((prevOpen) => !prevOpen)} />
      </StorybookContainer>
    </SideDrawer>
  );
};

export const SideDrawerStories = {
  title: "SideDrawer",
  component: SideDrawer,
  stories: {
    SideDrawer() {
      return <DrawerStory />;
    },
  },
};
