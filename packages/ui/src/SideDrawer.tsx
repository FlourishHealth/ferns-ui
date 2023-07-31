import React, {ReactElement} from "react";
import {Platform, StyleProp, ViewStyle} from "react-native";
import {Drawer} from "react-native-drawer-layout";

import {Box} from "./Box";
import {IconButton} from "./IconButton";

export interface SideDrawerProps {
  // Position of the drawer relative to the child
  position?: "right" | "left";
  // Used to open/hide drawer. Use the onClose and onOpen props to control state
  isOpen: boolean;
  // Content within the drawer
  renderContent: () => ReactElement | ReactElement[];
  onClose?: () => void;
  onOpen?: () => void;
  drawerType?: "front" | "back" | "slide" | "permanent";
  // Content that is wrapped by the drawer. The drawer will use the height of the child it wraps. Can be overwritten via styles prop
  children?: ReactElement;
  drawerStyles?: StyleProp<ViewStyle>;
}

const DEFAULT_STYLES: StyleProp<ViewStyle> = {
  width: Platform.OS === "web" ? "40%" : "95%",
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
  const renderDrawerHeader = (): ReactElement => {
    return (
      <Box>
        <IconButton
          accessibilityLabel="close side drawer"
          icon="times"
          iconColor="darkGray"
          onClick={onClose}
        />
      </Box>
    );
  };

  const renderDrawerContent = (): ReactElement => {
    return (
      <>
        {renderDrawerHeader()}
        {renderContent()}
      </>
    );
  };

  return (
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
  );
};
