import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  useFonts as useTextFonts,
} from "@expo-google-fonts/nunito";
import {
  TitilliumWeb_600SemiBold,
  TitilliumWeb_700Bold,
  useFonts as useHeadingFonts,
} from "@expo-google-fonts/titillium-web";
import React from "react";
import {Platform} from "react-native";
import Markdown from "react-native-markdown-display";

import {useTheme} from "./Theme";

// Takes markdown and renders it with our theme. We should open source this component.
export const MarkdownView: React.FC<{children: React.ReactNode; inverted?: boolean}> = ({
  children,
  inverted,
}) => {
  const {theme} = useTheme();

  const color = {color: inverted ? theme.text.inverted : theme.text.primary};

  // Match Heading font sizes to Heading component
  // Web sizes (see src/Heading.tsx): sm:16, md:18, lg:24, xl:32
  // Mobile sizes: sm:14, md:16, lg:20, xl:28
  const isWeb = Platform.OS === "web";
  const sizes = {
    sm: isWeb ? 16 : 14,
    md: isWeb ? 18 : 16,
    lg: isWeb ? 24 : 20,
    xl: isWeb ? 32 : 28,
  } as const;

  // Load fonts similar to Heading/Text components so fontFamily names resolve
  useHeadingFonts({
    heading: TitilliumWeb_600SemiBold,
    "heading-bold": TitilliumWeb_700Bold,
    "heading-semibold": TitilliumWeb_600SemiBold,
  });
  useTextFonts({
    text: Nunito_400Regular,
    "text-regular": Nunito_400Regular,
    "text-medium": Nunito_500Medium,
    "text-bold": Nunito_700Bold,
  });

  return (
    <Markdown
      style={{
        body: {fontFamily: "text", ...color},
        heading1: {fontFamily: "heading-bold", fontSize: sizes.xl, ...color},
        heading2: {fontFamily: "heading-bold", fontSize: sizes.lg, ...color},
        heading3: {fontFamily: "heading-bold", fontSize: sizes.md, ...color},
        heading4: {fontFamily: "heading-semibold", fontSize: sizes.sm, ...color},
        // h5/h6 map to small as well for consistency, slightly smaller visually handled by weight
        heading5: {fontFamily: "heading-semibold", fontSize: sizes.sm, ...color},
        heading6: {fontFamily: "heading-semibold", fontSize: sizes.sm, ...color},
      }}
    >
      {children}
    </Markdown>
  );
};
