import React from "react";
import {TouchableOpacity, View} from "react-native";

import {RadioFieldProps} from "./Common";
import {Heading} from "./Heading";
import {isMobileDevice} from "./MediaQuery";
import {Radio} from "./Radio";
import {Text} from "./Text";

export const RadioField = ({
  title,
  options,
  value,
  onChange,
  variant = "rightText",
}: RadioFieldProps): React.ReactElement => {
  return (
    <View style={{gap: isMobileDevice() ? 16 : 8}}>
      <Heading size="sm">{title}</Heading>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          accessibilityRole="button"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => onChange(option)}
        >
          {variant === "leftText" && <Text>{option}</Text>}
          <Radio key={option} selected={option === value} />
          {variant === "rightText" && (
            <View style={{marginRight: 0}}>
              <Text>{option}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
