import React from "react";

import {Box} from "./Box";
import {AllColors, JustifyContent, ReactChildren, TextSize} from "./Common";
import {Text} from "./Text";

export interface WithLabelProps {
  children?: ReactChildren;
  show?: boolean;
  label?: string;
  labelInline?: boolean;
  labelColor?: AllColors;
  labelJustifyContent?: JustifyContent;
  labelPlacement?: "before" | "after";
  labelSize?: TextSize;
}

export function WithLabel({
  label,
  labelInline,
  labelJustifyContent,
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
