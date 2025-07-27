import {getCalendars} from "expo-localization";
import React, {useMemo, useState} from "react";
import {
  DimensionValue,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleProp,
  TextInput,
  View,
} from "react-native";

import {TextFieldProps, TextStyleWithOutline} from "./Common";
import {FieldError, FieldHelperText, FieldTitle} from "./fieldElements";
import {Icon} from "./Icon";
import {useTheme} from "./Theme";

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

export const TextField: React.FC<TextFieldProps> = ({
  title,
  disabled,
  helperText,
  errorText,
  value,
  onChange,
  placeholder,
  blurOnSubmit = true,
  iconName,
  onIconClick,
  type = "text",
  autoComplete,
  inputRef,
  multiline,
  rows = 1,
  grow,
  returnKeyType,
  onBlur,
  onFocus,
  onEnter,
  onSubmitEditing,
  testID,
}) => {
  const {theme} = useTheme();

  const calendar = getCalendars()[0];
  const localTimeZone = calendar?.timeZone;
  if (!localTimeZone) {
    console.warn("Could not automatically determine timezone.");
  }

  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(rows * 40);

  let borderColor = focused ? theme.border.focus : theme.border.dark;
  if (disabled) {
    borderColor = theme.border.activeNeutral;
  } else if (errorText) {
    borderColor = theme.border.error;
  }

  const calculatedHeight: DimensionValue = useMemo(() => {
    if (grow) {
      return Math.max(40, height);
    } else if (multiline) {
      return height || "100%";
    } else {
      return 20;
    }
  }, [grow, height, multiline]);

  const defaultTextInputStyles = useMemo(() => {
    const style: StyleProp<TextStyleWithOutline> = {
      flex: 1,
      width: "100%",
      height: calculatedHeight,
      color: theme.text.primary,
      fontFamily: "text",
      fontSize: 16,
      paddingVertical: 0,
      gap: 10,
    };

    if (Platform.OS === "web") {
      style.outline = "none";
    }
    return style;
  }, [calculatedHeight, theme.text.primary]);

  if (["numberRange", "decimalRange", "height"].includes(type)) {
    console.warn(`${type} is not yet supported`);
  }

  const shouldAutocorrect =
    ["text", "textarea"].includes(type) && (!autoComplete || autoComplete === "on");

  const keyboardType = keyboardMap[type];
  const textContentType = textContentMap[type || "text"];

  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
      }}
    >
      {Boolean(title) && <FieldTitle text={title!} />}
      {Boolean(errorText) && <FieldError text={errorText!} />}
      <View
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
          accessibilityState={{disabled}}
          aria-label="Text input field"
          autoCapitalize={type === "text" ? "sentences" : "none"}
          autoCorrect={shouldAutocorrect}
          blurOnSubmit={blurOnSubmit}
          enterKeyHint={returnKeyType}
          keyboardType={keyboardType as KeyboardTypeOptions}
          multiline={multiline}
          numberOfLines={rows || 4}
          placeholder={placeholder}
          placeholderTextColor={theme.text.secondaryLight}
          readOnly={disabled}
          secureTextEntry={type === "password"}
          style={defaultTextInputStyles}
          testID={testID}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          value={value}
          onBlur={() => {
            if (disabled) return;
            if (onBlur) {
              onBlur(value ?? "");
            }
            setFocused(false);
          }}
          onChangeText={onChange}
          onContentSizeChange={(event) => {
            if (!grow) {
              return;
            }
            setHeight(event.nativeEvent.contentSize.height);
          }}
          onFocus={() => {
            if (!disabled) {
              setFocused(true);
            }
            if (onFocus) {
              onFocus();
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
        {Boolean(iconName) && (
          <Pressable aria-role="button" onPress={onIconClick}>
            <Icon iconName={iconName!} size="md" />
          </Pressable>
        )}
      </View>
      {Boolean(helperText) && <FieldHelperText text={helperText!} />}
      {/* {type === "numberRange" && value && (
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
      )} */}
      {/* {type === "height" && (
        <HeightActionSheet
          actionSheetRef={weightActionSheetRef}
          value={value}
          onChange={(result) => {
            onChange(result);
          }}
        />
      )} */}
    </View>
  );
};
