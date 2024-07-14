import React, {FC, useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";

import {CheckBox} from "./CheckBox";
import {MultiselectFieldProps} from "./Common";
import {FieldError, FieldHelperText} from "./FieldElements";
import {Heading} from "./Heading";
import {isMobileDevice} from "./MediaQuery";
import {Text} from "./Text";

interface OptionProps {
  isDefault: boolean;
  value: string;
  title?: string;
  selected: boolean;
  onSelect: () => void;
}

const Option: FC<OptionProps> = ({value, title, isDefault, selected, onSelect}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: isDefault ? "row" : "row-reverse",
        justifyContent: "space-between",
      }}
    >
      <View style={{flex: 1, flexWrap: "wrap"}}>
        <Text>{title ?? value}</Text>
      </View>
      <TouchableOpacity
        key={value}
        accessibilityHint={`Select ${title ?? value} from list of options`}
        accessibilityLabel={title ?? value}
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
  errorText,
  helperText,
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
      {Boolean(errorText) && <FieldError text={errorText!} />}
      {options.map((option) => (
        <Option
          key={option.key ?? option.value}
          isDefault={isDefault}
          selected={selectedItems.includes(option.value)}
          title={option.label}
          value={option.value}
          onSelect={() => toggleItem(option.value)}
        />
      ))}
      {Boolean(helperText) && <FieldHelperText text={helperText!} />}
    </View>
  );
};
