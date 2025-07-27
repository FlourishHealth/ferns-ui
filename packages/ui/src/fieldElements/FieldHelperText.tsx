// This component is intended to be used as a helper text for form fields, specifically for text
// fields and text areas. It is not intended to be used as a standalone component.
import React from "react";
import {Text, View} from "react-native";

import {useTheme} from "../Theme";

interface FieldHelperTextProps {
  text: string;
}

export const FieldHelperText: React.FC<FieldHelperTextProps> = ({text}) => {
  const {theme} = useTheme();

  return (
    <View style={{marginTop: 2}}>
      <Text style={{fontSize: 12, color: theme.text.primary, lineHeight: 16}}>{text}</Text>
    </View>
  );
};
