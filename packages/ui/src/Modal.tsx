import React, {FC, useEffect, useRef} from "react";
import {Dimensions, DimensionValue, Modal as RNModal, Pressable, View} from "react-native";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

import {Button} from "./Button";
import {ModalProps} from "./Common";
import {Heading} from "./Heading";
import {Icon} from "./Icon";
import {isMobileDevice} from "./MediaQuery";
import {Text} from "./Text";
import {useTheme} from "./Theme";
import {isNative} from "./Utilities";

const getModalSize = (size: "sm" | "md" | "lg"): DimensionValue => {
  const sizeMap = {
    sm: 540,
    md: 720,
    lg: 900,
  };
  let sizePx: DimensionValue = sizeMap[size] || sizeMap.sm;
  if (sizePx > Dimensions.get("window").width) {
    sizePx = "90%";
  }
  return sizePx;
};

const ModalContent: FC<{
  children?: ModalProps["children"];
  title?: ModalProps["title"];
  subtitle?: ModalProps["subtitle"];
  text?: ModalProps["text"];
  primaryButtonText?: ModalProps["primaryButtonText"];
  primaryButtonDisabled?: ModalProps["primaryButtonDisabled"];
  secondaryButtonText?: ModalProps["secondaryButtonText"];
  primaryButtonOnClick?: ModalProps["primaryButtonOnClick"];
  secondaryButtonOnClick?: ModalProps["secondaryButtonOnClick"];
  onDismiss: ModalProps["onDismiss"];
  sizePx: DimensionValue;
  theme: any;
  isMobile: boolean;
}> = ({
  children,
  title,
  subtitle,
  text,
  primaryButtonText,
  primaryButtonDisabled,
  secondaryButtonText,
  primaryButtonOnClick,
  secondaryButtonOnClick,
  onDismiss,
  sizePx,
  theme,
  isMobile,
}) => {
  return (
    <View
      style={{
        padding: 32,
        alignItems: "center",
        alignSelf: "center",
        zIndex: 1,
        backgroundColor: theme.surface.base,
        margin: "auto",
        borderRadius: theme.radius.default,
        width: sizePx,
        ...(isMobile
          ? {}
          : {
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.5)",
              elevation: 24,
            }),
      }}
    >
      <View style={{alignSelf: "flex-end", position: "relative"}}>
        <Pressable
          accessibilityHint="Closes the modal"
          aria-label="Close modal"
          aria-role="button"
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
      {title && (
        <View
          accessibilityHint="Modal title"
          aria-label={title}
          aria-role="header"
          style={{alignSelf: "flex-start"}}
        >
          <Heading size="lg">{title}</Heading>
        </View>
      )}
      {subtitle && (
        <View
          accessibilityHint="Modal Sub Heading Text"
          aria-label={subtitle}
          aria-role="text"
          style={{alignSelf: "flex-start", marginTop: subtitle ? 8 : 0}}
        >
          <Text size="lg">{subtitle}</Text>
        </View>
      )}
      {text && (
        <View
          accessibilityHint="Modal body text"
          aria-label={text}
          aria-role="text"
          style={{marginVertical: text ? 12 : 0, alignSelf: "flex-start"}}
        >
          <Text>{text}</Text>
        </View>
      )}
      {children && (
        <View aria-role="text" style={{marginTop: text ? 0 : 12, width: "100%"}}>
          {children}
        </View>
      )}
      <View
        style={{
          marginTop: text && !children ? 20 : 32,
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      >
        {Boolean(secondaryButtonText && secondaryButtonOnClick) && (
          <View style={{marginRight: primaryButtonText ? 20 : 0}}>
            <Button
              text={secondaryButtonText as string}
              variant="muted"
              onClick={secondaryButtonOnClick!}
            />
          </View>
        )}
        {Boolean(primaryButtonText && primaryButtonOnClick) && (
          <Button
            disabled={primaryButtonDisabled}
            text={primaryButtonText as string}
            onClick={primaryButtonOnClick!}
          />
        )}
      </View>
    </View>
  );
};

export const Modal: FC<ModalProps> = ({
  children,
  primaryButtonDisabled = false,
  primaryButtonText,
  secondaryButtonText,
  size = "sm",
  subtitle,
  text,
  title,
  visible,
  onDismiss,
  primaryButtonOnClick,
  secondaryButtonOnClick,
}: ModalProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {theme} = useTheme();

  const onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.END && nativeEvent.translationY > 100) {
      onDismiss();
    }
  };

  // Open the action sheet ref when the visible prop changes.
  useEffect(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(visible);
    }
  }, [visible]);

  const isMobile = isMobileDevice() && isNative();
  const sizePx = getModalSize(size);

  const modalContentProps = {
    title,
    subtitle,
    text,
    primaryButtonText,
    primaryButtonDisabled,
    secondaryButtonText,
    primaryButtonOnClick,
    secondaryButtonOnClick,
    onDismiss,
    sizePx,
    theme,
    isMobile,
  };

  if (isMobile) {
    return (
      <ActionSheet ref={actionSheetRef} onClose={onDismiss}>
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
          <View>
            <View
              accessibilityHint="Pull down to close the modal"
              aria-label="Pull down bar"
              aria-role="adjustable"
              style={{
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
            />
            <ModalContent {...modalContentProps}>{children}</ModalContent>
          </View>
        </PanGestureHandler>
      </ActionSheet>
    );
  } else {
    return (
      <RNModal animationType="slide" transparent visible={visible} onRequestClose={onDismiss}>
        <ModalContent {...modalContentProps}>{children}</ModalContent>
      </RNModal>
    );
  }
};
