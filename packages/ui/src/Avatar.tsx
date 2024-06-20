/* eslint-disable no-console */
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import {LinearGradient} from "expo-linear-gradient";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Image, Platform, Text, View} from "react-native";

import {Box} from "./Box";
import {AvatarProps, IconName, UnsignedUpTo12} from "./Common";
import {Icon} from "./Icon";
import {isMobileDevice} from "./MediaQuery";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";

const sizes = {
  xs: 28,
  sm: 38,
  md: 56,
  lg: 64,
  xl: 132,
};

const fontSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 60,
};

const iconSizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 26,
  xl: 30,
};

const sizeIconPadding: {[id: string]: UnsignedUpTo12} = {
  xs: 0,
  sm: 0,
  md: 1,
  lg: 1,
  xl: 2,
};

// TODO: Avatar probably makes more sense as a custom set of views rather than relying on
// Box, etc. It's a pretty unique component with unique colors and borders.
export const Avatar = ({
  name,
  hasBorder = true,
  size = "md",
  src,
  onChange,
  status = "online",
  doNotDisturb = false,
}: AvatarProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(src ?? undefined);
  const avatarImageFormat = SaveFormat.PNG;
  const avatarImageDiameter = sizes[size];
  const showEditIcon = status === "imagePicker";

  const avatarRadius = avatarImageDiameter / 2;
  const initialsFontSize = fontSizes[size];
  const computedInitials = (name.match(/(^\S\S?|\s\S)?/g) as any)
    .map((v: string) => v.trim())
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toLocaleUpperCase();

  const statusIcons: {
    [id: string]: {
      icon: IconName;
      type: "solid" | "regular";
      color: string;
      label: string;
    };
  } = {
    online: {icon: "circle", type: "solid", color: "success", label: "Online"},
    offline: {icon: "circle", type: "regular", color: "extraLight", label: "Offline"},
    outOfOffice: {icon: "clock", type: "solid", color: "error", label: "Out of Office"},
    activeMobile: {
      icon: "circle",
      type: "solid",
      color: "success",
      label: "Active on Mobile",
    },
    imagePicker: {icon: "camera", type: "solid", color: "extraLight", label: "Upload Image"},
  };

  // If the src changes, update the image.
  useEffect(() => {
    setImgSrc(imgSrc);
  }, [imgSrc]);

  if (showEditIcon && !onChange) {
    console.warn("Avatars with the status of 'imagePicker' should also have an onChange property.");
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
      setImgSrc(resizedImage.uri);
      if (onChange) {
        onChange({avatarImageFormat, ...resizedImage});
      }
    }
  };

  const resizeImage = async (imageUri: string): Promise<ImageResult> => {
    return manipulateAsync(
      imageUri,
      [{resize: {width: avatarImageDiameter, height: avatarImageDiameter}}],
      {format: avatarImageFormat}
    );
  };

  const shouldShowEditIcon = useMemo(() => {
    if (Platform.OS === "web") {
      return (showEditIcon && !src) || (showEditIcon && hovered);
    } else {
      return (showEditIcon && !src) || showEditIcon;
    }
  }, [showEditIcon, src, hovered]);

  const renderEditIcon = () => {
    if (shouldShowEditIcon && Platform.OS === "web") {
      return (
        <Box
          alignItems="center"
          dangerouslySetInlineStyle={{
            __style: {backgroundColor: "rgba(255,255,255,0.8)", borderRadius: avatarRadius},
          }}
          height={avatarImageDiameter}
          justifyContent="center"
          position="absolute"
          width={avatarImageDiameter}
          zIndex={5}
          onClick={pickImage}
          onHoverEnd={() => setHovered(false)}
          onHoverStart={() => setHovered(true)}
        >
          <Icon color="primary" iconName="pencil" size={size} />
          <Text style={{fontWeight: "bold"}}>Upload Image</Text>
        </Box>
      );
    } else if (shouldShowEditIcon && Platform.OS !== "web") {
      return (
        <Box
          bottom
          left={Boolean(status)}
          paddingX={sizeIconPadding[size]}
          position="absolute"
          right={!Boolean(status)}
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
    if (!status) {
      return null;
    }
    // eslint-disable-next-line prefer-const
    let {icon, color, type} = statusIcons[status];
    console.log(icon, color);

    if (!icon || !color) {
      console.warn(`Avatar: Invalid status ${status}`);
      return null;
    }
    return (
      <Box
        bottom
        color="success"
        paddingX={sizeIconPadding[size]}
        position="absolute"
        right
        zIndex={5}
      >
        <Icon color={color as any} iconName={icon} size={iconSizes[size]} type={type} />
      </Box>
    );
  };

  const avatar = (
    <Box height={avatarImageDiameter} position="relative" width={avatarImageDiameter}>
      <Box
        height={avatarImageDiameter}
        overflow="hidden"
        position="relative"
        rounding="circle"
        width={avatarImageDiameter}
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
      >
        {src && isImageLoaded ? (
          // TODO: Make our Image component rounding work so that we can use it for Avatar.
          // Currently it creates an unrounded box around the Image.
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={{uri: src, cache: "force-cache"}}
            style={{
              borderRadius: avatarRadius,
              borderWidth: hasBorder ? avatarImageDiameter * 0.04 : 0,
              borderColor: hasBorder ? "white" : "transparent",
              height: avatarImageDiameter,
              width: avatarImageDiameter,
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
              height: avatarImageDiameter,
              width: avatarImageDiameter,
              borderRadius: avatarRadius,
              borderWidth: hasBorder ? avatarImageDiameter * 0.04 : 0,
              borderColor: hasBorder ? "white" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.surface.secondaryDark,
            }}
          >
            <Text style={{fontWeight: 500, fontSize: initialsFontSize, color: theme.text.primary}}>
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

  if (hasBorder) {
    const gradientDiameter = avatarImageDiameter * 1.1;
    const gradientStartColor = "#FFC947";
    const gradientEndColor = "#EA9095";
    return (
      <LinearGradient
        colors={[gradientStartColor, gradientEndColor]}
        // Start the first color in the top left corner and end the second color in the bottom
        // right corner.
        end={{x: 1, y: 1}}
        start={{x: 0, y: 0}}
        style={{
          height: gradientDiameter,
          width: gradientDiameter,
          borderRadius: gradientDiameter / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {avatar}
      </LinearGradient>
    );
  }

  if (status) {
    // Need to wrap the tooltip so it doesn't expand to 100% width and render the tooltip off.
    // Don't show the tooltips on mobile because they intercept the edit avatar clicks.
    return (
      <Box width={avatarImageDiameter}>
        <Tooltip idealDirection="top" text={isMobileDevice() ? undefined : status}>
          {avatar}
        </Tooltip>
      </Box>
    );
  } else {
    return avatar;
  }
};
