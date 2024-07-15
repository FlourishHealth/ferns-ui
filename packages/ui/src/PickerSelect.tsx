// MIT License

// Copyright (c) LawnStarter

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Forked 2021/11/26 by Josh Gachnang <josh@nang.io> from version 8.0.3 because it conflicted
// with react-native-picker in Expo, then converted to TS.

import {Picker} from "@react-native-picker/picker";
import isEqual from "lodash/isEqual";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  Keyboard,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {Icon} from "./Icon";
import {useTheme} from "./Theme";

export const defaultStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
  },

  chevron: {
    width: 15,
    height: 15,
    backgroundColor: "transparent",
    borderColor: "#a1a1a1",
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
  },

  chevronActive: {
    borderColor: "#007aff",
  },
});

export interface RNPickerSelectProps {
  onValueChange: (value: any, index: any) => void;
  items: any[];
  value?: any;
  placeholder?: any;
  disabled?: boolean;
  itemKey?: string | number;
  children?: any;
  onOpen?: () => void;
  useNativeAndroidPickerStyle?: boolean;
  fixAndroidTouchableBug?: boolean;

  // Custom Modal props (iOS only)
  doneText?: string;
  onDonePress?: () => void;
  onUpArrow?: () => void;
  onDownArrow?: () => void;
  onClose?: () => void;

  // Modal props (iOS only)
  modalProps?: any;

  // TextInput props
  textInputProps?: any;

  // Touchable Done props (iOS only)
  touchableDoneProps?: any;

  // Touchable wrapper props
  touchableWrapperProps?: any;

  InputAccessoryView?: any;
}

export function RNPickerSelect({
  onValueChange,
  value,
  items,
  placeholder,
  disabled = false,
  itemKey,
  children,
  useNativeAndroidPickerStyle = true,
  fixAndroidTouchableBug = false,
  doneText = "Done",
  onDonePress,
  onUpArrow,
  onDownArrow,
  onOpen,
  onClose,
  modalProps,
  textInputProps,
  touchableDoneProps,
  touchableWrapperProps,

  InputAccessoryView,
}: RNPickerSelectProps) {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [animationType, setAnimationType] = useState(undefined);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [doneDepressed, setDoneDepressed] = useState<boolean>(false);
  const {theme} = useTheme();

  const options = useMemo(() => {
    if (isEqual(placeholder, {})) {
      return [...items];
    } else {
      return [placeholder, ...items];
    }
  }, [items, placeholder]);

  const getSelectedItem = useCallback(
    (key: any, val: any) => {
      let idx = options.findIndex((item: any) => {
        if (item.key && key) {
          return isEqual(item.key, key);
        }
        return isEqual(item.value, val);
      });
      if (idx === -1) {
        idx = 0;
      }
      return {
        selectedItem: options[idx] || {},
        idx,
      };
    },
    [options]
  );

  // Set selected item
  useEffect(() => {
    const item = getSelectedItem(itemKey, value);
    setSelectedItem(item.selectedItem);
  }, [getSelectedItem, itemKey, value]);

  const onUpArrowEvent = () => {
    togglePicker(false, onUpArrow);
  };

  const onDownArrowEvent = () => {
    togglePicker(false, onDownArrow);
  };

  const onValueChangeEvent = (val: any, index: any) => {
    const item = getSelectedItem(itemKey, val);
    onValueChange(val, index);
    setSelectedItem(item.selectedItem);
  };

  const onOrientationChange = ({nativeEvent}: any) => {
    setOrientation(nativeEvent.orientation);
  };

  const triggerOpenCloseCallbacks = () => {
    if (!showPicker && onOpen) {
      onOpen();
    }

    if (showPicker && onClose) {
      onClose();
    }
  };

  const togglePicker = (animate = false, postToggleCallback?: any) => {
    if (disabled) {
      return;
    }

    if (!showPicker) {
      Keyboard.dismiss();
    }

    setAnimationType(modalProps && modalProps?.animationType ? modalProps?.animationType : "slide");

    triggerOpenCloseCallbacks();

    setAnimationType(animate ? animationType : undefined);
    setShowPicker(!showPicker);

    if (postToggleCallback) {
      postToggleCallback();
    }
  };

  const renderPickerItems = () => {
    return options?.map((item: any) => {
      return (
        <Picker.Item
          key={item.key || item.label}
          color={item.color}
          label={item.label}
          value={item.value}
        />
      );
    });
  };

  const renderInputAccessoryView = () => {
    if (InputAccessoryView) {
      return <InputAccessoryView testID="custom_input_accessory_view" />;
    }

    return (
      <View
        style={{
          height: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: "#f8f8f8",
          borderTopWidth: 1,
          borderTopColor: "#dedede",
          zIndex: 2,
        }}
        testID="input_accessory_view"
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {Boolean(onUpArrow) && (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={onUpArrow ? 0.5 : 1}
              onPress={onUpArrow ? onUpArrowEvent : undefined}
            >
              <View
                // chevron up
                style={[
                  defaultStyles.chevron,
                  {
                    marginLeft: 11,
                    transform: [{translateY: 4}, {rotate: "-45deg"}],
                  },
                  onUpArrow ? [defaultStyles.chevronActive] : {},
                ]}
              />
            </TouchableOpacity>
          )}
          {Boolean(onDownArrow) && (
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={onDownArrow ? 0.5 : 1}
              onPress={onDownArrow ? onDownArrowEvent : undefined}
            >
              <View
                // chevron down
                style={[
                  defaultStyles.chevron,
                  {
                    marginLeft: 22,
                    transform: [{translateY: -5}, {rotate: "135deg"}],
                  },
                  onDownArrow ? [defaultStyles.chevronActive] : {},
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
        <Pressable
          hitSlop={{top: 4, right: 4, bottom: 4, left: 4}}
          testID="done_button"
          onPress={() => {
            togglePicker(true, onDonePress);
          }}
          onPressIn={() => {
            setDoneDepressed(true);
          }}
          onPressOut={() => {
            setDoneDepressed(false);
          }}
          {...touchableDoneProps}
        >
          <View testID="needed_for_touchable">
            <Text
              allowFontScaling={false}
              style={[
                {
                  color: "#007aff",
                  fontWeight: "600",
                  fontSize: 17,
                  paddingTop: 1,
                  paddingRight: 11,
                },
                doneDepressed
                  ? {
                      fontSize: 19,
                    }
                  : {},
              ]}
              testID="done_text"
            >
              {doneText}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderIcon = () => {
    // Icon only needed for iOS, web and android use default icons
    if (Platform.OS !== "ios") {
      return null;
    }

    return (
      <View style={{pointerEvents: "none"}} testID="icon_container">
        <Icon color={disabled ? "secondaryLight" : "primary"} iconName="angle-down" size="sm" />
      </View>
    );
  };

  const renderTextInputOrChildren = () => {
    if (children) {
      return <View style={{pointerEvents: "box-only"}}>{children}</View>;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          pointerEvents: "box-only",
          width: "100%",
        }}
      >
        <TextInput
          editable={false}
          style={{color: disabled ? theme.text.secondaryLight : theme.text.primary}}
          testID="text_input"
          value={selectedItem?.inputLabel ? selectedItem?.inputLabel : selectedItem?.label}
          {...textInputProps}
        />
        {renderIcon()}
      </View>
    );
  };

  const renderIOS = () => {
    return (
      <View
        style={[
          defaultStyles.viewContainer,
          {
            borderColor: theme.border.dark,
            backgroundColor: theme.surface.base,
          },
          disabled && {
            backgroundColor: theme.surface.neutralLight,
          },
        ]}
      >
        <Pressable
          activeOpacity={1}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 40,
            width: "95%",
          }}
          testID="ios_touchable_wrapper"
          onPress={() => {
            togglePicker(true);
          }}
          {...touchableWrapperProps}
        >
          {renderTextInputOrChildren()}
        </Pressable>
        <Modal
          animationType={animationType}
          supportedOrientations={["portrait", "landscape"]}
          testID="ios_modal"
          transparent
          visible={showPicker}
          onOrientationChange={onOrientationChange}
          {...modalProps}
        >
          <Pressable
            accessibilityRole="button"
            style={{
              flex: 1,
            }}
            testID="ios_modal_top"
            onPress={() => {
              togglePicker(true);
            }}
          />
          {renderInputAccessoryView()}
          <View
            style={[
              {
                justifyContent: "center",
                backgroundColor: "#d0d4da",
              },
              {height: orientation === "portrait" ? 215 : 162},
            ]}
          >
            <Picker
              selectedValue={selectedItem?.value}
              testID="ios_picker"
              onValueChange={onValueChangeEvent}
            >
              {renderPickerItems()}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  };

  const renderAndroidHeadless = () => {
    const Component: any = fixAndroidTouchableBug ? View : Pressable;
    return (
      <Component
        activeOpacity={1}
        testID="android_touchable_wrapper"
        onPress={onOpen}
        {...touchableWrapperProps}
      >
        <View>
          {renderTextInputOrChildren()}
          <Picker
            enabled={!disabled}
            selectedValue={selectedItem?.value}
            style={[
              Platform.OS !== "web" ? {backgroundColor: "transparent"} : {}, // to hide native icon
              {
                position: "absolute",
                width: "100%",
                height: "100%",
                color: "transparent",
                opacity: 0,
              },
            ]}
            testID="android_picker_headless"
            onValueChange={onValueChangeEvent}
          >
            {renderPickerItems()}
          </Picker>
        </View>
      </Component>
    );
  };

  const renderAndroidNativePickerStyle = () => {
    return (
      <View
        style={[
          defaultStyles.viewContainer,
          {
            height: 40,
            borderColor: theme.border.dark,
            backgroundColor: theme.surface.base,
          },
          disabled && {
            backgroundColor: theme.surface.neutralLight,
          },
        ]}
      >
        <Picker
          enabled={!disabled}
          selectedValue={selectedItem?.value}
          style={[
            Platform.OS !== "web" ? {backgroundColor: "transparent"} : {}, // to hide native icon
            {width: "100%", color: theme.text.primary},
          ]}
          testID="android_picker"
          onValueChange={onValueChangeEvent}
        >
          {renderPickerItems()}
        </Picker>
      </View>
    );
  };

  // TODO: Create custom React component for web in order to apply library style rules
  const renderWeb = () => {
    return (
      <View
        style={[
          defaultStyles.viewContainer,
          {
            borderColor: theme.border.dark,
            backgroundColor: theme.surface.base,
          },
          disabled && {
            backgroundColor: theme.surface.neutralLight,
          },
        ]}
      >
        <Picker
          enabled={!disabled}
          selectedValue={selectedItem?.value}
          style={[
            {
              width: "100%",
              height: "100%",
              borderWidth: 0,
              paddingHorizontal: 8,
              paddingVertical: 8,
              borderRadius: 4,
              backgroundColor: theme.surface.base,
              borderColor: "black",
            },
            disabled && {
              color: theme.text.secondaryLight,
              backgroundColor: theme.surface.neutralLight,
              opacity: 1,
            },
          ]}
          testID="web_picker"
          onValueChange={onValueChangeEvent}
        >
          {renderPickerItems()}
        </Picker>
      </View>
    );
  };

  const render = () => {
    if (Platform.OS === "ios") {
      return renderIOS();
    }

    if (Platform.OS === "web") {
      return renderWeb();
    }

    if (children || !useNativeAndroidPickerStyle) {
      return renderAndroidHeadless();
    }

    return renderAndroidNativePickerStyle();
  };

  return render();
}
