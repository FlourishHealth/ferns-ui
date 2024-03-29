import {getCalendars} from "expo-localization";
import {AsYouType} from "libphonenumber-js";
import React, {ReactElement, useCallback, useContext, useMemo, useState} from "react";
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";

import {Box} from "./Box";
import {TextFieldProps} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {printDate, printDateAndTime, printTime} from "./DateUtilities";
import {DecimalRangeActionSheet} from "./DecimalRangeActionSheet";
import {HeightActionSheet} from "./HeightActionSheet";
import {Icon} from "./Icon";
import {NumberPickerActionSheet} from "./NumberPickerActionSheet";
import {ThemeContext} from "./Theme";
import {WithLabel} from "./WithLabel";

const keyboardMap: {[id: string]: string | undefined} = {
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

// Not an exhaustive list of all the textContent types, but the ones we use.
const textContentMap: {
  [id: string]: "none" | "emailAddress" | "password" | "username" | "URL" | undefined;
} = {
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

export const TextField = ({
  blurOnSubmit = true,
  value,
  height: propsHeight,
  onChange,
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
  testID,
  transformValue,
}: TextFieldProps): ReactElement => {
  const {theme} = useContext(ThemeContext);

  const dateActionSheetRef: React.RefObject<any> = React.createRef();
  const numberRangeActionSheetRef: React.RefObject<any> = React.createRef();
  const decimalRangeActionSheetRef: React.RefObject<any> = React.createRef();
  const weightActionSheetRef: React.RefObject<any> = React.createRef();

  const calendar = getCalendars()[0];
  const localTimeZone = calendar?.timeZone;
  if (!localTimeZone) {
    console.warn("Could not automatically determine timezone.");
  }

  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(propsHeight || 40);
  const [showDate, setShowDate] = useState(false);

  const renderIcon = () => {
    if (type !== "search") {
      return null;
    }
    if (searching) {
      return (
        <Box marginRight={4}>
          <ActivityIndicator color={theme.primary} size="small" />
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
    borderColor = theme.red;
  } else if (focused) {
    borderColor = theme.blue;
  } else {
    borderColor = theme.gray;
  }

  const getHeight = useCallback(() => {
    if (grow) {
      return Math.max(40, height);
    } else if (multiline) {
      return height || "100%";
    } else {
      return 40;
    }
  }, [grow, height, multiline]);

  const defaultTextInputStyles = useMemo(() => {
    const defaultStyles = {
      flex: 1,
      paddingTop: 4,
      paddingRight: 4,
      paddingBottom: 4,
      paddingLeft: 0,
      height: getHeight(),
      width: "100%",
      color: theme.darkGray,
      fontFamily: theme.primaryFont,
      ...style,
    };

    if (Platform.OS === "web") {
      defaultStyles.outline = 0;
    }

    return defaultStyles;
  }, [getHeight, style, theme.darkGray, theme.primaryFont]);

  const isHandledByModal = [
    "date",
    "datetime",
    "time",
    "numberRange",
    "decimalRange",
    "height",
  ].includes(type);

  const isEditable = !disabled && !isHandledByModal;

  const shouldAutocorrect = type === "text" && (!autoComplete || autoComplete === "on");

  const keyboardType = keyboardMap[type];
  const textContentType = textContentMap[type || "text"];

  const withLabelProps = {
    label,
    labelColor,
  };

  const onTap = useCallback((): void => {
    if (disabled) {
      return;
    }
    if (["date", "datetime", "time"].includes(type)) {
      setShowDate(true);
    } else if (type === "numberRange") {
      numberRangeActionSheetRef?.current?.show();
    } else if (type === "decimalRange") {
      decimalRangeActionSheetRef?.current?.show();
    } else if (type === "height") {
      weightActionSheetRef?.current?.show();
    }
  }, [decimalRangeActionSheetRef, disabled, numberRangeActionSheetRef, type, weightActionSheetRef]);

  let displayValue = value;
  if (value) {
    const timezone = transformValue?.options?.timezone || localTimeZone;

    if (type === "date") {
      displayValue = printDate(value, {ignoreTime: true});
    } else if (type === "time") {
      displayValue = printTime(value, {timezone, showTimezone: true});
    } else if (type === "datetime") {
      displayValue = printDateAndTime(value, {timezone, showTimezone: true});
    } else if (type === "height") {
      displayValue = `${Math.floor(Number(value) / 12)} ft, ${Number(value) % 12} in`;
    } else if (type === "phoneNumber") {
      // By default, if a value is something like `"(123)"`
      // then Backspace would only erase the rightmost brace
      // becoming something like `"(123"`
      // which would give the same `"123"` value
      // which would then be formatted back to `"(123)"`
      // and so a user wouldn't be able to erase the phone number.
      // This is the workaround for that.
      const formattedPhoneNumber = new AsYouType("US").input(value);
      if (displayValue !== formattedPhoneNumber && value.length !== 4) {
        displayValue = formattedPhoneNumber;
      }
    }
  } else {
    // Set some default values for modal-edited fields so we don't go from uncontrolled to
    // controlled when setting the date.
    if (["date", "datetime", "time"].includes(type)) {
      displayValue = "";
    }
  }

  const Wrapper = isHandledByModal ? Pressable : View;

  return (
    <>
      <WithLabel
        label={errorMessage}
        labelColor={errorMessageColor || "red"}
        labelPlacement="after"
        labelSize="sm"
      >
        <WithLabel {...withLabelProps}>
          <Wrapper
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // height: multiline || grow ? undefined : 40,
              minHeight: getHeight(),
              width: "100%",
              // Add padding so the border doesn't mess up layouts
              paddingHorizontal: focused ? 10 : 14,
              paddingVertical: focused ? 0 : 4,
              borderColor,
              borderWidth: focused ? 5 : 1,
              borderRadius: 16,
              backgroundColor: disabled ? theme.gray : theme.white,
              overflow: "hidden",
            }}
            onPress={() => {
              // This runs on web
              onTap();
            }}
            onTouchStart={() => {
              // This runs on mobile
              onTap();
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
              placeholderTextColor={theme.gray}
              returnKeyType={type === "number" || type === "decimal" ? "done" : returnKeyType}
              secureTextEntry={type === "password"}
              style={defaultTextInputStyles}
              testID={testID}
              textContentType={textContentType}
              underlineColorAndroid="transparent"
              value={displayValue}
              onBlur={() => {
                if (!isHandledByModal) {
                  setFocused(false);
                }
                if (onBlur) {
                  onBlur({value: value ?? ""});
                }
                // if (type === "date") {
                //   actionSheetRef?.current?.hide();
                // }
              }}
              onChangeText={(text) => {
                if (!onChange) {
                  return;
                }
                if (type === "phoneNumber") {
                  const formattedPhoneNumber = new AsYouType("US").input(text);
                  // another workaround for the same issue as above with backspacing phone numbers
                  if (formattedPhoneNumber === value) {
                    onChange({value: text});
                  } else {
                    onChange({value: formattedPhoneNumber});
                  }
                } else if (type === "number") {
                  text = text.replace(/[^0-9]/g, "");
                  onChange({value: !isNaN(parseInt(text)) ? parseInt(text).toString() : ""});
                } else if (type === "date" || type === "datetime" || type === "time") {
                  // Do nothing, this is handled by the date time action sheet
                } else {
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
          </Wrapper>
        </WithLabel>
      </WithLabel>
      {(type === "date" || type === "time" || type === "datetime") && (
        <DateTimeActionSheet
          actionSheetRef={dateActionSheetRef}
          mode={type}
          transformValue={transformValue}
          value={value}
          visible={showDate}
          onChange={(result) => {
            onChange(result);
            setShowDate(false);
            setFocused(false);
          }}
          onDismiss={() => setShowDate(false)}
        />
      )}
      {/* {type === "date" && showDate && ( */}
      {/*  <Box maxWidth={300}> */}
      {/*    /!* TODO: Calendar should disappear when you click away from it. *!/ */}
      {/*    <Calendar */}
      {/*      customHeader={CalendarHeader} */}
      {/*      initialDate={value} */}
      {/*      onDayPress={(day: any) => { */}
      {/*        onChange({value: day.dateString}); */}
      {/*        setShowDate(false); */}
      {/*      }} */}
      {/*    /> */}
      {/*  </Box> */}
      {/* )} */}
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
};
