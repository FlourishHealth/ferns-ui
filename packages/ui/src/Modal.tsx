import React, {useEffect, useRef} from "react";
import {Dimensions, Modal as RNModal} from "react-native";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";

import {Box} from "./Box";
import {Button} from "./Button";
import {ModalProps} from "./Common";
import {Heading} from "./Heading";
import {IconButton} from "./IconButton";
import {isMobileDevice} from "./MediaQuery";
import {Text} from "./Text";
import {isNative} from "./Utilities";

export const Modal = ({
  onDismiss,
  visible,
  align = "center",
  children,
  footer,
  heading,
  size,
  subHeading,
  primaryButtonText,
  primaryButtonOnClick,
  primaryButtonDisabled = false,
  secondaryButtonText,
  secondaryButtonOnClick,
  showClose = false,
}: ModalProps): React.ReactElement => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  if (subHeading && !heading) {
    throw new Error("Cannot render Modal with subHeading and no heading");
  }
  if (!footer && !primaryButtonText && !secondaryButtonText && !showClose) {
    throw new Error(
      "Cannot render Modal without footer, primaryButtonText, secondaryButtonText, or showClose"
    );
  }

  let sizePx: string | number = 540;
  if (size === "md") {
    sizePx = 720;
  } else if (size === "lg") {
    sizePx = 900;
  }

  // Adjust size for small screens
  if (sizePx > Dimensions.get("window").width) {
    sizePx = "90%";
  }

  // Modal uses a visible prop, but ActionSheet uses a setModalVisible method on a reference.
  // Open the action sheet ref when the visible prop changes.
  useEffect(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.setModalVisible(visible);
    }
  }, [visible, actionSheetRef]);

  const renderClose = (): React.ReactElement | null => {
    if (!showClose) {
      return null;
    }
    return (
      <IconButton
        accessibilityLabel="close"
        bgColor="white"
        icon="times"
        iconColor="darkGray"
        onClick={() => onDismiss()}
      />
    );
  };

  const renderModalHeader = (): React.ReactElement => {
    return (
      <Box direction="row" padding={3} width="100%">
        <Box width={40}>{renderClose()}</Box>
        <Box direction="column" flex="grow">
          <Heading align={align === "center" ? "center" : undefined} size="sm">
            {heading}
          </Heading>
          {Boolean(subHeading) && (
            <Box paddingY={2}>
              <Text align={align === "center" ? "center" : undefined}>{subHeading}</Text>
            </Box>
          )}
        </Box>
        <Box width={40} />
      </Box>
    );
  };

  const renderModalFooter = (): React.ReactElement | null => {
    if (footer) {
      return footer;
    }
    return (
      <Box direction="row" justifyContent="end" width="100%">
        {Boolean(secondaryButtonText) && (
          <Box marginRight={4} minWidth={120}>
            <Button
              color="gray"
              text={secondaryButtonText ?? ""}
              onClick={secondaryButtonOnClick}
            />
          </Box>
        )}
        <Box minWidth={120}>
          <Button
            color="primary"
            disabled={primaryButtonDisabled}
            text={primaryButtonText ?? ""}
            onClick={primaryButtonOnClick}
          />
        </Box>
      </Box>
    );
  };

  const renderModal = (): React.ReactElement => {
    return (
      <RNModal animationType="slide" transparent visible={visible} onRequestClose={onDismiss}>
        <Box
          alignItems="center"
          alignSelf="center"
          color="white"
          dangerouslySetInlineStyle={{
            __style: {
              zIndex: 1,
              shadowColor: "#999",
              shadowOffset: {
                width: 4,
                height: 6,
              },
              shadowRadius: 4,
              shadowOpacity: 1.0,
              elevation: 8,
            },
          }}
          direction="column"
          justifyContent="center"
          marginTop={12}
          maxWidth={sizePx}
          minWidth={300}
          paddingX={8}
          paddingY={2}
          rounding={6}
          shadow
          width={sizePx}
        >
          <Box marginBottom={6} width="100%">
            {renderModalHeader()}
            <Box paddingY={4}>{children}</Box>
            <Box paddingY={4}>{renderModalFooter()}</Box>
          </Box>
        </Box>
      </RNModal>
    );
  };

  const renderActionSheet = (): React.ReactElement => {
    return (
      <ActionSheet ref={actionSheetRef} onClose={onDismiss}>
        <Box direction="row" marginBottom={2} paddingX={2} paddingY={2} width="100%">
          <Box marginRight={4}>
            {Boolean(showClose) && (
              <IconButton
                accessibilityLabel="close"
                bgColor="white"
                icon="times"
                iconColor="darkGray"
                size="lg"
                onClick={() => onDismiss()}
              />
            )}
            {Boolean(secondaryButtonText) && (
              <Button
                color="darkGray"
                inline
                size="lg"
                text={secondaryButtonText ?? ""}
                type="ghost"
                onClick={secondaryButtonOnClick}
              />
            )}
          </Box>
          <Box alignItems="center" direction="column" flex="grow" justifyContent="center">
            <Heading align={align === "center" ? "center" : undefined} size="sm">
              {heading}
            </Heading>
            {Boolean(subHeading) && (
              <Box paddingY={2}>
                <Text align={align === "center" ? "center" : undefined}>{subHeading}</Text>
              </Box>
            )}
          </Box>

          <Box alignSelf="start" height="100%" justifyContent="start">
            {Boolean(primaryButtonText) && (
              <Button
                color="primary"
                disabled={primaryButtonDisabled}
                inline
                size="md"
                text={primaryButtonText!}
                type="ghost"
                onClick={primaryButtonOnClick}
              />
            )}
          </Box>
        </Box>
        <Box marginBottom={12} paddingX={4}>
          {children}
        </Box>
      </ActionSheet>
    );
  };

  if (isMobileDevice() && isNative()) {
    return renderActionSheet();
  } else {
    return renderModal();
  }
};
