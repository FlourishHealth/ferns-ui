/* eslint-disable react-native-a11y/has-accessibility-hint */
// accessibility hint handled in IconButton.tsx

import React, {FC, useContext} from "react";
import {View, ViewStyle} from "react-native";

import {IconButtonProps, IconName, TableIconButtonProps} from "../Common";
import {IconButton} from "../IconButton";
import {ThemeContext} from "../Theme";

export const TableIconButton: FC<TableIconButtonProps> = ({tableIconButtonName, onClick}) => {
  const iconButtonMap: Record<
    string,
    {iconName: IconName; variant: IconButtonProps["variant"]; accessibilityLabel: string}
  > = {
    edit: {iconName: "pen-to-square", variant: "muted", accessibilityLabel: "Edit"},
    saveAndClose: {iconName: "check", variant: "secondary", accessibilityLabel: "Save and close"},
    insert: {iconName: "plus", variant: "primary", accessibilityLabel: "Insert Data"},
    drawerOpen: {
      iconName: "chevron-down",
      variant: "muted",
      accessibilityLabel: "Open Drawer for more Data",
    },
    drawerClose: {
      iconName: "chevron-up",
      variant: "secondary",
      accessibilityLabel: "Close Drawer for more Data",
    },
  };
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={
        {justifyContent: "center", alignItems: "center", maxWidth: theme.table["mw-s"]} as ViewStyle
      }
    >
      <IconButton
        accessibilityLabel={iconButtonMap[tableIconButtonName].accessibilityLabel}
        iconName={iconButtonMap[tableIconButtonName].iconName}
        variant={iconButtonMap[tableIconButtonName].variant}
        onClick={onClick}
      />
    </View>
  );
};
