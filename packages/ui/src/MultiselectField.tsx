import React, {FC, useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";

import {CheckBox} from "./CheckBox";
import {MultiselectFieldProps} from "./Common";
import {Heading} from "./Heading";
import {isMobileDevice} from "./MediaQuery";
import {Text} from "./Text";

const Option: FC<{
  isDefault: boolean;
  option: string;
  selected: boolean;
  onSelect: () => void;
}> = ({option, isDefault, selected, onSelect}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: isDefault ? "row" : "row-reverse",
        justifyContent: "space-between",
      }}
    >
      <View style={{flex: 1, flexWrap: "wrap"}}>
        <Text>{option}</Text>
      </View>
      <TouchableOpacity
        key={option}
        accessibilityHint={`Select ${option} from list of options`}
        accessibilityLabel={option}
        accessibilityRole="checkbox"
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={{
          justifyContent: "center",
        }}
        onPress={onSelect}
      >
        <View
          style={{
            paddingStart: isDefault ? 8 : 0,
            paddingEnd: isDefault ? 0 : 8,
          }}
        >
          <CheckBox selected={selected} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const MultiselectField: FC<MultiselectFieldProps> = ({
  options,
  title,
  value = [],
  variant = "leftText",
  onChange,
}) => {
  const isMobile = isMobileDevice();
  const isDefault = variant === "leftText";
  const [selectedItems, setSelectedItems] = useState<string[]>(value);
  // set the selected items to the value passed in the props
  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  const toggleItem = (item: string) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };
  return (
    <View
      accessibilityHint="Contains a prompt and list of options to select"
      accessibilityLabel={title}
      accessibilityRole="combobox"
      style={{display: "flex", width: "100%", gap: isMobile ? 16 : 8}}
    >
      <Heading color="primary" size="sm">
        {title}
      </Heading>
      {options.map((option) => (
        <Option
          key={option}
          isDefault={isDefault}
          option={option}
          selected={selectedItems.includes(option)}
          onSelect={() => toggleItem(option)}
        />
      ))}
    </View>
  );
};
