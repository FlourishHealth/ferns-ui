import React from "react";
import {Linking} from "react-native";

import {LinkProps} from "./Common";
import {Text} from "./Text";

export const Link = (props: LinkProps): React.ReactElement => {
  return (
    <Text {...props} color={props.color || "blue"} onPress={() => Linking.openURL(props.href)}>
      {props.children}
    </Text>
  );
};
