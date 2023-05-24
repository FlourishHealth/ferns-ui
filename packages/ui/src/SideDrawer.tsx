import React, {ReactElement} from "react";
import {Drawer} from "react-native-drawer-layout";

import {Box} from "./Box";
import {Text} from "./Text";

export interface SideDrawerProps {
  position?: "right" | "left";
  isOpen: boolean;
  renderContent: () => ReactElement | ReactElement[];
  onClose?: () => void;
  onOpen?: () => void;
  drawerType?: "front" | "back" | "slide" | "permanent";
}

export const SideDrawer = ({
  position = "left",
  isOpen,
  renderContent,
  onClose = () => {},
  onOpen = () => {},
  drawerType = "front",
}: SideDrawerProps): ReactElement => {
  return (
    <Drawer
      drawerPosition={position}
      drawerStyle={{height: "100%"}}
      drawerType={drawerType}
      open={isOpen}
      renderDrawerContent={renderContent}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box>
        <Text>Child</Text>
      </Box>
    </Drawer>
  );
};
