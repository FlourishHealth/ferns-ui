import React from "react";
import {Platform, Pressable, View} from "react-native";
import {useToast as useRNToast} from "react-native-toast-notifications";

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
  subtitle?: ToastProps["subtitle"];
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
// TODO: Support dismissible version of Toast. Currently only persistent are dismissible.
// This may require a different library from react-native-toast-notifications.
export const Toast = ({
  title,
  variant = "info",
  secondary,
  size = "sm",
  onDismiss,
  persistent,
  // TODO enforce these should only show if size is "lg" with type discrinimation
  subtitle,
}: ToastProps): React.ReactElement => {
  const {theme} = useTheme();
  let color: SurfaceColor;
  let textColor: TextColor;
  let iconName: IconName;

  if (secondary) {
    throw new Error("Secondary not supported yet");
  }

  if (!persistent && !onDismiss) {
    console.warn("Toast is not persistent but no onDismiss callback provided");
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
        paddingLeft: Platform.OS === "web" ? "10%" : theme.spacing.sm,
        paddingRight: Platform.OS === "web" ? "10%" : theme.spacing.sm,
        marginTop: theme.spacing.sm,
        maxWidth: Platform.OS === "web" ? 900 : "100%",
        flexGrow: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexShrink: 1,
          flexDirection: "row",
          minWidth: 150,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          paddingRight: theme.spacing.sm,
          alignItems: "center",
          gap: 10,
          borderRadius: theme.radius.default,
          backgroundColor: theme.surface[color],
          alignSelf: "flex-start",
          minHeight: size === "lg" ? 32 : undefined,
          maxWidth: "100%", // Ensure the content does not overflow
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
            maxWidth: "100%",
            flexShrink: 1, // Ensure the content can shrink properly
            flexGrow: 1,
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
              borderTopLeftRadius: theme.radius.default,
              borderBottomLeftRadius: theme.radius.default,
            }}
          >
            <Icon color={textColor} iconName={iconName} size={size === "lg" ? "2xl" : "md"} />
          </View>
          <View
            style={{
              display: "flex",
              paddingTop: 8,
              paddingBottom: 8,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 2,
              alignSelf: "stretch",
              flexWrap: "wrap",
              flexShrink: 1, // Ensure the content can shrink properly
            }}
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
          </View>
        </View>
        {Boolean(persistent && onDismiss) && (
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
        )}
      </View>
    </View>
  );
};
