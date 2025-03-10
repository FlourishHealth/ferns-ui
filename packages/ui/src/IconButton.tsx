import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import debounce from "lodash/debounce";
import React, {FC, useState} from "react";
import {ActivityIndicator, Pressable, Text as NativeText, View} from "react-native";

import {IconButtonProps} from "./Common";
import {isMobileDevice} from "./MediaQuery";
import {Modal} from "./Modal";
import {Text} from "./Text";
import {useTheme} from "./Theme";
import {Tooltip} from "./Tooltip";
import {Unifier} from "./Unifier";
import {isNative} from "./Utilities";

type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  subtitle?: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  visible,
  title,
  subtitle,
  text,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      primaryButtonOnClick={onConfirm}
      primaryButtonText="Confirm"
      secondaryButtonOnClick={onCancel}
      secondaryButtonText="Cancel"
      subtitle={subtitle}
      title={title}
      visible={visible}
      onDismiss={onCancel}
    >
      <Text>{text}</Text>
    </Modal>
  );
};

const IconButtonComponent: FC<IconButtonProps> = ({
  accessibilityHint,
  accessibilityLabel,
  confirmationHeading = "Confirm",
  confirmationText = "Are you sure you want to continue?",
  disabled = false,
  iconName,
  indicator,
  indicatorText,
  loading: propsLoading = false,
  testID,
  variant = "primary",
  withConfirmation = false,
  tooltipText,
  onClick,
}) => {
  const [loading, setLoading] = useState(propsLoading);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {theme} = useTheme();
  let accessLabel = accessibilityLabel;
  if (tooltipText && accessibilityLabel === "") {
    accessLabel = tooltipText;
  }

  if (!theme) {
    return null;
  }

  let backgroundColor = theme.surface.primary;
  let color = theme.text.inverted;

  if (disabled) {
    backgroundColor = theme.surface.disabled;
    color = theme.text.secondaryLight;
  } else if (variant === "secondary") {
    backgroundColor = theme.surface.neutralLight;
    color = theme.surface.secondaryDark;
  } else if (variant === "muted") {
    backgroundColor = theme.text.inverted;
    color = theme.surface.primary;
  } else if (variant === "navigation") {
    backgroundColor = theme.text.inverted;
    color = theme.text.primary;
  } else if (variant === "destructive") {
    backgroundColor = theme.text.inverted;
    color = theme.text.error;
  }

  const indicatorColor = indicator ? theme.surface[indicator] : undefined;

  return (
    <Pressable
      accessibilityHint={
        accessibilityHint ?? withConfirmation
          ? `Opens a confirmation dialog to confirm ${accessLabel}`
          : `Press to perform ${accessLabel} action`
      }
      aria-label={accessLabel}
      aria-role="button"
      disabled={loading || disabled}
      style={{
        alignItems: "center",
        backgroundColor,
        borderRadius: theme.radius.rounded,
        justifyContent: "center",
        height: 32,
        width: 32,
      }}
      testID={testID}
      onPress={debounce(
        // TODO: Allow for a click outside of the confirmation modal to close it.
        async () => {
          await Unifier.utils.haptic();
          setLoading(true);
          try {
            // If a confirmation is required, and the confirmation modal is not currently open,
            // open it
            if (withConfirmation && !showConfirmation) {
              setShowConfirmation(true);
            } else if (!withConfirmation && onClick) {
              // If a confirmation is not required, perform the action.
              await onClick();
            }
          } catch (error) {
            setLoading(false);
            throw error;
          }
          setLoading(false);
        },
        500,
        {leading: true}
      )}
    >
      {Boolean(loading) ? (
        <ActivityIndicator color={color} size="small" />
      ) : (
        <FontAwesome6
          color={color}
          name={iconName}
          selectable={undefined}
          size={variant === "navigation" ? 20 : 16}
          solid
        />
      )}
      {Boolean(indicator) && (
        <View
          style={{
            display: "flex",
            height: 12,
            width: 12,
            borderRadius: 10,
            padding: theme.spacing.xs as any,
            backgroundColor: indicatorColor,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            bottom: 0,
            right: 0,
          }}
        >
          {Boolean(indicatorText) && (
            <NativeText
              style={{
                color: theme.text.inverted,
                textAlign: "center",
                fontFamily: "text",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {indicatorText}
            </NativeText>
          )}
        </View>
      )}
      {withConfirmation && (
        <ConfirmationModal
          subtitle={undefined}
          text={confirmationText}
          title={confirmationHeading}
          visible={showConfirmation}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={async () => {
            await onClick();
            setShowConfirmation(false);
          }}
        />
      )}
    </Pressable>
  );
};

export const IconButton: FC<IconButtonProps> = (props) => {
  const {tooltipText, tooltipIdealPosition, tooltipIncludeArrow = false} = props;
  const isMobileOrNative = isMobileDevice() || isNative();

  if (tooltipText && !isMobileOrNative) {
    return (
      <Tooltip
        idealPosition={tooltipIdealPosition}
        includeArrow={tooltipIncludeArrow}
        text={tooltipText}
      >
        <IconButtonComponent {...props} />
      </Tooltip>
    );
  }

  return <IconButtonComponent {...props} />;
};
