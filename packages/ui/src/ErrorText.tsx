import React from "react";
import {Text, View} from "react-native";

import {ErrorTextProps} from "./Common";
import {Icon} from "./Icon";
import {useTheme} from "./Theme";

export const ErrorText = ({errorText}: ErrorTextProps): React.ReactElement | null => {
  const {theme} = useTheme();

  if (!errorText) {
    return null;
  }

  return (
    <View style={{flexDirection: "row", alignItems: "center", marginVertical: 2}}>
      <Icon color="error" iconName="triangle-exclamation" size="sm" />
      <View style={{marginLeft: 4}}>
        <Text style={{color: theme.text.error, fontSize: 12}}>{errorText}</Text>
      </View>
    </View>
  );
};
