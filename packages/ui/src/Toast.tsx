import React from "react";
import {Dimensions} from "react-native";
import {useToast as useRNToast} from "react-native-toast-notifications";

import {Box} from "./Box";
import {Button} from "./Button";
import {AllColors, ToastProps} from "./Common";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";
import {Text} from "./Text";

const TOAST_DURATION_MS = 3 * 1000;

export function useToast(): any {
  const toast = useRNToast();
  return {
    show: (
      text: string,
      options?: {
        variant?: "default" | "warning" | "error";
        buttonText?: string;
        buttonOnClick: () => void | Promise<void>;
        persistent?: boolean;
        onDismiss?: () => void | Promise<void>;
      }
    ): string => {
      return toast.show(text, {
        data: options,
        // a duration of 0 keeps the toast up infinitely until hidden
        duration: options?.persistent ? 0 : TOAST_DURATION_MS,
      });
    },
    hide: (id: string) => toast.hide(id),
  };
}

export const Toast = ({message, data}: ToastProps): React.ReactElement => {
  // margin 8 on either side, times the standard 4px we multiply by.
  const width = Math.min(Dimensions.get("window").width - 16 * 4, 712);
  const {variant, buttonText, buttonOnClick, persistent, onDismiss} = data ?? {};
  let color: AllColors = "darkGray";
  if (variant === "warning" || variant === "error") {
    color = variant;
  }
  return (
    <Box
      alignItems="center"
      color={color}
      direction="row"
      flex="shrink"
      marginBottom={4}
      marginLeft={8}
      marginRight={8}
      maxWidth={width}
      padding={2}
      paddingX={4}
      paddingY={3}
      rounding={4}
    >
      {Boolean(variant === "error") && (
        <Box marginRight={4}>
          <Icon color="white" name="exclamation-circle" size="lg" />
        </Box>
      )}
      {Boolean(variant === "warning") && (
        <Box marginRight={4}>
          <Icon color="white" name="exclamation-triangle" size="lg" />
        </Box>
      )}
      <Box alignItems="center" direction="column" flex="shrink" justifyContent="center">
        <Text color="white" size="lg" weight="bold">
          {message}
        </Text>
      </Box>
      {Boolean(buttonOnClick && buttonText) && (
        <Box alignItems="center" justifyContent="center" marginLeft={4}>
          <Button color="lightGray" shape="pill" text={buttonText!} onClick={buttonOnClick} />
        </Box>
      )}
      {Boolean(onDismiss && persistent) && (
        <Box alignItems="center" justifyContent="center" marginLeft={4}>
          <IconButton
            accessibilityLabel="Dismiss notification"
            icon="times"
            iconColor="white"
            onClick={onDismiss!}
          />
        </Box>
      )}
    </Box>
  );
};
