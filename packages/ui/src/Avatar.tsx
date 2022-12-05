/* eslint-disable no-console */
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import React, {useEffect, useState} from "react";
import {Image, ImageResizeMode, Text, View} from "react-native";

import {Box} from "./Box";
import {AllColors, iconSizeToNumber} from "./Common";
import {Icon} from "./Icon";
import {Unifier} from "./Unifier";

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

interface AvatarProps {
  // Color for the background of the circle when no src picture is present.
  backgroundColor?: AllColors;
  // Color for the initials when no src picture is present.
  textColor?: AllColors;
  /**
   * The name of the user. This is used for the placeholder treatment if an image is not available.
   */
  name: string;
  /**
   * Override the generated initials from `name`.
   */
  initials?: string;
  /**
   * Adds a white border around Avatar so it's visible when displayed on other images.
   */
  outline?: boolean;
  /**
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The URL of the user's image.
   */
  src?: string;
  /**
   * The fit for the image within the Avatar: "cover" | "contain" | "none".
   * Default is undefined. See Image.tsx for more info
   */
  imageFit?: "cover" | "contain" | "none";
  /**
   * Allow user to edit the image of the avatar
   */
  editAvatarImage?: boolean;
  /**
   * Function to handle the avatar image edit
   */
  onChange?: (val: any) => void;
  /**
   * Resize image width. If only the width is provided, the image will preserve aspect ratio
   */
  avatarImageWidth?: number;
  /**
   * Resize image height. If avatarImageWidth is also provided, the image aspect ratio may be distorted.
   */
  avatarImageHeight?: number;
  /**
   * The image format that the image will be saved as after any edits by the expo-image-manipulator
   */
  avatarImageFormat?: SaveFormat;
}

export const Avatar = (props: AvatarProps): React.ReactElement => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [src, setSrc] = useState(props.src ?? undefined);
  const {
    name,
    initials,
    outline,
    size = "md",
    imageFit = "contain",
    editAvatarImage,
    onChange,
    avatarImageWidth = sizes[size],
    avatarImageHeight,
    avatarImageFormat = SaveFormat.PNG,
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

    if (!result.cancelled) {
      const resizedImage = await resizeImage(result.uri);
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

  return (
    <Box
      border={outline ? "white" : undefined}
      height={height}
      overflow="hidden"
      position="relative"
      rounding="circle"
      width={editAvatarImage ? width + iconSizeToNumber(size) : width}
    >
      {editAvatarImage && (
        <Box bottom position="absolute" right zIndex={5} onClick={pickImage}>
          <Icon color="black" name="edit" size={size} />
        </Box>
      )}
      {src && isImageLoaded ? (
        // TODO: Make our Image component rounding work so that we can use it for Avatar. Currently it creates an
        // unrounded box around the Image.
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
            backgroundColor: props.backgroundColor
              ? Unifier.theme[props.backgroundColor]
              : Unifier.theme.gray,
          }}
        >
          <Text style={{fontSize, color: props.textColor ?? Unifier.theme.darkGray}}>
            {computedInitials}
          </Text>
        </View>
      )}
    </Box>
  );
};
