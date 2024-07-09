import React from "react";
import {Pressable, View} from "react-native";

import {DismissButtonProps} from "./Common";
import {Icon} from "./Icon";

export const DismissButton = ({
  accessibilityLabel,
  accessibilityHint,
  onClick,
  color = "primary",
}: DismissButtonProps): React.ReactElement | null => {
  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        width: 32,
      }}
      onPress={onClick}
    >
      <View>
        <Icon color={color} iconName="x" type="solid" />
      </View>
    </Pressable>
  );
};
