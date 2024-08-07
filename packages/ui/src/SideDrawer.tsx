import React, {ReactElement, useCallback} from "react";
import {Platform, SafeAreaView, StyleProp, ViewStyle} from "react-native";
import {Drawer} from "react-native-drawer-layout";

import {SideDrawerProps} from "./Common";
import {useTheme} from "./Theme";

const DEFAULT_STYLES: StyleProp<ViewStyle> = {
  width: Platform.OS === "web" ? "40%" : "95%",
  height: "100%",
  borderWidth: 1,
  borderColor: "gray",
};

const addWebScroll = (isOpen: boolean): ViewStyle => {
  if (Platform.OS === "web") {
    return {display: isOpen ? "flex" : "none", overflow: "scroll"};
  } else {
    return {};
  }
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
  const {theme} = useTheme();
  const renderDrawerContent = useCallback((): ReactElement => {
    return <SafeAreaView>{renderContent()}</SafeAreaView>;
  }, [renderContent]);

  return (
    <Drawer
      drawerPosition={position}
      drawerStyle={[
        DEFAULT_STYLES,
        {backgroundColor: theme.surface.neutralLight},
        drawerStyles,
        addWebScroll(isOpen),
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
