import {Box, TableNumberProps, TableText} from "ferns-ui";
import React from "react";

export const TableNumberDemo = (props?: Partial<TableNumberProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableText value="$1.97" {...props} />
    </Box>
  );
};
