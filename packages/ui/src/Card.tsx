import React from "react";

import {Box} from "./Box";
import {BoxProps} from "./Common";

export const Card = ({children, color = "white", padding = 4, width, ...rest}: BoxProps) => {
  return (
    <Box
      color={color}
      direction="column"
      display="flex"
      padding={padding}
      rounding={3}
      shadow
      width={width}
      {...rest}
    >
      {children}
    </Box>
  );
};
