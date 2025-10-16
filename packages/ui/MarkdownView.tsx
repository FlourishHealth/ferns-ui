import {useTheme} from "ferns-ui";
import React from "react";
import Markdown from "react-native-markdown-display";

// Takes markdown and renders it with our theme. We should open source this component.
export const MarkdownView: React.FC<{children: React.ReactNode; inverted?: boolean}> = ({
  children,
  inverted,
}) => {
  const {theme} = useTheme();

  const color = {color: inverted ? theme.text.inverted : theme.text.primary};
  return (
    <Markdown
      style={{
        body: {fontFamily: "text", ...color},
        heading1: {fontFamily: "heading", ...color},
        heading2: {fontFamily: "heading", ...color},
        heading3: {fontFamily: "heading", ...color},
        heading4: {fontFamily: "heading", ...color},
        heading5: {fontFamily: "heading", ...color},
        heading6: {fontFamily: "heading", ...color},
      }}
    >
      {children}
    </Markdown>
  );
};
