/* eslint-disable no-console */
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import React, {useContext, useEffect, useState} from "react";
import {Image, ImageResizeMode, Platform, Text, View} from "react-native";

import {Box} from "./Box";
import {AvatarProps, IconName, UnsignedUpTo12} from "./Common";
import {Icon} from "./Icon";
import {isMobileDevice} from "./MediaQuery";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

const sizeIconPadding: {[id: string]: UnsignedUpTo12} = {
  xs: 0,
  sm: 0,
  md: 1,
  lg: 1,
  xl: 2,
};

const statusIcons: {[id: string]: {icon: IconName; color: string; label: string}} = {
  online: {icon: "circle", color: "green", label: "Online"},
  offline: {icon: "circle", color: "gray", label: "Offline"},
  doNotDisturb: {icon: "circle-minus", color: "red", label: "Do Not Disturb"},
  away: {icon: "moon", color: "orange", label: "Away"},
  meeting: {icon: "calendar", color: "orange", label: "In a Meeting"},
  vacation: {icon: "plane", color: "orange", label: "On Vacation"},
  sick: {icon: "hospital-user", color: "orange", label: "Sick"},
  outOfOffice: {icon: "clock", color: "orange", label: "Out of Office"},
  commuting: {icon: "car", color: "orange", label: "Commuting"},
};

// TODO: Avatar probably makes more sense as a custom set of views rather than relying on
// Box, etc. It's a pretty unique component with unique colors and borders.
export const Avatar = (props: AvatarProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);

  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [src, setSrc] = useState(props.src ?? undefined);
  const {
    name,
    initials,
    size = "md",
    imageFit = "contain",
    editAvatarImage,
    onChange,
    avatarImageWidth = sizes[size],
    avatarImageHeight,
    avatarImageFormat = SaveFormat.PNG,
    shouldShowEditIconIfNoImage = false,
  } = props;
  const width = sizes[size];
  const height = sizes[size];
  const radius = sizes[size] / 2;
  const fontSize = sizes[size] / 2;
  const computedInitials =
    initials ??
    (name.match(/(^\S\S?|\s\S)?/g) as any)
      .map((v: string) => v.trim())
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toLocaleUpperCase();

  // If the src changes, update the image.
  useEffect(() => {
    setSrc(props.src);
  }, [props]);

  if (editAvatarImage && !onChange) {
    console.warn("Avatars with the editAvatarImage flag on should also have an onChange property.");
  }

  const handleImageError = () => {
    setIsImageLoaded(false);
    console.warn("Image load error");
  };

  const pickImage = async () => {
    // TODO: Add permission request to use camera to take a picture
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled && result.assets) {
      const resizedImage = await resizeImage(result.assets[0].uri);
      setSrc(resizedImage.uri);
      if (onChange) {
        onChange({avatarImageFormat, ...resizedImage});
      }
    }
  };

  const resizeImage = async (imageUri: string): Promise<ImageResult> => {
    return manipulateAsync(
      imageUri,
      [{resize: {width: avatarImageWidth, height: avatarImageHeight}}],
      {format: avatarImageFormat}
    );
  };

  function shouldShowEditIcon() {
    if (Platform.OS === "web") {
      return (shouldShowEditIconIfNoImage && !src) || (editAvatarImage && hovered);
    } else {
      return (shouldShowEditIconIfNoImage && !src) || editAvatarImage;
    }
  }

  const renderEditIcon = () => {
    if (shouldShowEditIcon() && Platform.OS === "web") {
      return (
        <Box
          alignItems="center"
          dangerouslySetInlineStyle={{
            __style: {backgroundColor: "rgba(255,255,255,0.8)", borderRadius: radius},
          }}
          height={height}
          justifyContent="center"
          position="absolute"
          width={width}
          zIndex={5}
          onClick={pickImage}
          onHoverEnd={() => setHovered(false)}
          onHoverStart={() => setHovered(true)}
        >
          <Icon color="primary" iconName="pencil" size={size} />
          <Text style={{fontWeight: "bold"}}>Upload Image</Text>
        </Box>
      );
    } else if (shouldShowEditIcon() && Platform.OS !== "web") {
      return (
        <Box
          bottom
          left={Boolean(props.status)}
          paddingX={sizeIconPadding[size]}
          position="absolute"
          right={!Boolean(props.status)}
          zIndex={5}
          onClick={pickImage}
        >
          <Icon color="primary" iconName="pencil" size={size} />
        </Box>
      );
    }
    return null;
  };

  const renderStatusIcon = () => {
    if (!props.status) {
      return null;
    }
    // eslint-disable-next-line prefer-const
    let {icon, color} = statusIcons[props.status];
    if (
      props.statusMobile &&
      ["online", "away", "offline", "doNotDisturb"].includes(props.status)
    ) {
      icon = "mobile-screen-button";
    }
    if (!icon || !color) {
      console.warn(`Avatar: Invalid status ${props.status}`);
      return null;
    }
    return (
      <Box bottom paddingX={sizeIconPadding[size]} position="absolute" right zIndex={5}>
        <Icon color={color as any} iconName={icon} size={size} />
      </Box>
    );
  };

  const avatar = (
    <Box height={height} position="relative" width={width}>
      <Box
        height={height}
        overflow="hidden"
        position="relative"
        rounding="circle"
        width={width}
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
      >
        {src && isImageLoaded ? (
          // TODO: Make our Image component rounding work so that we can use it for Avatar.
          // Currently it creates an unrounded box around the Image.
          <Image
            resizeMode={imageFit as ImageResizeMode}
            source={{uri: src, cache: "force-cache"}}
            style={{
              borderRadius: radius,
              height,
              width,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onError={handleImageError}
          />
        ) : (
          <View
            style={{
              height,
              width,
              borderRadius: radius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.surface.neutral,
            }}
          >
            <Text style={{fontSize, color: props.textColor ?? theme.text.primary}}>
              {computedInitials}
            </Text>
          </View>
        )}
      </Box>
      {/* Needs to come after the image so it renders on top. */}
      {renderEditIcon()}
      {renderStatusIcon()}
    </Box>
  );

  let status = props.statusText;
  if (!status && props.status) {
    status = statusIcons[props.status]?.label;
  }

  if (status) {
    // Need to wrap the tooltip so it doesn't expand to 100% width and render the tooltip off.
    // Don't show the tooltips on mobile because they intercept the edit avatar clicks.
    return (
      <Box width={width}>
        <Tooltip idealDirection="top" text={isMobileDevice() ? undefined : status}>
          {avatar}
        </Tooltip>
      </Box>
    );
  } else {
    return avatar;
  }
};
