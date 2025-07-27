import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, {FC} from "react";

import {IconProps, iconSizeToNumber} from "./Common";
import {useTheme} from "./Theme";

// TODO: Update <Icon /> to be closer to Expo's Vector Icon, letting multiple icon packs be used,
// etc.
// TODO: Add documentation for adding FA6-Pro icons.
export const Icon: FC<IconProps> = ({
  color = "primary",
  size = "md",
  iconName,
  type = "solid",
  testID,
}) => {
  const {theme} = useTheme();
  const iconColor = theme.text[color] ?? color;
  const iconSize = iconSizeToNumber(size);
  return (
    <FontAwesome6
      brand={type === "brand"}
      color={iconColor}
      duotone={type === "duotone"}
      light={type === "light" || type === "sharpLight"}
      name={iconName}
      regular={type === "regular"}
      selectable={undefined}
      sharp={type === "sharp"}
      size={iconSize}
      solid={type === "solid" || type === "sharpSolid"}
      testID={testID}
      thin={type === "thin"}
    />
  );
};
