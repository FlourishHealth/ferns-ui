import {getCalendars} from "expo-localization";
import {AsYouType} from "libphonenumber-js";
import React, {ReactElement, useCallback, useContext, useMemo, useState} from "react";
import {KeyboardTypeOptions, Platform, Pressable, StyleProp, TextInput, View} from "react-native";

import {TextFieldProps, TextStyleWithOutline} from "./Common";
import {DateTimeActionSheet} from "./DateTimeActionSheet";
import {printDate, printDateAndTime, printTime} from "./DateUtilities";
import {DecimalRangeActionSheet} from "./DecimalRangeActionSheet";
import {FieldError, FieldHelperText, FieldTitle} from "./FieldElements";
import {HeightActionSheet} from "./HeightActionSheet";
import {NumberPickerActionSheet} from "./NumberPickerActionSheet";
import {ThemeContext} from "./Theme";

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
  title,
  disabled,
  helperText,
  errorText,
  value,
  onChange,
  placeholderText,
  blurOnSubmit = true,
  height: propsHeight,
  min,
  max,
  type = "text",
  autoComplete,
  inputRef,
  multiline,
  rows,
  grow,
  returnKeyType,
  onBlur,
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

  const borderColor = useMemo(() => {
    if (disabled) {
      return theme.border.activeNeutral;
    } else if (errorText) {
      return theme.border.error;
    } else {
      return focused ? theme.border.focus : theme.border.dark;
    }
  }, [
    disabled,
    errorText,
    focused,
    theme.border.activeNeutral,
    theme.border.dark,
    theme.border.error,
    theme.border.focus,
  ]);

  const getHeight = useCallback(() => {
    if (grow) {
      return Math.max(40, height);
    } else if (multiline) {
      return height || "100%";
    } else {
      return 20;
    }
  }, [grow, height, multiline]);

  const defaultTextInputStyles = useMemo(() => {
    const defaultStyles: StyleProp<TextStyleWithOutline> = {
      flex: 1,
      width: "100%",
      height: getHeight(),
      color: theme.text.primary,
      fontFamily: theme.font.primary,
      fontSize: 16,
      paddingVertical: 0,
    };

    if (Platform.OS === "web") {
      defaultStyles.outline = "none";
    }

    return defaultStyles;
  }, [getHeight, theme.text.primary, theme.font.primary]);

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
    <View>
      <Wrapper
        style={{
          flexDirection: "column",
          // minHeight: getHeight(),
          width: "100%",
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
        {title && <FieldTitle text={title} />}
        {Boolean(errorText) && errorText && <FieldError text={errorText} />}
        <Wrapper
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: disabled ? theme.surface.neutralLight : theme.surface.base,
            borderColor,
            borderWidth: focused ? 3 : 1,
            paddingHorizontal: focused ? 10 : 12,
            paddingVertical: focused ? 6 : 8,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <TextInput
            ref={(ref) => {
              if (inputRef) {
                inputRef(ref);
              }
            }}
            accessibilityHint="Enter text here"
            accessibilityLabel="Text input field"
            autoCapitalize={type === "text" ? "sentences" : "none"}
            autoCorrect={shouldAutocorrect}
            blurOnSubmit={blurOnSubmit}
            editable={isEditable}
            keyboardType={keyboardType as KeyboardTypeOptions}
            multiline={multiline}
            numberOfLines={rows || 4}
            placeholder={placeholderText}
            placeholderTextColor={theme.text.secondaryLight}
            returnKeyType={type === "number" || type === "decimal" ? "done" : returnKeyType}
            secureTextEntry={type === "password"}
            style={defaultTextInputStyles}
            testID={testID}
            textContentType={textContentType}
            underlineColorAndroid="transparent"
            value={displayValue}
            onBlur={() => {
              if (disabled) return;
              if (!isHandledByModal) {
                setFocused(false);
              }
              if (onBlur) {
                onBlur({value: value ?? ""});
              }
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
        {helperText && <FieldHelperText text={helperText} />}
      </Wrapper>
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
    </View>
  );
};
