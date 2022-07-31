import moment from "moment-timezone";
import React, {ReactElement, useState} from "react";
import {ActivityIndicator, KeyboardTypeOptions, Platform, TextInput, View} from "react-native";

import {Box} from "./Box";
import {TextFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {DecimalRangeActionSheet} from "./DecimalRangeActionSheet";
import {HeightActionSheet} from "./HeightActionSheet";
import {Icon} from "./Icon";
import {NumberPickerActionSheet} from "./NumberPickerActionSheet";
import {Unifier} from "./Unifier";
import {WithLabel} from "./WithLabel";

const keyboardMap = {
  date: "default",
  email: "email-address",
  number: "number-pad",
  numberRange: "number-pad",
  decimalRange: "decimal-pad",
  decimal: "decimal-pad",
  height: "default",
  password: "default",
  search: "default",
  text: "default",
  url: Platform.select({
    ios: "url",
    android: "default",
  }),
  username: "default",
};

const textContentMap = {
  date: "none",
  email: "emailAddress",
  number: "none",
  decimal: "none",
  decimalRange: "none",
  height: "none",
  password: "password",
  search: "none",
  text: "none",
  url: Platform.select({
    ios: "URL",
    android: "none",
  }),
  username: "username",
};

export function TextField({
  value,
  height: propsHeight,
  onChange,
  paddingX,
  paddingY,
  min,
  max,
  type = "text",
  searching,
  autoComplete,
  autoFocus,
  disabled,
  errorMessage,
  errorMessageColor,
  inputRef,
  multiline,
  rows,
  placeholder,
  grow,
  label,
  labelColor,
  returnKeyType,
  onBlur,
  style,
  onEnter,
  onSubmitEditing,
}: TextFieldProps): ReactElement {
  const dateActionSheetRef: React.RefObject<any> = React.createRef();
  const numberRangeActionSheetRef: React.RefObject<any> = React.createRef();
  const decimalRangeActionSheetRef: React.RefObject<any> = React.createRef();
  const weightActionSheetRef: React.RefObject<any> = React.createRef();

  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(propsHeight || 40);

  const renderIcon = () => {
    if (type !== "search") {
      return null;
    }
    if (searching === true) {
      return (
        <Box marginRight={4}>
          <ActivityIndicator color={Unifier.theme.primary} size="small" />
        </Box>
      );
    } else {
      return (
        <Box marginRight={2}>
          <Icon name="search" prefix="far" size="md" />
        </Box>
      );
    }
  };

  let borderColor;
  if (errorMessage) {
    borderColor = Unifier.theme.red;
  } else if (focused) {
    borderColor = Unifier.theme.blue;
  } else {
    borderColor = Unifier.theme.gray;
  }

  const getHeight = () => {
    if (grow) {
      return Math.max(40, height);
    } else if (multiline) {
      return height || "100%";
    } else {
      return 40;
    }
  };
  const isHandledByModal =
    type === "date" || type === "numberRange" || type === "decimalRange" || type === "height";

  const isEditable = !disabled && !isHandledByModal;

  const shouldAutocorrect = type === "text" && (!autoComplete || autoComplete === "on");

  const keyboardType = keyboardMap[type];
  const textContentType = textContentMap[type || "text"];

  const withLabelProps = {
    label,
    labelColor,
  };
  if (type === "date") {
    value = moment(value).format("MM/DD/YYYY");
  } else if (type === "height") {
    value = `${Math.floor(Number(value) / 12)} ft, ${Number(value) % 12} in`;
  }
  return (
    <>
      <WithLabel
        label={errorMessage}
        labelColor={errorMessageColor || "red"}
        labelPlacement="after"
        labelSize="sm"
      >
        <WithLabel {...withLabelProps}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // height: 40,
              // minHeight: getHeight(),
              minHeight: getHeight(),
              width: "100%",
              // Add padding so the border doesn't mess up layouts
              paddingHorizontal: paddingX || focused ? 10 : 14,
              paddingVertical: paddingY || focused ? 0 : 4,
              borderColor,
              borderWidth: focused && !errorMessage ? 5 : 1,
              borderRadius: 16,
              backgroundColor: disabled ? Unifier.theme.gray : Unifier.theme.white,
              overflow: "hidden",
            }}
            onTouchEnd={() => {
              if (type === "date") {
                dateActionSheetRef?.current?.setModalVisible(true);
              } else if (type === "numberRange") {
                numberRangeActionSheetRef?.current?.setModalVisible(true);
              } else if (type === "decimalRange") {
                decimalRangeActionSheetRef?.current?.setModalVisible(true);
              } else if (type === "height") {
                weightActionSheetRef?.current?.setModalVisible(true);
              }
            }}
          >
            {renderIcon()}
            <TextInput
              ref={(ref) => {
                if (inputRef) {
                  inputRef(ref);
                }
              }}
              autoCapitalize={type === "text" ? "sentences" : "none"}
              autoCorrect={shouldAutocorrect}
              autoFocus={autoFocus}
              blurOnSubmit
              editable={isEditable}
              keyboardType={keyboardType as KeyboardTypeOptions}
              multiline={multiline}
              numberOfLines={rows || 4}
              placeholder={placeholder}
              placeholderTextColor={Unifier.theme.gray}
              returnKeyType={type === "number" || type === "decimal" ? "done" : returnKeyType}
              secureTextEntry={type === "password"}
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 0,
                height: getHeight(),
                width: "100%",
                color: Unifier.theme.darkGray,
                fontFamily: Unifier.theme.primaryFont,
                // Remove border in web.
                outlineWidth: 0,
                ...style,
              }}
              // For react-native-autofocus
              textContentType={textContentType}
              underlineColorAndroid="transparent"
              value={value}
              onBlur={() => {
                if (!isHandledByModal) {
                  setFocused(false);
                }
                if (onBlur && value) {
                  onBlur({value});
                }
                // if (type === "date") {
                //   actionSheetRef?.current?.setModalVisible(false);
                // }
              }}
              onChangeText={(text) => {
                onChange({value: text});
              }}
              onContentSizeChange={(event) => {
                if (!grow) {
                  return;
                }
                setHeight(event.nativeEvent.contentSize.height);
              }}
              onFocus={() => {
                if (!isHandledByModal) {
                  setFocused(true);
                }
              }}
              onSubmitEditing={() => {
                if (onEnter) {
                  onEnter();
                }
                if (onSubmitEditing) {
                  onSubmitEditing();
                }
              }}
            />
          </View>
        </WithLabel>
      </WithLabel>
      {type === "date" && Platform.OS !== "web" && (
        <DateTimeActionSheet
          actionSheetRef={dateActionSheetRef}
          mode="date"
          value={value}
          onChange={(result) => onChange(result)}
        />
      )}
      {type === "numberRange" && value && (
        <NumberPickerActionSheet
          actionSheetRef={numberRangeActionSheetRef}
          max={max || (min || 0) + 100}
          min={min || 0}
          value={value}
          onChange={(result) => onChange(result)}
        />
      )}
      {type === "decimalRange" && value && (
        <DecimalRangeActionSheet
          actionSheetRef={decimalRangeActionSheetRef}
          max={max || (min || 0) + 100}
          min={min || 0}
          value={value}
          onChange={(result) => onChange(result)}
        />
      )}
      {type === "height" && (
        <HeightActionSheet
          actionSheetRef={weightActionSheetRef}
          value={value}
          onChange={(result) => {
            onChange(result);
          }}
        />
      )}
    </>
  );
}
