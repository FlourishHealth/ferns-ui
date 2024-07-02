import React from "react";
import {Text, View} from "react-native";

import {HelperTextProps} from "./Common";
import {useTheme} from "./Theme";

export const HelperText = ({helperText}: HelperTextProps): React.ReactElement | null => {
  const {theme} = useTheme();

  if (!helperText) {
    return null;
  }

  return (
    <View style={{marginTop: 2}}>
      <Text style={{fontSize: 12, color: theme.text.primary, lineHeight: 16}}>{helperText}</Text>
    </View>
  );
};
