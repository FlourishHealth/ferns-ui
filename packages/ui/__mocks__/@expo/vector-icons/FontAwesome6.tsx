import React from "react";
import {View} from "react-native";

const FontAwesomeIcon = ({children, ...props}: {className?: string; children: any}) => {
  return (
    // eslint-disable-next-line react/prop-types
    <View testID={(props as any)?.name} {...props}>
      {children}
    </View>
  );
};

// eslint-disable-next-line import/no-default-export
export default FontAwesomeIcon;
