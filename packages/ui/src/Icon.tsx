import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {useContext} from "react";

import {IconProps, iconSizeToNumber} from "./Common";
import {ThemeContext} from "./Theme";

// TODO: Update <Icon /> to be closer to Expo's Vector Icon, letting multiple icon packs be used,
// etc.
// TODO: Add documentation for adding FA6-Pro icons.
export const Icon = ({
  color = "primary",
  size = "md",
  name,
  type = "solid",
  testID,
}: IconProps): React.ReactElement => {
  const {theme} = useContext(ThemeContext);
  const iconColor = theme.text[color];
  const iconSize = iconSizeToNumber(size);
  return (
    <FontAwesome6
      brand={type === "brand"}
      color={iconColor}
      duotone={type === "duotone"}
      light={type === "light" || type === "sharpLight"}
      name={name}
      regular={type === "regular"}
      sharp={type === "sharp"}
      size={iconSize}
      solid={type === "solid" || type === "sharpSolid"}
      testID={testID}
      thin={type === "thin"}
    />
  );
};
