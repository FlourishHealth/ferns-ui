import React from "react";

import {Box} from "./Box";
import {WithLabelProps} from "./Common";
import {Text} from "./Text";

export function WithLabel({
  label,
  labelInline,
  labelJustifyContent,
  labelAlignItems,
  labelPlacement,
  labelSize,
  labelColor,
  show,
  children,
}: WithLabelProps): React.ReactElement | null {
  if (!children) {
    return null;
  }
  return (
    <Box
      alignItems={labelAlignItems}
      direction={labelInline ? "row" : "column"}
      justifyContent={labelJustifyContent}
      width="100%"
    >
      {Boolean(label && labelPlacement !== "after") && (
        <Box paddingY={1}>
          <Text color={labelColor || "darkGray"} size={labelSize} weight="bold">
            {show !== false ? label : " "}
          </Text>
        </Box>
      )}
      {children}
      {Boolean(label && labelPlacement === "after") && (
        <Box paddingY={1}>
          <Text color={labelColor || "darkGray"} size={labelSize}>
            {show !== false ? label : " "}
          </Text>
        </Box>
      )}
    </Box>
  );
}
