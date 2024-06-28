import {Box, Button, FlatList, Heading, SideDrawer, Text} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

export const DrawerDemo = () => {
  return <Text align="center">No drawer demo, see Dev Mode.</Text>;
};

export const DrawerStory = () => {
  const [open, setOpen] = useState<"right" | "left" | null>(null);

  const users = Array.from(Array(100).keys()).map((i) => ({
    name: `user${i}`,
    id: i,
  }));

  return (
    <SideDrawer
      isOpen={open === "left"}
      position="left"
      renderContent={() => (
        <Box color="base" height="100%">
          <Heading>Drawer Heading</Heading>
          <FlatList data={users} renderItem={(item) => <Text>{item.item.name}</Text>} />
        </Box>
      )}
      onClose={() => open === "left" && setOpen(null)}
      onOpen={() => {}}
    >
      <SideDrawer
        isOpen={open === "right"}
        position="right"
        renderContent={() => (
          <Box color="base" height="100%">
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
        onClose={() => open === "right" && setOpen(null)}
        onOpen={() => setOpen("right")}
      >
        <StorybookContainer>
          <Box marginBottom={1}>
            <Button
              text="Open left"
              onClick={() => {
                setOpen("left");
              }}
            />
          </Box>
          <Button
            text="Open right"
            onClick={() => {
              setOpen("right");
            }}
          />
        </StorybookContainer>
      </SideDrawer>
    </SideDrawer>
  );
};
