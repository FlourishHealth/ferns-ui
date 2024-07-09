import debounce from "lodash/debounce";
import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Pressable, Text as NativeText, View} from "react-native";

import {Box} from "./Box";
import {BannerProps, IconName, SurfaceTheme} from "./Common";
import {DismissButton} from "./DismissButton";
import {Icon} from "./Icon";
import {ThemeContext} from "./Theme";
import {Unifier} from "./Unifier";

type BannerButtonProps = {
  buttonIconName?: string;
  buttonOnClick: () => void | Promise<void>;
  text: string;
  loading?: boolean;
};

const BannerButton = ({
  loading: propsLoading,
  text,
  buttonIconName,
  buttonOnClick,
}: BannerButtonProps): React.ReactElement | null => {
  const [loading, setLoading] = useState(propsLoading);
  const {theme} = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <Pressable
      accessibilityHint={`Press to perform action ${text}`}
      accessibilityLabel={text}
      accessibilityRole="button"
      style={{
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: theme.surface.base,
        borderRadius: theme.radius.rounded as any,
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 4,
      }}
      onPress={debounce(
        async () => {
          await Unifier.utils.haptic();
          setLoading(true);
          try {
            await buttonOnClick();
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
        <View style={{flexDirection: "row-reverse"}}>
          {Boolean(buttonIconName) && (
            <View
              style={{
                alignSelf: "center",
                marginRight: 0,
                marginLeft: 8,
              }}
            >
              <Icon iconName={buttonIconName as IconName} type="solid" />
            </View>
          )}
          <NativeText style={{fontSize: 12}}>{text}</NativeText>
        </View>
        {Boolean(loading) && (
          <Box marginLeft={2}>
            <ActivityIndicator size="small" />
          </Box>
        )}
      </View>
    </Pressable>
  );
};

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
  status = "info",
  dismissible = false,
  hasIcon = false,
  buttonText,
  buttonIconName,
  buttonOnClick,
}: BannerProps): React.ReactElement | null => {
  const {theme} = useContext(ThemeContext);

  let bgColor: keyof SurfaceTheme = "secondaryDark";

  if (status === "alert") {
    bgColor = "error";
  } else if (status === "warning") {
    bgColor = "warning";
  }

  const [show, setShow] = useState(true);

  // Load seen from async storage.
  useEffect(() => {
    if (dismissible) {
      void Unifier.storage.getItem(getKey(id)).then((isSeen) => {
        console.debug(`[banner] ${getKey(id)} seen? ${isSeen}`);
        setShow(!isSeen);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const dismiss = async (): Promise<void> => {
    if (!dismissible) {
      return;
    }
    await hideBanner(id);
    setShow(false);
  };

  if (!show) {
    return null;
  }

  if ((buttonText || buttonIconName) && !buttonOnClick) {
    console.error("Button onClick is required when button text or icon is provided");
    return null;
  }

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.surface[bgColor],
        height: "auto",
        width: "100%",
        margin: "auto",
        flexDirection: "row",
        borderRadius: theme.radius.default as any,
        minHeight: theme.spacing.xl as any,
        padding: theme.spacing.xs as any,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Boolean(hasIcon) && (
          <View style={{paddingRight: 12, paddingLeft: theme.spacing.xs as any}}>
            <Icon color="inverted" iconName="triangle-exclamation" />
          </View>
        )}
        <NativeText
          style={{
            color: theme.text.inverted,
            fontWeight: "bold",
            textAlign: "center",
            flexShrink: 1,
            flexWrap: "wrap",
          }}
        >
          {text}
        </NativeText>
        {Boolean(buttonText && buttonIconName && buttonOnClick) && (
          <View style={{paddingLeft: 16, paddingRight: theme.spacing.xs as any}}>
            <BannerButton
              buttonIconName={buttonIconName ?? ""}
              buttonOnClick={buttonOnClick ?? (() => {})}
              text={buttonText ?? ""}
            />
          </View>
        )}
        {Boolean(buttonText && !buttonIconName && buttonOnClick) && (
          <View style={{paddingLeft: 16, paddingRight: theme.spacing.xs as any}}>
            <BannerButton buttonOnClick={buttonOnClick ?? (() => {})} text={buttonText ?? ""} />
          </View>
        )}
      </View>
      {Boolean(dismissible) && (
        <DismissButton
          accessibilityHint="Press to dismiss banner"
          accessibilityLabel="Dismiss"
          color="inverted"
          onClick={dismiss}
        />
      )}
    </View>
  );
};
