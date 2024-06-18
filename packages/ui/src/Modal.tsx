import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {
  Animated,
  Dimensions,
  DimensionValue,
  Modal as RNModal,
  Pressable,
  View,
} from "react-native";
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
import {ThemeContext} from "./Theme";
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
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  text?: string;
  primaryButtonText?: string;
  primaryButtonDisabled?: boolean;
  secondaryButtonText?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonOnClick?: () => void;
  onDismiss: () => void;
  sizePx: DimensionValue;
  theme: any;
  isMobile: boolean;
}> = ({
  children,
  title,
  subTitle,
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
        borderRadius: theme.radius.default as any,
        width: sizePx,
        ...(isMobile
          ? {}
          : {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.5,
              shadowRadius: 24,
              elevation: 24,
            }),
      }}
    >
      <View style={{alignSelf: "flex-end", position: "relative"}}>
        <Pressable
          accessibilityHint="Closes the modal"
          accessibilityLabel="Close modal"
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
      {title && (
        <View
          accessibilityHint="Modal title"
          accessibilityLabel={title}
          accessibilityRole="header"
          style={{alignSelf: "flex-start"}}
        >
          <Heading size="lg">{title}</Heading>
        </View>
      )}
      {subTitle && (
        <View
          accessibilityHint="Modal Sub Heading Text"
          accessibilityLabel={subTitle}
          accessibilityRole="text"
          style={{alignSelf: "flex-start", marginTop: subTitle ? 8 : 0}}
        >
          <Text size="lg">{subTitle}</Text>
        </View>
      )}
      {text && (
        <View
          accessibilityHint="Modal body text"
          accessibilityLabel={text}
          accessibilityRole="text"
          style={{marginVertical: text ? 12 : 0, alignSelf: "flex-start"}}
        >
          <Text>{text}</Text>
        </View>
      )}
      {children && (
        <View accessibilityRole="text" style={{alignSelf: "flex-start", marginTop: text ? 0 : 12}}>
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
              onClick={secondaryButtonOnClick as () => void}
            />
          </View>
        )}
        {Boolean(primaryButtonText && primaryButtonOnClick) && (
          <Button
            disabled={primaryButtonDisabled}
            text={primaryButtonText as string}
            onClick={primaryButtonOnClick as () => void}
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
  subTitle,
  text,
  title,
  visible,
  onDismiss,
  primaryButtonOnClick,
  secondaryButtonOnClick,
}: ModalProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {theme} = useContext(ThemeContext);
  const translateY = useRef(new Animated.Value(0)).current;
  const [contentVisible, setContentVisible] = useState(visible);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true}
  );

  const onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        Animated.timing(translateY, {
          toValue: Dimensions.get("window").height,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setContentVisible(false);
          onDismiss();
          translateY.setValue(0); // Reset for next opening
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  // Open the action sheet ref when the visible prop changes.
  useEffect(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(visible);
    }
    if (visible) {
      setContentVisible(true);
    }
  }, [visible]);

  const isMobile = isMobileDevice() && isNative();
  const sizePx = getModalSize(size);

  const modalContentProps = {
    title,
    subTitle,
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
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={{
              transform: [{translateY}],
            }}
          >
            <View
              accessibilityHint="Pull down to close the modal"
              accessibilityLabel="Pull down bar"
              accessibilityRole="adjustable"
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
            {contentVisible && <ModalContent {...modalContentProps}>{children}</ModalContent>}
          </Animated.View>
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
