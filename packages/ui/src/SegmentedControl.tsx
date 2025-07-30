import React, {FC, useCallback, useState} from "react";
import {Pressable, View} from "react-native";

import {Badge} from "./Badge";
import {SegmentedControlProps} from "./Common";
import {Heading} from "./Heading";
import {Icon} from "./Icon";
import {useTheme} from "./Theme";

export const SegmentedControl: FC<SegmentedControlProps> = ({
  items,
  onChange = () => {},
  size = "md",
  selectedIndex,
  maxItems,
  badges = [],
}) => {
  const height = size === "md" ? 36 : 44;
  const {theme} = useTheme();
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setStartIndex((prev) => Math.max(0, prev - (maxItems ?? 4)));
  }, []);

  const handleNext = useCallback(() => {
    setStartIndex((prev) => Math.min(items.length - (maxItems ?? items.length), prev + (maxItems ?? 4)));
  }, [items.length, maxItems]);

  const visibleItems = maxItems ? items.slice(startIndex, startIndex + maxItems) : items;
  const visibleBadges = maxItems ? badges.slice(startIndex, startIndex + maxItems) : badges;
  const canScrollLeft = startIndex > 0;
  const canScrollRight = maxItems ? startIndex + maxItems < items.length : false;
  const shouldShowScrollButtons = maxItems ? maxItems < items.length : false;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {Boolean(shouldShowScrollButtons) && (
        <Pressable disabled={!canScrollLeft} onPress={handlePrevious}>
          <Icon
            color={canScrollLeft ? "linkLight" : "extraLight"}
            iconName="chevron-left"
            size="lg"
          />
        </Pressable>
      )}
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          flexShrink: 1,
          alignItems: "center",
          height,
          maxHeight: height,
          backgroundColor: theme.primitives.neutral300,
          overflow: "hidden",
          borderRadius: theme.primitives.radius3xl,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            flexGrow: 1,
            paddingHorizontal: 4,
            height: height - 4,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <Pressable
                key={actualIndex}
                aria-role="button"
                style={{
                  display: "flex",
                  paddingHorizontal: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "row",
                  gap: 8,
                  flexGrow: 1,
                  flexBasis: 0,
                  borderRadius: theme.primitives.radius3xl,
                  backgroundColor: actualIndex === selectedIndex ? theme.surface.base : undefined,
                  overflow: "hidden",
                }}
                onPress={() => onChange(actualIndex)}
              >
                <Heading size="sm">{item}</Heading>
                {visibleBadges[index] && (
                  <Badge
                    status={visibleBadges[index].status ?? "info"}
                    value={visibleBadges[index].count}
                    variant="numberOnly"
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
      {Boolean(shouldShowScrollButtons) && (
        <Pressable disabled={!canScrollRight} onPress={handleNext}>
          <Icon
            color={canScrollRight ? "linkLight" : "extraLight"}
            iconName="chevron-right"
            size="lg"
          />
        </Pressable>
      )}
    </View>
  );
};
