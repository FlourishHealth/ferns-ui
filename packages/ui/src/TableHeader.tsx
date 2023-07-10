import React from "react";

import {Box} from "./Box";
import {BoxColor} from "./Common";
import {TableRow} from "./TableRow";

interface TableHeaderProps {
  /**
   * Must be an instance of TableRow.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Display `visuallyHidden` ensures the component is visually hidden but still is read by screen readers.
   */
  display?: "tableHeaderGroup" | "visuallyHidden";
  /**
   * If true, the table header will be sticky and the table body will be scrollable. Not yet implemented.
   */
  sticky?: boolean;
  color?: BoxColor;
}

/**
 * Use TableHeader to group the header content in Table.
 */
export function TableHeader({
  children,
  display = "tableHeaderGroup",
  color,
}: TableHeaderProps): React.ReactElement {
  return (
    <Box color={color ?? "white"} display={display === "visuallyHidden" ? "none" : "flex"}>
      <TableRow headerRow>{children}</TableRow>
    </Box>
  );
}
