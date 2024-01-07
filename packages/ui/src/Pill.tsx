import React from "react";

import {Box} from "./Box";
import {PillProps} from "./Common";
import {Text} from "./Text";

export function Pill({onClick, enabled, color = "white", text}: PillProps): React.ReactElement {
  return (
    <Box
      border={color}
      color={enabled ? color : "white"}
      paddingX={4}
      paddingY={2}
      rounding="pill"
      onClick={() => onClick(!enabled)}
    >
      <Text align="center" color={enabled ? "white" : color}>
        {text}
      </Text>
    </Box>
  );
}
