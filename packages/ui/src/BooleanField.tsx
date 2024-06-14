import React from "react";
import {Switch, View} from "react-native";

import {BooleanFieldProps} from "./Common";
import {Text} from "./Text";

export const BooleanField = ({
  label,
  variant,
  value,
  onChange,
  interaction,
}: BooleanFieldProps): React.ReactElement => {
  return (
    <View style={{flexDirection: variant === "title" ? "column" : "row"}}>
      <Text bold={variant === "title"} size="md">
        {label}
      </Text>
      <Switch
        ios_backgroundColor="#3e3e3e"
        thumbColor={interaction ? "#f5dd4b" : "#f4f3f4"}
        trackColor={{false: "#767577", true: "#81b0ff"}}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};
