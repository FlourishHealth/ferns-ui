import {Box, TableBadge, TableBadgeProps} from "ferns-ui";
import React from "react";

export const TableBadgeDemo = (props: Partial<TableBadgeProps>) => {
  return (
    <Box alignContent="center" justifyContent="center">
      <TableBadge size="md" title="Table Title" {...props} />
    </Box>
  );
};

export const TableBadgeStates = () => {
  return (
    <Box>
      <Box padding={1}>
        <TableBadge size="sm" title="sm" />
      </Box>
      <Box padding={1}>
        <TableBadge size="sm" />
      </Box>
      <Box padding={1}>
        <TableBadge size="md" title="md" />
      </Box>
    </Box>
  );
};
