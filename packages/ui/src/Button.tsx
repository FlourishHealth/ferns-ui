import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import debounce from "lodash/debounce";
import React, {FC, useContext, useState} from "react";
import {ActivityIndicator, Pressable, Text, View} from "react-native";

import {Box} from "./Box";
import {ButtonProps} from "./Common";
import {isMobileDevice} from "./MediaQuery";
import {Modal} from "./Modal";
// import { Text } from "./Text";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";
import {Unifier} from "./Unifier";
import {isNative} from "./Utilities";

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

const ButtonComponent: FC<ButtonProps> = ({
  disabled = false,
  fullWidth = false,
  iconName,
  iconPosition = "left",
  loading: propsLoading,
  modalTitle = "Confirm",
  modalSubTitle,
  modalText = "Are you sure you want to continue?",
  testID,
  text,
  variant = "primary",
  withConfirmationModal = false,
  onClick,
}) => {
  const [loading, setLoading] = useState(propsLoading);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {theme} = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  const getButtonStyles = () => {
    let backgroundColor = theme.surface.primary;
    let borderColor: string | undefined;
    let borderWidth: number | undefined;
    let color = theme.text.inverted;

    if (variant === "secondary") {
      backgroundColor = theme.surface.secondaryDark;
    } else if (variant === "muted") {
      backgroundColor = theme.surface.secondaryLight;
      color = theme.surface.neutralDark;
    } else if (variant === "outline") {
      backgroundColor = theme.surface.base;
      borderColor = theme.text.secondaryDark;
      borderWidth = 2;
      color = theme.text.secondaryDark;
    } else if (variant === "destructive") {
      backgroundColor = theme.surface.error;
    } else if (disabled) {
      backgroundColor = theme.surface.disabled;
    }

    return {backgroundColor, borderColor, borderWidth, color};
  };

  const {backgroundColor, borderColor, borderWidth, color} = getButtonStyles();

  return (
    <Pressable
      accessibilityHint={
        withConfirmationModal ? "Opens a confirmation dialog" : "Press to perform action"
      }
      accessibilityLabel={text}
      accessibilityRole="button"
      disabled={disabled || loading}
      style={{
        alignItems: "center",
        alignSelf: fullWidth ? "stretch" : undefined,
        backgroundColor,
        borderColor,
        borderRadius: theme.radius.rounded as any,
        borderWidth,
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        width: fullWidth ? "100%" : "auto",
      }}
      testID={testID}
      onPress={debounce(
        async () => {
          await Unifier.utils.haptic();
          setLoading(true);
          try {
            if (withConfirmationModal && !showConfirmation) {
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
      <View style={{flexDirection: "row"}}>
        <View style={{flexDirection: iconPosition === "left" ? "row" : "row-reverse"}}>
          {Boolean(iconName) && (
            <View
              style={{
                alignSelf: "center",
                marginRight: iconPosition === "left" ? 8 : 0,
                marginLeft: iconPosition === "right" ? 8 : 0,
              }}
            >
              <FontAwesome6 brand="solid" color={color as any} name={iconName} size={16} />
            </View>
          )}
          <Text style={{color, fontWeight: "700", fontSize: 16}}>{text}</Text>
        </View>
        {Boolean(loading) && (
          <Box marginLeft={2}>
            <ActivityIndicator color={color as any} size="small" />
          </Box>
        )}
      </View>
      {withConfirmationModal && (
        <ConfirmationModal
          subTitle={modalSubTitle}
          text={modalText}
          title={modalTitle}
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

export const Button: FC<ButtonProps> = (props) => {
  const {tooltipText, tooltipIdealPosition, tooltipIncludeArrow = false} = props;
  const isMobileOrNative = isMobileDevice() || isNative();

  if (tooltipText && !isMobileOrNative) {
    return (
      <Tooltip
        idealPosition={tooltipIdealPosition}
        includeArrow={tooltipIncludeArrow}
        text={tooltipText}
      >
        <ButtonComponent {...props} />
      </Tooltip>
    );
  }

  return <ButtonComponent {...props} />;
};
