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
          key={option.key ?? option.value}
          accessibilityHint={`Select ${option} from list of options`}
          aria-label={option.label ?? option.value}
          aria-role="button"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onPress={() => onChange(option.value)}
        >
          {variant === "leftText" && <Text>{option.label ?? option.value}</Text>}
          <Radio key={option.key ?? option.value} selected={option.value === value} />
          {variant === "rightText" && (
            <View style={{marginRight: 0}}>
              <Text>{option.label ?? option.value}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
