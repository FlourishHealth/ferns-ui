import React from "react";
import {Linking, Pressable} from "react-native";

import {LinkProps} from "./Common";
import {Text} from "./Text";

export const Link = ({text, href, onClick}: LinkProps): React.ReactElement => {
  if (!href && !onClick) {
    console.error("Link component requires either href or onClick prop");
  }
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={20}
      onPress={() => (onClick ? onClick() : Linking.openURL(href))}
    >
      <Text color="link" underline>
        {text}
      </Text>
    </Pressable>
  );
};
