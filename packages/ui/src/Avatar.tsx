/* eslint-disable no-console */
import {ImageResult, manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {launchImageLibraryAsync, MediaTypeOptions} from "expo-image-picker";
import React, {useEffect, useState} from "react";
import {Image, ImageResizeMode, Platform, Text, View} from "react-native";

import {Box} from "./Box";
import {AllColors, IconName, UnsignedUpTo12} from "./Common";
import {Icon} from "./Icon";
import {isMobileDevice} from "./MediaQuery";
import {Tooltip} from "./Tooltip";
import {Unifier} from "./Unifier";

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

const statusIcons: {[id: string]: {icon: IconName; color: AllColors; label: string}} = {
  online: {icon: "circle", color: "green", label: "Online"},
  offline: {icon: "circle", color: "gray", label: "Offline"},
  doNotDisturb: {icon: "minus-circle", color: "red", label: "Do Not Disturb"},
  away: {icon: "moon", color: "orange", label: "Away"},
  meeting: {icon: "calendar", color: "orange", label: "In a Meeting"},
  vacation: {icon: "plane", color: "orange", label: "On Vacation"},
  sick: {icon: "clinic-medical", color: "orange", label: "Sick"},
  outOfOffice: {icon: "clock", color: "orange", label: "Out of Office"},
  commuting: {icon: "car", color: "orange", label: "Commuting"},
};

export type AvatarStatus =
  | "online"
  | "offline"
  | "doNotDisturb"
  | "away"
  | "meeting"
  | "vacation"
  | "sick"
  | "outOfOffice"
  | "commuting";

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
  /**
   * The status of the user to display with the avatar.
   */
  status?: AvatarStatus;
  /**
   * If true, the status indicator will show a mobile icon instead of a dot, if status is one of
   * "online", "away", "offline", or "doNotDisturb". Will show the normal status icon in other cases.
   */
  statusMobile?: boolean;
  /**
   * Text to show when hovering over the avatar image. Only works on web.
   */
  statusText?: string;
}

export const Avatar = (props: AvatarProps): React.ReactElement => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [hovered, setHovered] = useState(false);
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

  const renderEditIcon = () => {
    if (editAvatarImage && hovered && Platform.OS === "web") {
      return (
        <Box
          alignItems="center"
          dangerouslySetInlineStyle={{
            __style: {backgroundColor: "rgba(255,255,255,0.5)", borderRadius: radius},
          }}
          height={height}
          justifyContent="center"
          position="absolute"
          // width={width}
          zIndex={5}
          onClick={pickImage}
        >
          <Icon color="darkGray" name="edit" size={size} />
        </Box>
      );
    } else if (editAvatarImage && Platform.OS !== "web") {
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
          <Icon color="darkGray" name="edit" size={size} />
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
      icon = "mobile-alt";
    }
    if (!icon || !color) {
      console.warn(`Avatar: Invalid status ${props.status}`);
      return null;
    }
    return (
      <Box bottom paddingX={sizeIconPadding[size]} position="absolute" right zIndex={5}>
        <Icon color={color} name={icon} size={size} />
      </Box>
    );
  };

  const avatar = (
    <Box height={height} position="relative" width={width}>
      <Box
        border={outline ? "white" : undefined}
        height={height}
        overflow="hidden"
        position="relative"
        rounding="circle"
        width={width}
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
      >
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
    // Need to wrap the tooltip so it doesn't expand to 100% width and render the tooltip off. Don't show the
    // tooltips on mobile because they intercept the edit avatar clicks.
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
