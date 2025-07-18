import {Picker} from "@react-native-picker/picker";
import React, {useCallback, useMemo, useState} from "react";
import {Modal, Platform, Text, TouchableOpacity, View} from "react-native";

import {FieldOption, SelectBadgeProps, SurfaceTheme, TextTheme} from "./Common";
import {Icon} from "./Icon";
import {useTheme} from "./Theme";

export const SelectBadge = ({
  value,
  status = "info",
  secondary = false,
  customBackgroundColor,
  customTextColor,
  customBorderColor,
  disabled = false,
  options,
  onChange,
}: SelectBadgeProps): React.ReactElement => {
  const {theme} = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  // Temporary state to manage value changes for ios picker
  // Assures the badge display value persists when user scrolls through options
  const [iosDisplayValue, setIosDisplayValue] = useState<string | undefined>(value);

  const secondaryBorderColors = {
    error: "#F39E9E",
    warning: "#FCC58F",
    info: "#8FC1D2",
    success: "#7FD898",
    neutral: "#AAAAAA",
    custom: "#AAAAAA",
  };

  let borderWidth = 0;
  if (secondary || status === "custom") borderWidth = 1;

  let badgeColor: keyof TextTheme = "inverted";

  if (secondary) {
    if (status === "error") badgeColor = "error";
    else if (status === "warning") badgeColor = "warning";
    else if (status === "info") badgeColor = "secondaryDark";
    else if (status === "success") badgeColor = "success";
    else if (status === "neutral") badgeColor = "primary";
  }

  let badgeBgColor: keyof SurfaceTheme = "neutralDark";

  if (status === "error") badgeBgColor = secondary ? "errorLight" : "error";
  else if (status === "warning") badgeBgColor = secondary ? "warningLight" : "warning";
  else if (status === "info") badgeBgColor = secondary ? "secondaryLight" : "secondaryDark";
  else if (status === "success") badgeBgColor = secondary ? "successLight" : "success";
  else if (status === "neutral") badgeBgColor = secondary ? "neutralLight" : "neutralDark";

  const backgroundColor = status === "custom" ? customBackgroundColor : theme.surface[badgeBgColor];
  const borderColor = status === "custom" ? customBorderColor : secondaryBorderColors[status];
  const textColor = status === "custom" ? customTextColor : theme.text[badgeColor];

  let leftOfChevronBorderColor = textColor;
  if (status === "custom") leftOfChevronBorderColor = customBorderColor ?? textColor;
  else if (secondary) leftOfChevronBorderColor = borderColor;

  const findSelectedItem = useCallback(
    (v: string | undefined | null): FieldOption | null => {
      if (v !== undefined && v !== null) {
        return options.find((opt) => opt.value === v) || null;
      }
      return null;
    },
    [options]
  );

  const displayVal = useMemo(() => {
    return findSelectedItem(value)?.label ?? "---";
  }, [value, findSelectedItem]);

  const handleOnChange = useCallback(
    (val: string) => {
      const selectedItem = findSelectedItem(val);
      if (selectedItem) {
        onChange(selectedItem.value);
      }
      setShowPicker(false);
    },
    [findSelectedItem, onChange]
  );

  const renderPickerItems = useCallback(() => {
    return options?.map((item: any) => (
      <Picker.Item key={item.key || item.label} label={item.label} value={item.value} />
    ));
  }, [options]);

  const renderIosPicker = useCallback(() => {
    const handleValueChangeIos = (itemValue: string) => {
      setIosDisplayValue(itemValue);
    };

    const handleSave = () => {
      if (iosDisplayValue && !disabled) {
        handleOnChange(iosDisplayValue);
      } else {
        setShowPicker(false);
      }
    };

    const handleDismiss = () => {
      setShowPicker(false);
      setIosDisplayValue(value);
    };

    return (
      <Modal
        animationType="slide"
        supportedOrientations={["portrait", "landscape"]}
        transparent
        visible={showPicker}
        onRequestClose={handleDismiss}
      >
        <View style={{flex: 1, justifyContent: "flex-end"}}>
          <TouchableOpacity
            accessibilityHint="Closes the picker modal"
            accessibilityLabel="Dismiss picker modal"
            activeOpacity={1}
            style={{flex: 1}}
            onPress={handleDismiss}
          />
          <View
            style={{
              backgroundColor: theme.surface.neutralLight,
              borderTopWidth: 1,
              borderTopColor: theme.border.default,
              height: 215,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 45,
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                accessibilityHint="Saves the selected value"
                accessibilityLabel="Save selected value"
                aria-role="button"
                hitSlop={{top: 4, right: 4, bottom: 4, left: 4}}
                style={{
                  alignSelf: "flex-end",
                  paddingRight: 12,
                }}
                onPress={handleSave}
              >
                <View>
                  <Text
                    style={{
                      color: "#007aff",
                      fontWeight: "600",
                      fontSize: 17,
                      paddingTop: 1,
                    }}
                  >
                    Save
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Picker
              enabled={!disabled}
              selectedValue={iosDisplayValue}
              onValueChange={handleValueChangeIos}
            >
              {renderPickerItems()}
            </Picker>
          </View>
        </View>
      </Modal>
    );
  }, [showPicker, iosDisplayValue, disabled, theme, value, handleOnChange, renderPickerItems]);

  const renderPicker = useCallback(() => {
    return (
      <Picker
        enabled={!disabled}
        selectedValue={findSelectedItem(value)?.value ?? undefined}
        style={[
          {
            position: "absolute",
            width: "100%",
            height: "100%",
            color: "transparent",
            opacity: 0,
          },
          // Android headless picker: transparent overlay to capture touches without visible UI.
          Platform.OS !== "web" && {backgroundColor: "transparent"},
        ]}
        onValueChange={handleOnChange}
      >
        {renderPickerItems()}
      </Picker>
    );
  }, [disabled, findSelectedItem, value, handleOnChange, renderPickerItems]);

  return (
    <View style={{alignItems: "flex-start", opacity: disabled ? 0.5 : 1}}>
      <TouchableOpacity
        accessibilityHint="Opens the options picker"
        accessibilityLabel="Open select badge options"
        aria-role="button"
        disabled={disabled}
        onPress={() => setShowPicker(!showPicker)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 20,
            width: "auto",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: theme.spacing.sm,
              flexDirection: "row",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              backgroundColor,
              height: 20,
              width: "auto",
              borderWidth,
              borderColor,
            }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 10,
                fontWeight: "700",
                fontFamily: "text",
              }}
            >
              {displayVal}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 1,
              paddingHorizontal: theme.spacing.xs,
              flexDirection: "row",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              backgroundColor,
              height: 20,
              width: "auto",
              borderWidth,
              borderLeftWidth: 1,
              borderColor: leftOfChevronBorderColor,
            }}
          >
            <Icon
              color={textColor as any}
              iconName={showPicker ? "chevron-up" : "chevron-down"}
              size="sm"
            />
          </View>
        </View>
      </TouchableOpacity>
      {Platform.OS === "ios" ? renderIosPicker() : renderPicker()}
    </View>
  );
};
