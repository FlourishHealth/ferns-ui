import React, {useEffect, useState} from "react";

import {Box} from "./Box";
import {BannerProps, TextColor} from "./Common";
import {Icon} from "./Icon";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {Unifier} from "./Unifier";

function getKey(id: string): string {
  return `@FernsUI:${id}`;
}

export const hideBanner = (id: string): Promise<void> => {
  console.debug(`[banner] Hiding ${getKey(id)} `);
  return Unifier.storage.setItem(getKey(id), "true");
};

const BannerType = {
  ACTION: "action",
  DISMISS: "dismiss",
  PERMANENT: "permanent", // deprecated in favor of default behavior
  CUSTOM_BUTTON: "customButton",
};

export const Banner = ({
  id,
  customButtonProps,
  text,
  subtext,
  color = "secondaryDark",
  iconName,
  negativeXMargin = 0,
  width,
  shape,
  type,
  onClick,
}: BannerProps): React.ReactElement | null => {
  // If the banner is not type dismiss, show it immediately.
  const {ACTION, DISMISS, CUSTOM_BUTTON} = BannerType;
  const [show, setShow] = useState(type !== DISMISS);

  const textColor: TextColor = "inverted";

  // Load seen from async storage.
  useEffect(() => {
    if (type === DISMISS) {
      void Unifier.storage.getItem(getKey(id)).then((isSeen) => {
        console.debug(`[banner] ${getKey(id)} seen? ${isSeen}`);
        setShow(!isSeen);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  const dismiss = async (): Promise<void> => {
    if (type !== DISMISS) {
      return;
    }
    await hideBanner(id);
    setShow(false);
  };

  const renderButton = (): React.ReactElement | null => {
    // needs to be updated with new button props
    // if (type === CUSTOM_BUTTON) {
    //   return (
    //     <Button
    //       {...customButtonProps}
    //       color={customButtonProps?.color ?? "primary"}
    //       size={customButtonProps?.size ?? "sm"}
    //       text={customButtonProps?.text ?? ""}
    //       onClick={onClick}
    //     />
    //   );
    // } else
    if (type === ACTION) {
      return (
        <Box alignItems="center" display="block" justifyContent="center" width={40}>
          {/* accessibility-hint handled in IconButton component */}
          {/* eslint-disable-next-line react-native-a11y/has-accessibility-hint */}
          <IconButton
            accessibilityLabel="arrow-right"
            iconName="arrow-right"
            onClick={(): void => onClick?.()}
          />
        </Box>
      );
    } else if (type === DISMISS) {
      return (
        <Box alignItems="center" display="block" justifyContent="center" width={40}>
          {/* accessibility-hint handled in IconButton component */}
          {/* eslint-disable-next-line react-native-a11y/has-accessibility-hint */}
          <IconButton accessibilityLabel="" iconName="circle-xmark" onClick={dismiss} />
        </Box>
      );
    } else {
      return null;
    }
  };

  if (!show) {
    return null;
  }

  if ((type === ACTION && !onClick) || (type === CUSTOM_BUTTON && !onClick)) {
    console.warn("Banners with type action require an onClick property.");
  }

  const negativeMargin = negativeXMargin * -4;

  return (
    <Box
      color={color}
      dangerouslySetInlineStyle={{
        __style: {
          marginLeft: negativeMargin,
          marginRight: negativeMargin,
        },
      }}
      direction="row"
      justifyContent="between"
      paddingX={3}
      paddingY={2}
      rounding={shape}
      shadow
      width={width || Unifier.utils.dimensions().width || "100%"}
      onClick={type === DISMISS ? dismiss : undefined}
    >
      {iconName && (
        <Box justifyContent="center" width={32}>
          <Icon color={textColor} iconName={iconName} size="lg" />
        </Box>
      )}
      <Box alignItems="center" direction="column" flex="shrink" justifyContent="center">
        <Box paddingY={1}>
          <Text align="center" bold color={textColor}>
            {text}
          </Text>
        </Box>
        {subtext && (
          <Box paddingY={1}>
            <Text align="center" color={textColor}>
              {subtext}
            </Text>
          </Box>
        )}
      </Box>
      {renderButton()}
    </Box>
  );
};
