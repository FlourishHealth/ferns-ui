import React, {forwardRef, useContext, useState} from "react";
import {Platform, Pressable, View, ViewStyle} from "react-native";

import {IconButtonProps, iconSizeToNumber} from "./Common";
import {Icon} from "./Icon";
import {Modal} from "./Modal";
import {Text} from "./Text";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";
import {Unifier} from "./Unifier";

// eslint-disable-next-line react/display-name
export const IconButton = forwardRef(
  (
    {
      prefix,
      icon,
      iconColor,
      onClick,
      size,
      bgColor = "transparent",
      withConfirmation = false,
      confirmationText = "Are you sure you want to continue?",
      confirmationHeading = "Confirm",
      tooltip,
      indicator,
      indicatorStyle = {position: "bottomRight", color: "primary"},
    }: IconButtonProps,
    ref
  ) => {
    const {theme} = useContext(ThemeContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const opacity = 1;
    let color: string;
    if (bgColor === "transparentDarkGray") {
      color = "rgba(0, 0, 0, 0.5)";
    } else if (bgColor === "transparent" || !bgColor) {
      color = "rgba(0, 0, 0, 0.0)";
    } else {
      color = theme[bgColor];
    }

    const IndicatorPosition = {
      bottomRight: {bottom: "20%", right: "20%"},
      bottomLeft: {bottom: "20%", left: "20%"},
      topRight: {top: "20%", right: "20%"},
      topLeft: {top: "20%", left: "20%"},
    };

    const indicatorPosition = {position: "absolute", ...IndicatorPosition[indicatorStyle.position]};

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

    function renderIconButton(): React.ReactElement {
      return (
        <>
          <Pressable
            ref={ref as any}
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
            onPress={async () => {
              await Unifier.utils.haptic();
              if (withConfirmation && !showConfirmation) {
                setShowConfirmation(true);
              } else if (onClick) {
                onClick();
              }
            }}
          >
            <Icon color={iconColor} name={icon} prefix={prefix || "fas"} size={size} />
            {indicator && (
              <View style={indicatorPosition as ViewStyle}>
                <Icon
                  color={indicatorStyle.color}
                  name="circle"
                  prefix={prefix || "fas"}
                  size="sm"
                />
              </View>
            )}
          </Pressable>

          {Boolean(withConfirmation) && renderConfirmation()}
        </>
      );
    }

    // Only add for web. This doesn't make much sense for mobile, since the action would be performed for the button
    // as well as the tooltip appearing.
    // TODO: Add tooltip info button next to the icon button on mobile.
    if (tooltip && Platform.OS === "web") {
      return (
        <Tooltip idealDirection={tooltip.idealDirection} text={tooltip.text}>
          {renderIconButton()}
        </Tooltip>
      );
    } else {
      return renderIconButton();
    }
  }
);
