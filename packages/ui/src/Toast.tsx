import React from "react";
import {Pressable, View} from "react-native";
import {useToast as useRNToast} from "react-native-toast-notifications";

import {Button} from "./Button";
import {IconName, SurfaceColor, TextColor, ToastProps} from "./Common";
import {Heading} from "./Heading";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {useTheme} from "./Theme";
import {isAPIError, printAPIError} from "./Utilities";

const TOAST_DURATION_MS = 3 * 1000;

type UseToastVariantOptions = {
  persistent?: ToastProps["persistent"];
  secondary?: ToastProps["secondary"];
  size?: ToastProps["size"];
  onDismiss?: ToastProps["onDismiss"];
  // TODO enforce these should only show if size is "lg" with type discrinimation
  subtitle?: ToastProps["subtitle"];
  buttonText?: ToastProps["buttonText"];
  buttonOnClick?: ToastProps["buttonOnClick"];
};

type UseToastOptions = {variant?: ToastProps["variant"]} & UseToastVariantOptions;

export function useToast(): {
  hide: (id: string) => void;
  success: (title: string, options?: UseToastVariantOptions) => string;
  info: (title: string, options?: UseToastVariantOptions) => string;
  warn: (title: string, options?: UseToastVariantOptions) => string;
  error: (title: string, options?: UseToastVariantOptions) => string;
  show: (title: string, options?: UseToastOptions) => string;
  catch: (error: any, message?: string, options?: UseToastVariantOptions) => void;
} {
  const toast = useRNToast();
  const show = (title: string, options?: UseToastOptions): string => {
    const toastData = {
      variant: "info",
      ...options,
      title,
    };
    return toast.show(title, {
      data: toastData,
      // a duration of 0 keeps the toast up infinitely until hidden
      duration: options?.persistent ? 0 : TOAST_DURATION_MS,
    });
  };
  return {
    show,
    warn: (title: string, options?: UseToastVariantOptions): string => {
      console.warn(title);
      return show(title, {...options, variant: "warning"});
    },
    error: (title: string, options?: UseToastVariantOptions): string => {
      console.error(title);
      return show(title, {...options, variant: "error"});
    },
    success: (title: string, options?: UseToastVariantOptions): string => {
      console.info(title);
      return show(title, {...options, variant: "success"});
    },
    info: (title: string, options?: UseToastVariantOptions): string => {
      console.info(title);
      return show(title, {...options, variant: "info"});
    },
    hide: (id: string) => toast.hide(id),
    catch: (error: any, message?: string, options?: UseToastVariantOptions): void => {
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

// TODO: Support secondary version of Toast.

export const Toast = ({
  title,
  variant = "info",
  secondary,
  size = "sm",
  onDismiss,
  // TODO enforce these should only show if size is "lg" with type discrinimation
  subtitle,
  buttonText,
  buttonOnClick,
}: ToastProps): React.ReactElement => {
  const {theme} = useTheme();
  let color: SurfaceColor;
  let textColor: TextColor;
  let iconName: IconName;

  if (secondary) {
    throw new Error("Secondary not supported yet");
  }

  if ((buttonText && !buttonOnClick) || (!buttonText && buttonOnClick)) {
    throw new Error("Toast button requires both buttonText and buttonOnClick");
  }

  if (variant === "warning") {
    color = "warning";
    textColor = "inverted";
    iconName = "triangle-exclamation";
  } else if (variant === "error") {
    color = "error";
    textColor = "inverted";
    iconName = "circle-exclamation";
  } else if (variant === "success") {
    color = "success";
    textColor = "inverted";
    iconName = "circle-check";
  } else {
    color = "neutralDark";
    textColor = "inverted";
    iconName = "circle-info";
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "10%",
        marginTop: theme.spacing.sm as any,
      }}
    >
      <View
        style={{
          display: "flex",
          flexShrink: 1,
          flexGrow: 0,
          flexDirection: "row",
          minWidth: 150,
          paddingTop: theme.spacing.xs as any,
          paddingBottom: theme.spacing.xs as any,
          paddingRight: theme.spacing.sm as any,
          alignItems: "center",
          gap: 10,
          borderRadius: theme.radius.default as any,
          backgroundColor: theme.surface[color],
          alignSelf: "flex-start",
          minHeight: size === "lg" ? 32 : undefined,
        }}
      >
        <View
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: size === "lg" ? 8 : 0,
              paddingBottom: size === "lg" ? 8 : 0,
              paddingLeft: size === "lg" ? 4 : 0,
              paddingRight: size === "lg" ? 4 : 0,
              alignItems: size === "lg" ? "center" : undefined,
              alignSelf: size === "lg" ? "stretch" : undefined,
              borderTopLeftRadius: theme.radius.default as any,
              borderBottomLeftRadius: theme.radius.default as any,
            }}
          >
            <Icon color={textColor} iconName={iconName} size={size === "lg" ? "2xl" : "md"} />
          </View>
          <View
            style={
              size === "lg"
                ? {
                    display: "flex",
                    paddingTop: 8,
                    paddingBottom: 8,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 2,
                    alignSelf: "stretch",
                  }
                : {}
            }
          >
            {Boolean(size === "lg") ? (
              <Heading color={textColor} size="sm">
                {title}
              </Heading>
            ) : (
              <Text bold color={textColor} size="md">
                {title}
              </Text>
            )}
            {Boolean(size === "lg" && subtitle) && (
              <Text color={textColor} size="sm">
                {subtitle}
              </Text>
            )}
            {Boolean(buttonText && buttonOnClick) && (
              <View style={{marginTop: 8, marginBottom: 8}}>
                <Button
                  iconName="arrow-right"
                  text={buttonText!}
                  variant="secondary"
                  onClick={buttonOnClick!}
                />
              </View>
            )}
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            gap: 12,
            marginLeft: 10,
            padding: size === "lg" ? 8 : 0,
          }}
          onPress={onDismiss}
        >
          <Icon color={textColor} iconName="xmark" />
        </Pressable>
      </View>
    </View>
  );
};
