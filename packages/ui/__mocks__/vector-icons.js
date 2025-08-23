import React from "react";
import {Text} from "react-native";

// eslint-disable-next-line unused-imports/no-unused-vars
const createIcon = (name) => {
  // eslint-disable-next-line react/display-name, react/prop-types
  return function ({children, ...props}) {
    console.log("ICON", name);
    return (
      <Text testID={name} {...props}>
        {children}
      </Text>
    );
  };
};

export const FontAwesome6 = createIcon("FontAwesome6");
