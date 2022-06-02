import React, {useState} from "react";
import {Image, Text, View} from "react-native";

import {Box} from "./Box";
import {Unifier} from "./Unifier";

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

interface AvatarProps {
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
}

export const Avatar = (props: AvatarProps): React.ReactElement => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const {name, initials, outline, size = "md", src} = props;
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

  const handleImageError = () => setIsImageLoaded(false);
  return (
    <Box
      border={outline ? "white" : undefined}
      height={height}
      overflow="hidden"
      position="relative"
      rounding="circle"
      width={width}
    >
      {src && isImageLoaded ? (
        // TODO: Make our Image component rounding work so that we can use it for Avatar. Currently it creates an
        //  unrounded box around the Image.
        <Image
          resizeMode="contain"
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
            backgroundColor: Unifier.theme.gray,
          }}
        >
          <Text style={{fontSize, color: Unifier.theme.darkGray}}>{computedInitials}</Text>
        </View>
      )}
    </Box>
  );
};
