import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import debounce from "lodash/debounce";
import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, Pressable, Text, View} from "react-native";

import {Box} from "./Box";
import {BannerProps, SurfaceTheme} from "./Common";
import {Icon} from "./Icon";
import {ThemeContext} from "./Theme";
import {Unifier} from "./Unifier";

// WIP - TODO:
// CSS fix to match design specs, make sure it works with extra long banner texts, etc.
// Add accessibility hints/labels where needed, check that its set up as intended
// Clean up prop types, ensure consistent naming and typing
// use theme for colors instead of hardcoded strings where possible

type BannerDismissButtonProps = {
  accessibilityLabel: string;
  buttonIconName: string;
  buttonOnClick: () => void;
};

const BannerDismissButton = ({
  accessibilityLabel,
  buttonIconName,
  buttonOnClick,
}: BannerDismissButtonProps): React.ReactElement | null => {
  const {theme} = useContext(ThemeContext);

  if (!theme) {
    return null;
  }

  return (
    <Pressable
      // todo: update hint/label
      accessibilityHint={`Press to perform ${accessibilityLabel} action`}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={{
        alignItems: "center",
        borderRadius: theme.radius.rounded as any,
        justifyContent: "center",
        height: 32,
        width: 32,
      }}
      onPress={buttonOnClick}
    >
      <View>
        <FontAwesome6 brand="solid" color="inverted" name={buttonIconName} size={16} />
      </View>
    </Pressable>
  );
};

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
      accessibilityHint="Press to perform action"
      accessibilityLabel={text}
      accessibilityRole="button"
      style={{
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: theme.surface.base,
        borderRadius: theme.radius.rounded as any,
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
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
              <FontAwesome6 brand="solid" color="inverted" name={buttonIconName} size={16} />
            </View>
          )}
          <Text style={{color: "inverted", fontWeight: "400", fontSize: 16}}>{text}</Text>
        </View>
        {Boolean(loading) && (
          <Box marginLeft={2}>
            <ActivityIndicator color="inverted" size="small" />
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
        justifyContent: "space-between",
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
      {Boolean(hasIcon) && <Icon color="inverted" iconName="triangle-exclamation" size="sm" />}

      <Text style={{color: theme.surface.base, fontWeight: "700", fontSize: 16}}>{text}</Text>
      {Boolean(buttonText && buttonIconName && buttonOnClick) && (
        <BannerButton
          buttonIconName={buttonIconName ?? ""}
          buttonOnClick={buttonOnClick ?? (() => {})}
          text={buttonText ?? ""}
        />
      )}
      {Boolean(buttonText && !buttonIconName && buttonOnClick) && (
        <BannerButton buttonOnClick={buttonOnClick ?? (() => {})} text={buttonText ?? ""} />
      )}
      {Boolean(dismissible) && (
        // eslint-disable-next-line react-native-a11y/has-accessibility-hint
        <BannerDismissButton accessibilityLabel="" buttonIconName="x" buttonOnClick={dismiss} />
      )}
    </View>
  );
};
