import React, {useEffect, useState} from "react";

import {Box} from "./Box";
import {BannerProps, ButtonColor} from "./Common";
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

export const Banner = ({
  id,
  text,
  subtext,
  color = "secondaryDark",
  iconName,
  textColor = "white",
  negativeXMargin = 0,
  width,
  shape,
  type = "dismiss",
  onClick,
}: BannerProps): React.ReactElement | null => {
  // If the banner is permanent, show it immediately.
  const [show, setShow] = useState(type === "permanent");

  // Load seen from async storage.
  useEffect(() => {
    // Always show permanent banners.
    if (type === "permanent") {
      return;
    }

    void Unifier.storage.getItem(getKey(id)).then((isSeen) => {
      console.debug(`[banner] ${getKey(id)} seen? ${isSeen}`);
      setShow(!isSeen);
    });
  }, [id, type]);

  const dismiss = async (): Promise<void> => {
    if (type === "permanent") {
      return;
    }
    await hideBanner(id);
    setShow(false);
  };

  const renderButton = (): React.ReactElement | null => {
    if (type === "permanent") {
      return null;
    }
    return (
      <Box alignItems="center" display="block" justifyContent="center" width={40}>
        {type === "dismiss" && (
          <IconButton
            accessibilityLabel=""
            icon="times-circle"
            iconColor={textColor as ButtonColor}
            prefix="fas"
            onClick={dismiss}
          />
        )}
        {type === "action" && (
          <IconButton
            accessibilityLabel=""
            icon="arrow-right"
            iconColor={textColor as ButtonColor}
            prefix="fas"
            onClick={(): void => onClick?.()}
          />
        )}
      </Box>
    );
  };

  if (!show) {
    return null;
  }

  if (type === "action" && !onClick) {
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
      onClick={type === "permanent" ? undefined : dismiss}
    >
      {iconName && (
        <Box justifyContent="center" marginRight={2} width={32}>
          <Icon color={textColor} name={iconName} size="lg" />
        </Box>
      )}
      <Box alignItems="center" direction="column" flex="shrink" justifyContent="center">
        <Box paddingY={1}>
          <Text align="center" color={textColor} weight="bold">
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
