import {StorybookContainer} from "@components";
import {Box, Button, FlatList, Heading, SideDrawer, Text} from "ferns-ui";
import React, {useState} from "react";

interface DrawerStoryProps {
  position: "right" | "left";
}

export const DrawerStory = ({position}: DrawerStoryProps) => {
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
