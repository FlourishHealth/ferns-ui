import React, {ReactElement} from "react";
import {Platform, SafeAreaView, StyleProp, ViewStyle} from "react-native";
import {Drawer} from "react-native-drawer-layout";

import {SideDrawerProps} from "./Common";
import {isMobileDevice} from "./MediaQuery";

const DEFAULT_STYLES: StyleProp<ViewStyle> = {
  width: Platform.OS === "web" ? "40%" : "95%",
  backgroundColor: "lightgray",
  borderWidth: 1,
  borderColor: "gray",
  overflow: isMobileDevice() ? undefined : "scroll",
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
    <Drawer
      drawerPosition={position}
      drawerStyle={[
        DEFAULT_STYLES,
        drawerStyles,
        {
          display: Platform.OS === "web" && !isOpen ? "none" : "flex",
          right: 0,
        },
      ]}
      drawerType={drawerType}
      open={isOpen}
      renderDrawerContent={renderDrawerContent}
      onClose={onClose}
      onOpen={onOpen}
    >
      {children}
    </Drawer>
  );
};
