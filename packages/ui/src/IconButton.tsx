import React, {useState} from "react";
import {TouchableOpacity} from "react-native";

import {IconButtonProps, iconSizeToNumber} from "./Common";
import {Icon} from "./Icon";
import {Modal} from "./Modal";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

export function IconButton({
  prefix,
  icon,
  iconColor,
  onClick,
  size,
  bgColor = "transparent",
  withConfirmation = false,
  confirmationText = "Are you sure you want to continue?",
  confirmationHeading = "Confirm",
}: IconButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  let opacity = 1;
  let color;
  if (bgColor === "transparentDarkGray") {
    opacity = 0.8;
    color = Unifier.theme.darkGray;
  } else if (bgColor === "transparent" || !bgColor) {
    opacity = 0.0;
    color = Unifier.theme.white;
  } else {
    color = Unifier.theme[bgColor];
  }

  const renderConfirmation = () => {
    return (
      <Modal
        heading={confirmationHeading}
        primaryButtonOnClick={() => {
          onClick();
          setShowConfirmation(false);
        }}
        primaryButtonText="Confirm"
        secondaryButtonOnClick={(): void => setShowConfirmation(false)}
        secondaryButtonText="Cancel"
        size="sm"
        visible={showConfirmation}
        onDismiss={(): void => {
          setShowConfirmation(false);
        }}
      >
        <Text>{confirmationText}</Text>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        style={{
          opacity,
          backgroundColor: color,
          borderRadius: 100,
          // paddingBottom: iconSizeToNumber(size) / 4,
          // paddingTop: iconSizeToNumber(size) / 4,
          // paddingLeft: iconSizeToNumber(size) / 2,
          // paddingRight: iconSizeToNumber(size) / 2,
          width: iconSizeToNumber(size) * 2.5,
          height: iconSizeToNumber(size) * 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          Unifier.utils.haptic();
          if (withConfirmation && !showConfirmation) {
            setShowConfirmation(true);
          } else if (onClick) {
            onClick();
          }
        }}
      >
        <Icon color={iconColor} name={icon} prefix={prefix || "fas"} size={size} />
      </TouchableOpacity>
      {Boolean(withConfirmation) && renderConfirmation()}
    </>
  );
}
