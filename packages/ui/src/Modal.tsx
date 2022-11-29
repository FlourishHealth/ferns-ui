import React from "react";
import {Dimensions, Modal as RNModal} from "react-native";

import {Box} from "./Box";
import {Button} from "./Button";
import {Heading} from "./Heading";
import {Text} from "./Text";

interface ModalProps {
  onDismiss: () => void;
  visible: boolean;
  // Alignment of the header. Default is "center".
  align?: "center" | "start";
  // Element to render in the middle part of the modal.
  children?: React.ReactElement;
  // Element to render in the bottom of the modal. This takes precedence over primaryButton and secondaryButton.
  footer?: React.ReactElement;
  heading?: string;
  size?: "sm" | "md" | "lg";
  subHeading?: string;
  // Renders a primary colored button all the way to the right in the footer, if no footer prop is provided.
  primaryButtonText?: string;
  primaryButtonOnClick?: (value?: any) => void;
  primaryButtonDisabled?: boolean;
  // Renders a gray button to the left of the primary button in the footer, if no footer prop is provided.
  // Requires primaryButtonText to be defined, but is not required itself.
  secondaryButtonText?: string;
  secondaryButtonOnClick?: (value?: any) => void;
}

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
}: ModalProps): React.ReactElement => {
  if (subHeading && !heading) {
    throw new Error("Cannot render Modal with subHeading and no heading");
  }
  if (!footer && !primaryButtonText && !secondaryButtonText) {
    throw new Error(
      "Cannot render Modal without footer, primaryButtonText, or secondaryButtonText"
    );
  }

  function renderHeader(): React.ReactElement {
    return (
      <Box paddingY={3} width="100%">
        <Box>
          <Heading align={align === "center" ? "center" : undefined} size="sm">
            {heading}
          </Heading>
        </Box>
        {Boolean(subHeading) && (
          <Box paddingY={2}>
            <Text align={align === "center" ? "center" : undefined}>{subHeading}</Text>
          </Box>
        )}
      </Box>
    );
  }
  function renderFooter(): React.ReactElement | null {
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

  return (
    <Box alignItems="center" flex="grow" height="100%" justifyContent="center" width="100%">
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
            {renderHeader()}
            <Box paddingY={4}>{children}</Box>
            <Box paddingY={4}>{renderFooter()}</Box>
          </Box>
        </Box>
      </RNModal>
    </Box>
  );
};
