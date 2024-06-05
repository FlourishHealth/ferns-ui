import React from "react";
import {Linking} from "react-native";

import {LinkProps} from "./Common";
import {Text} from "./Text";

// TODO: Decide how we're going to handle Link, Hyperlink, and links in Text components.
export const Link = ({text, href, onClick}: LinkProps): React.ReactElement => {
  if (!href && !onClick) {
    console.error("Link component requires either href or onClick prop");
  }
  return (
    <Text color="link" onPress={() => (onClick ? onClick() : Linking.openURL(href))}>
      {text}
    </Text>
  );
};
