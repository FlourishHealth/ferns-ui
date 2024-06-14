import React, {useContext, useEffect, useRef} from "react";
import {
  Dimensions,
  DimensionValue,
  Modal as RNModal,
  Pressable,
  Text as RNText,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";

import {Icon} from "./Icon";
import {isMobileDevice} from "./MediaQuery";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";
import {isNative} from "./Utilities";

interface ModalProps {
  onDismiss: () => void;
  visible: boolean;
  children?: React.ReactElement;
  title?: string;
  size?: "sm" | "md" | "lg";
  subTitle?: string;
  primaryButtonText?: string;
  primaryButtonOnClick?: (value?: any) => void;
  primaryButtonDisabled?: boolean;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: (value?: any) => void;
  text?: string;
}

export const Modal = ({
  onDismiss,
  visible,
  children,
  title,
  size,
  subTitle,
  primaryButtonText,
  primaryButtonOnClick,
  primaryButtonDisabled = false,
  secondaryButtonText,
  secondaryButtonOnClick,
  text,
}: ModalProps): React.ReactElement => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {theme} = useContext(ThemeContext);

  if (subTitle && !title) {
    throw new Error("Cannot render Modal with subTitle and no title");
  }
  if (!primaryButtonText && !secondaryButtonText) {
    throw new Error("Cannot render Modal without footer, primaryButtonText or secondaryButtonText");
  }

  const isMobile = isMobileDevice() && isNative();

  let sizePx: DimensionValue = 540; // sm;
  if (size === "md") {
    sizePx = 720;
  } else if (size === "lg") {
    sizePx = 900;
  }

  if (sizePx > Dimensions.get("window").width) {
    sizePx = "90%";
  }

  const modalElevation = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 24,
  };

  // Modal uses a visible prop, but ActionSheet uses a setModalVisible method on a reference.
  // Open the action sheet ref when the visible prop changes.
  useEffect(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(visible);
    }
  }, [visible, actionSheetRef]);

  const ModalContent = (
    <View
      style={{
        padding: 32,
        alignItems: "center",
        alignSelf: "center",
        zIndex: 1,
        backgroundColor: theme.surface.base,
        margin: "auto",
        borderRadius: theme.radius.default as any,
        width: sizePx,
        // is isMobile no spread operator is needed
        ...(isMobile ? {} : modalElevation),
      }}
    >
      <View style={{alignSelf: "flex-end", position: "relative"}}>
        <Pressable
          accessibilityRole="button"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -8,
            bottom: -8,
            left: -8,
            right: -8,
          }}
          onPress={onDismiss}
        >
          <Icon iconName="x" size="sm" />
        </Pressable>
      </View>
      <View style={{alignSelf: "flex-start"}}>
        <RNText
          style={{
            fontSize: 24,
            color: theme.text.primary,
            fontWeight: 700,
            fontFamily: theme.font.title,
          }}
        >
          {title}
        </RNText>
      </View>
      <View style={{alignSelf: "flex-start"}}>
        <RNText style={{marginTop: 8, fontSize: 18, fontWeight: 500, color: theme.text.primary}}>
          {subTitle}
        </RNText>
      </View>
      <View style={{marginVertical: text ? 12 : 0, alignSelf: "flex-start"}}>
        <Text>{text}</Text>
      </View>
      <View style={{alignSelf: "flex-start"}}>{children}</View>
      <View style={{marginTop: text ? 20 : 32, flexDirection: "row", alignSelf: "flex-end"}}>
        {Boolean(secondaryButtonText) && (
          <Pressable
            accessibilityRole="button"
            style={{marginRight: 20, ...theme.button.muted.container} as any}
            onPress={secondaryButtonOnClick}
          >
            <RNText style={{fontSize: 16, fontWeight: 700, color: theme.text.primary}}>
              {secondaryButtonText}
            </RNText>
          </Pressable>
        )}
        {Boolean(primaryButtonText) && (
          <Pressable
            accessibilityRole="button"
            disabled={primaryButtonDisabled}
            style={
              primaryButtonDisabled
                ? ({...theme.button.disabled.container} as any)
                : ({...theme.button.primary.container} as any)
            }
            onPress={primaryButtonOnClick}
          >
            <RNText
              style={
                primaryButtonDisabled
                  ? ({...theme.button.disabled.text} as any)
                  : ({...theme.button.primary.text} as any)
              }
            >
              {primaryButtonText}
            </RNText>
          </Pressable>
        )}
      </View>
    </View>
  );

  if (isMobile) {
    return (
      <ActionSheet ref={actionSheetRef} onClose={onDismiss}>
        <TouchableOpacity
          accessibilityRole="button"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            padding: 2,
            backgroundColor: "#9A9A9A",
            borderRadius: 5,
            width: "30%",
            height: 3,
            marginTop: 10,
          }}
          onPress={onDismiss}
        />
        {ModalContent}
      </ActionSheet>
    );
  } else {
    return (
      <RNModal animationType="slide" transparent visible={visible} onRequestClose={onDismiss}>
        {ModalContent}
      </RNModal>
    );
  }
};
