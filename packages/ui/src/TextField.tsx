import {
  AsYouType,
  isValidPhoneNumber,
  parsePhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import moment from "moment-timezone";
import React, {ReactElement, useState} from "react";
import {ActivityIndicator, KeyboardTypeOptions, Platform, TextInput, View} from "react-native";
import {Calendar} from "react-native-calendars";

import {Box} from "./Box";
import {TextFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {DecimalRangeActionSheet} from "./DecimalRangeActionSheet";
import {Heading} from "./Heading";
import {HeightActionSheet} from "./HeightActionSheet";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";
import {NumberPickerActionSheet} from "./NumberPickerActionSheet";
import {Unifier} from "./Unifier";
import {WithLabel} from "./WithLabel";

function CalendarHeader(props: any) {
  const {addMonth, month} = props;
  const displayDate = moment(month[0]).format("MMM YYYY");
  return (
    <Box alignItems="center" direction="row" height={40} justifyContent="between" width="100%">
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-double-left"
        iconColor="blue"
        size="md"
        onClick={() => {
          addMonth(-12);
        }}
      />
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-left"
        iconColor="blue"
        size="md"
        onClick={() => {
          addMonth(-1);
        }}
      />
      <Heading size="sm">{displayDate}</Heading>
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-right"
        iconColor="blue"
        size="md"
        onClick={() => {
          addMonth(1);
        }}
      />
      <IconButton
        accessibilityLabel="arrow"
        bgColor="white"
        icon="angle-double-right"
        iconColor="blue"
        size="md"
        onClick={() => {
          addMonth(12);
        }}
      />
    </Box>
  );
}

const keyboardMap = {
  date: "default",
  email: "email-address",
  number: "number-pad",
  numberRange: "number-pad",
  decimalRange: "decimal-pad",
  decimal: "decimal-pad",
  height: "default",
  password: "default",
  phoneNumber: "number-pad",
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
  blurOnSubmit = true,
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
  const [showDate, setShowDate] = useState(false);
  const [internalError, setInternalError] = useState("");

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
  } else if (type === "phoneNumber") {
    console.log("TEXT", value, isValidPhoneNumber(value ?? "", "US"));
    if (isValidPhoneNumber(value ?? "", "US")) {
      // setInternalError("");
    } else if (validatePhoneNumberLength(value ?? "", "US") === "TOO_LONG") {
      // setInternalError("Phone number too long");
    } else if (validatePhoneNumberLength(value ?? "", "US") === "TOO_SHORT") {
      // We don't want to set an error here, the user is still typing.
    } else {
      // Clear error if it exists.
      // setInternalError("");
    }

    // TODO: Support international phone numbers.
    value = new AsYouType("US").input(value ?? "");
  }

  return (
    <>
      <WithLabel
        label={errorMessage || internalError}
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
              blurOnSubmit={blurOnSubmit}
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
                if (onChange) {
                  if (type === "phoneNumber") {
                    try {
                      // Try to format the number like +1234567890
                      // onChange({value: });
                      // console.log("VAL", );
                      text = parsePhoneNumber(value ?? "", "US").number;
                    } catch (e) {
                      console.error(e);
                      // If it isn't a valid phone number, pass as is.
                    }
                  }
                  onChange({value: text});
                }
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
                if (Platform.OS === "web" && type === "date") {
                  setShowDate(true);
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
      {type === "date" && Platform.OS === "web" && showDate && (
        <Box maxWidth={300}>
          {/* TODO: Calendar should disappear when you click away from it. */}
          <Calendar
            customHeader={CalendarHeader}
            initialDate={value}
            onDayPress={(day: any) => {
              onChange({value: day.dateString});
              setShowDate(false);
            }}
          />
        </Box>
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
