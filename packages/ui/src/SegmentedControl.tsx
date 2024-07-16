import React from "react";
import {Pressable, View} from "react-native";

import {SegmentedControlProps} from "./Common";
import {Heading} from "./Heading";
import {useTheme} from "./Theme";

export const SegmentedControl = ({
  items,
  onChange = () => {},
  size = "md",
  selectedIndex,
}: SegmentedControlProps) => {
  const height = size === "md" ? 36 : 44;
  const {theme} = useTheme();
  return (
    <View
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        flexShrink: 1,
        alignItems: "center",
        gap: 4,
        height,
        maxHeight: height,
        borderRadius: theme.primitives.radius3xl,
        borderColor: theme.primitives.neutral300,
        borderWidth: 3,
        backgroundColor: theme.primitives.neutral300,
      }}
    >
      {items.map((item, index) => (
        <Pressable
          key={index}
          accessibilityRole="button"
          style={{
            display: "flex",
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm,
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexBasis: 0,
            gap: 12,
            flexGrow: 1,
            flexShrink: 0,
            borderRadius: theme.primitives.radius3xl,
            backgroundColor: index === selectedIndex ? theme.surface.base : undefined,
            overflow: "hidden",
          }}
          onPress={() => onChange(index)}
        >
          <Heading size="sm">{item}</Heading>
        </Pressable>
      ))}
    </View>
  );
};
