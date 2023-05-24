import {Box, Button, SideDrawer} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

const DrawerStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <StorybookContainer>
      <Box height="100%" width="100%">
        <Button text="Open drawer" onClick={() => setOpen((prevOpen) => !prevOpen)} />
        <SideDrawer
          isOpen={open}
          renderContent={() => <Button text="Hello" onClick={() => {}} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      </Box>
    </StorybookContainer>
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
