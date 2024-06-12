import React from "react";
import {Dimensions} from "react-native";
import {useToast as useRNToast} from "react-native-toast-notifications";

import {Box} from "./Box";
import {Button} from "./Button";
import {TextColor, ToastProps} from "./Common";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {isAPIError, printAPIError} from "./Utilities";

const TOAST_DURATION_MS = 3 * 1000;

export function useToast(): {
  warn: (text: string, options?: Omit<ToastProps["data"], "variant">) => string;
  hide: (id: string) => void;
  show: (text: string, options?: ToastProps["data"]) => string;
  catch: (error: any, message?: string, options?: Omit<ToastProps["data"], "variant">) => void;
  error: (text: string, options?: Omit<ToastProps["data"], "variant">) => string;
} {
  const toast = useRNToast();
  const show = (text: string, options?: ToastProps["data"]): string => {
    return toast.show(text, {
      data: options,
      // a duration of 0 keeps the toast up infinitely until hidden
      duration: options?.persistent ? 0 : TOAST_DURATION_MS,
    });
  };
  return {
    show,
    warn: (text: string, options?: Omit<ToastProps["data"], "variant">): string => {
      console.warn(text);
      return show(text, {...options, variant: "warning"});
    },
    error: (text: string, options?: Omit<ToastProps["data"], "variant">): string => {
      console.error(text);
      return show(text, {...options, variant: "error"});
    },
    hide: (id: string) => toast.hide(id),
    catch: (error: any, message?: string, options?: Omit<ToastProps["data"], "variant">): void => {
      let exceptionMsg;
      if (isAPIError(error)) {
        // Get the error without details.
        exceptionMsg = `${message}: ${printAPIError(error)}`;
        console.error(exceptionMsg);
      } else {
        exceptionMsg = error?.message ?? error?.error ?? String(error);
        console.error(`${message}: ${exceptionMsg}`);
      }
      show(exceptionMsg, {...options, variant: "error"});
    },
  };
}

export const Toast = ({message, data}: ToastProps): React.ReactElement => {
  // margin 8 on either side, times the standard 4px we multiply by.
  const width = Math.min(Dimensions.get("window").width - 16 * 4, 712);
  const {variant, buttonText, buttonOnClick, persistent, onDismiss} = data ?? {};
  let color: TextColor = "primary";
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
      rounding="minimal"
    >
      {Boolean(variant === "error") && (
        <Box marginRight={4}>
          <Icon color="inverted" name="circle-exclamation" size="lg" />
        </Box>
      )}
      {Boolean(variant === "warning") && (
        <Box marginRight={4}>
          <Icon color="inverted" name="triangle-exclamation" size="lg" />
        </Box>
      )}
      <Box alignItems="center" direction="column" flex="shrink" justifyContent="center">
        <Text color="inverted" size="lg" weight="bold">
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
          <IconButton accessibilityLabel="Dismiss notification" icon="xmark" onClick={onDismiss!} />
        </Box>
      )}
    </Box>
  );
};
