import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import debounce from "lodash/debounce";
import React, {FC, useContext, useState} from "react";
import {ActivityIndicator, Pressable, View} from "react-native";

import {IconName, TooltipPosition} from "./Common";
import {isMobileDevice} from "./MediaQuery";
import {Modal} from "./Modal";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";
import {Unifier} from "./Unifier";
import {isNative} from "./Utilities";

export interface IconButtonProps {
  loading?: boolean;
  iconName: IconName;
  accessibilityLabel: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "muted";
  selected?: boolean;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
  tooltipText?: string;
  tooltipIdealPosition?: TooltipPosition;
  testID?: string;
}

const ConfirmationModal: FC<{
  visible: boolean;
  title: string;
  subTitle?: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({visible, title, subTitle, text, onConfirm, onCancel}) => {
  return (
    <Modal
      primaryButtonOnClick={onConfirm}
      primaryButtonText="Confirm"
      secondaryButtonOnClick={onCancel}
      secondaryButtonText="Cancel"
      subTitle={subTitle}
      title={title}
      visible={visible}
      onDismiss={onCancel}
    >
      <Text>{text}</Text>
    </Modal>
  );
};

const IconButtonComponent: FC<IconButtonProps> = ({
  accessibilityLabel,
  iconName,
  onClick,
  variant = "primary",
  loading: propsLoading = false,
  withConfirmation = false,
  confirmationText = "Are you sure you want to continue?",
  confirmationHeading = "Confirm",
  tooltipText,
  testID,
}) => {
  const [loading, setLoading] = useState(propsLoading);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {theme} = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  const getStyles = () => {
    let backgroundColor = theme.surface.primary;
    let color = theme.text.inverted;

    if (variant === "secondary") {
      backgroundColor = theme.surface.neutralLight;
      color = theme.surface.secondaryDark;
    } else if (variant === "muted") {
      backgroundColor = theme.text.inverted;
      color = theme.surface.primary;
    }

    return {backgroundColor, color};
  };

  const {backgroundColor, color} = getStyles();

  return (
    <Pressable
      accessibilityHint={
        withConfirmation
          ? `Opens a confirmation dialog to confirm ${accessibilityLabel}`
          : `Press to perform ${accessibilityLabel} action`
      }
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={loading}
      style={{
        alignItems: "center",
        backgroundColor,
        borderRadius: theme.radius.rounded as any,
        justifyContent: "center",
        height: 32,
        width: 32,
      }}
      testID={testID}
      onPress={debounce(
        async () => {
          await Unifier.utils.haptic();
          setLoading(true);
          try {
            if (withConfirmation && !showConfirmation) {
              setShowConfirmation(true);
            } else if (onClick) {
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
      <View>
        {Boolean(loading) ? (
          <View>
            <ActivityIndicator color={color as any} size="small" />
          </View>
        ) : (
          <FontAwesome6 brand="solid" color={color as any} name={iconName} size={16} />
        )}
      </View>
      {withConfirmation && (
        <ConfirmationModal
          subTitle={undefined}
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
  const {tooltipText, tooltipIdealPosition} = props;

  if (tooltipText && !isMobileDevice && !isNative) {
    return (
      <Tooltip idealPosition={tooltipIdealPosition} text={tooltipText}>
        <IconButtonComponent {...props} />
      </Tooltip>
    );
  }

  return <IconButtonComponent {...props} />;
};
