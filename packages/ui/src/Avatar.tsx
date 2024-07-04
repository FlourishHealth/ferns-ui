/* eslint-disable no-console */
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import {LinearGradient} from "expo-linear-gradient";
import React, {FC, useContext, useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";

import {AvatarProps, CustomSvgProps} from "./Common";
import {Icon} from "./Icon";
import {MobileIcon, OfflineIcon, OnlineIcon, OutOfOfficeIcon} from "./icons";
import {isMobileDevice} from "./MediaQuery";
import {ThemeContext} from "./Theme";
import {Tooltip} from "./Tooltip";

const sizes = {
  xs: 28,
  sm: 38,
  md: 56,
  lg: 72,
  xl: 120,
};

const initialsFontSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 60,
};

const iconSizeScale = {
  xs: 0.5,
  sm: 0.7,
  md: 0.9,
  lg: 1.1,
  xl: 1.5,
};

const sizeIconPadding = {
  xs: 12,
  sm: 10,
  md: 9,
  lg: 7,
  xl: 0,
};

export const Avatar: FC<AvatarProps> = ({
  name,
  hasBorder = true,
  size = "md",
  src,
  onChange,
  status,
  doNotDisturb = false,
}) => {
  const {theme} = useContext(ThemeContext);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [imgSrc, setImgSrc] = useState(src ?? undefined);
  const avatarImageFormat = SaveFormat.PNG;
  const avatarImageDiameter = sizes[size];
  const showEditIcon = status === "imagePicker";

  const avatarRadius = avatarImageDiameter / 2;
  const computedInitials = (name.match(/(^\S\S?|\s\S)?/g) as any)
    .map((v: string) => v.trim())
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toLocaleUpperCase();

  const statusIcons: {
    [id: string]: {
      icon: (props: CustomSvgProps) => React.ReactElement;
      label: string;
    };
  } = {
    online: {icon: OnlineIcon, label: "Online"},
    offline: {icon: OfflineIcon, label: "Offline"},
    outOfOffice: {icon: OutOfOfficeIcon, label: "Out of Office"},
    activeMobile: {
      icon: MobileIcon,

      label: "Active on Mobile",
    },
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

  const renderEditIcon = () => {
    if (size !== "xl") {
      console.error(`Avatar: "imagePicker" status is only supported for size "xl"`);
      return null;
    }

    return (
      <Pressable
        accessibilityRole="button"
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.75)",
          borderRadius: avatarRadius,
          height: avatarImageDiameter,
          justifyContent: "center",
          position: "absolute",
          width: avatarImageDiameter,
          zIndex: 5,
        }}
        onPress={pickImage}
      >
        <Icon color="primary" iconName="pen-to-square" size="2xl" type="regular" />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 12,
            marginTop: 10,
          }}
        >
          Upload Image
        </Text>
      </Pressable>
    );
  };

  const renderStatusIcon = () => {
    if (!status || showEditIcon) {
      return null;
    }
    const {icon} = statusIcons[status];

    if (!icon) {
      console.warn(`Avatar: Invalid status ${status}`);
      return null;
    }

    return (
      <View
        style={{
          bottom: 0,
          position: "absolute",
          right: 0,
          zIndex: 5,
        }}
      >
        {icon({
          doNotDisturb,
          transform: [{scale: iconSizeScale[size]}],
        })}
      </View>
    );
  };

  let avatar = (
    <View
      accessibilityHint={showEditIcon ? "Opens file explorer" : "Avatar image"}
      accessibilityLabel={`${name}'s avatar`}
      accessibilityRole="image"
      style={{height: avatarImageDiameter, position: "relative", width: avatarImageDiameter}}
    >
      <Pressable
        accessibilityRole="button"
        style={{
          overflow: "hidden",
          position: "relative",
          borderRadius: 1,
          cursor: showEditIcon ? "pointer" : "auto",
        }}
      >
        {src && isImageLoaded ? (
          // TODO: Make our Image component rounding work so that we can use it for Avatar.
          // Currently it creates an unrounded box around the Image.
          <Image
            accessibilityIgnoresInvertColors
            source={{uri: src, cache: "force-cache"}}
            style={{
              borderRadius: avatarRadius,
              borderWidth: hasBorder && status !== "imagePicker" ? avatarImageDiameter * 0.04 : 0,
              borderColor: hasBorder ? "white" : "transparent",
              height: avatarImageDiameter,
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
              borderWidth: hasBorder && status !== "imagePicker" ? avatarImageDiameter * 0.04 : 0,
              borderColor: hasBorder && status !== "imagePicker" ? "white" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.surface.secondaryDark,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: initialsFontSizes[size],
                color: showEditIcon ? theme.text.inverted : theme.text.primary,
              }}
            >
              {computedInitials}
            </Text>
          </View>
        )}
      </Pressable>
      {/* Needs to come after the image so it renders on top. */}
      {showEditIcon && renderEditIcon()}
    </View>
  );

  if (hasBorder && status !== "imagePicker") {
    const gradientDiameter = avatarImageDiameter * 1.1;
    const gradientStartColor = "#FFC947";
    const gradientEndColor = "#EA9095";
    // Start the first color in the top left corner and end the second color in the bottom
    // right corner.

    avatar = (
      <LinearGradient
        colors={[gradientStartColor, gradientEndColor]}
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
    const widthPlusPadding = avatarImageDiameter + sizeIconPadding[size];

    avatar = (
      <View
        style={{
          width: widthPlusPadding,
          paddingRight: sizeIconPadding[size],
          paddingBottom: sizeIconPadding[size],
        }}
      >
        <Tooltip idealPosition="top" text={isMobileDevice() ? undefined : status}>
          {avatar}
        </Tooltip>
        {renderStatusIcon()}
      </View>
    );
  }

  return avatar;
};
