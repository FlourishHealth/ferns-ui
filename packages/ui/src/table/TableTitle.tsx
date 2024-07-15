import React, {FC} from "react";
import {Text} from "react-native";

import {TableTitleProps} from "../Common";
import {useTheme} from "../Theme";

export const TableTitle: FC<TableTitleProps> = ({title, align = "left"}) => {
  const {theme} = useTheme();
  return (
    // No hint needed for a title.
    // eslint-disable-next-line react-native-a11y/has-accessibility-hint
    <Text
      accessibilityLabel={`Table title: ${title}`}
      accessibilityRole="header"
      ellipsizeMode="tail" // ensures that the text is clipped at the end of the line for all platforms
      numberOfLines={3}
      style={{
        fontFamily: "text",
        textTransform: "uppercase",
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "700",
        textAlign: align,
        flexWrap: "wrap",
        overflow: "hidden",
        color: theme.text.primary,
      }}
    >
      {title}
    </Text>
  );
};
