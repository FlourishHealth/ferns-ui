import React from "react";

import {Box} from "./Box";
import {BoxProps} from "./Common";

export const Card = ({children, color = "base", padding = 4, width, ...rest}: BoxProps) => {
  return (
    <Box
      color={color}
      direction="column"
      display="flex"
      padding={padding}
      rounding="md"
      shadow
      width={width}
      {...rest}
    >
      {children}
    </Box>
  );
};
