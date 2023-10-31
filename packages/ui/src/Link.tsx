import React from "react";
import {Linking} from "react-native";

import {Text, TextProps} from "./Text";

interface LinkProps extends TextProps {
  href: string;
}

export function Link(props: LinkProps): React.ReactElement {
  return (
    <Text {...props} color={props.color || "blue"} onPress={() => Linking.openURL(props.href)}>
      {props.children}
    </Text>
  );
}
