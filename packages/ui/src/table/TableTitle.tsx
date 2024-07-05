import React, {FC, useContext} from "react";
import {Text} from "react-native";

import {TableTitleProps} from "../Common";
import {ThemeContext} from "../Theme";

export const TableTitle: FC<TableTitleProps> = ({title, align = "left"}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Text
      accessibilityHint=""
      accessibilityLabel={`Table title: ${title}`}
      accessibilityRole="header"
      ellipsizeMode="tail" // ensures that the text is clipped at the end of the line for all platforms
      numberOfLines={3}
      style={{
        fontFamily: theme.font.primary,
        textTransform: "uppercase",
        fontSize: 16,
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
