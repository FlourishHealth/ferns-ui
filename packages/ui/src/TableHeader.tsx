import React from "react";

import {Box} from "./Box";
import {TableHeaderProps} from "./Common";
import {TableRow} from "./TableRow";

/**
 * Use TableHeader to group the header content in Table.
 */
export const TableHeader = ({
  children,
  display = "tableHeaderGroup",
  color,
}: TableHeaderProps): React.ReactElement => {
  return (
    <Box color={color ?? "white"} display={display === "visuallyHidden" ? "none" : "flex"}>
      <TableRow headerRow>{children}</TableRow>
    </Box>
  );
};
