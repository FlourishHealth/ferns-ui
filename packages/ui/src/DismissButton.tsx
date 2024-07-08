import {FontAwesome6} from "@expo/vector-icons";
import React, {useContext} from "react";
import {Pressable, View} from "react-native";

import {ThemeContext} from "./Theme";

type DismissButtonProps = {
  accessibilityLabel: string;
  accessibilityHint?: string;
  buttonIconName: string;
  onClick: () => void;
  color?: string;
};

export const DismissButton = ({
  accessibilityLabel,
  accessibilityHint,
  buttonIconName,
  onClick,
  color,
}: DismissButtonProps): React.ReactElement | null => {
  const {theme} = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={{
        alignItems: "center",
        borderRadius: theme.radius.rounded as any,
        justifyContent: "center",
        height: 32,
        width: 32,
      }}
      onPress={onClick}
    >
      <View>
        <FontAwesome6 brand="solid" color={color} name={buttonIconName} size={16} />
      </View>
    </Pressable>
  );
};
