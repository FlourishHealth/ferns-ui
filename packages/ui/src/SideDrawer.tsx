import React, {ReactElement} from "react";
import {Platform, SafeAreaView, StyleProp, ViewStyle} from "react-native";
import {Drawer} from "react-native-drawer-layout";

import {Box} from "./Box";
import {SideDrawerProps} from "./Common";

const DEFAULT_STYLES: StyleProp<ViewStyle> = {
  width: Platform.OS === "web" ? "40%" : "95%",
  height: "100%",
  backgroundColor: "lightgray",
  borderWidth: 1,
  borderColor: "gray",
};

export const SideDrawer = ({
  position = "left",
  isOpen,
  renderContent,
  onClose = () => {},
  onOpen = () => {},
  drawerType = "front",
  children,
  drawerStyles = {},
}: SideDrawerProps): ReactElement => {
  const renderDrawerContent = (): ReactElement => {
    return <SafeAreaView>{renderContent()}</SafeAreaView>;
  };
  return (
    <Box height="100%" overflow="hidden" width="100%">
      <Drawer
        drawerPosition={position}
        drawerStyle={[DEFAULT_STYLES, drawerStyles]}
        drawerType={drawerType}
        open={isOpen}
        renderDrawerContent={renderDrawerContent}
        onClose={onClose}
        onOpen={onOpen}
      >
        {children}
      </Drawer>
    </Box>
  );
};
