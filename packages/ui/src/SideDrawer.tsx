import React, {ReactElement} from "react";
import {StyleProp, ViewStyle} from "react-native/types";
import {Drawer} from "react-native-drawer-layout";

export interface SideDrawerProps {
  position?: "right" | "left";
  isOpen: boolean;
  renderContent: () => ReactElement | ReactElement[];
  onClose?: () => void;
  onOpen?: () => void;
  drawerType?: "front" | "back" | "slide" | "permanent";
  children?: ReactElement;
}

const DEFAULT_STYLES: StyleProp<ViewStyle> = {
  width: "40%",
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
}: SideDrawerProps): ReactElement => {
  return (
    <Drawer
      drawerPosition={position}
      drawerStyle={DEFAULT_STYLES}
      drawerType={drawerType}
      open={isOpen}
      renderDrawerContent={renderContent}
      onClose={onClose}
      onOpen={onOpen}
    >
      {children}
    </Drawer>
  );
};
