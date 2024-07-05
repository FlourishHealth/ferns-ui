import {Box, Heading, TableText, TableTextProps} from "ferns-ui";
import React from "react";

export const TableTextDemo = (props: Partial<TableTextProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableText value="Table Text" {...props} />
    </Box>
  );
};

export const TableTextVariants = () => {
  return (
    <Box alignContent="center" justifyContent="center">
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading> Default</Heading>
        </Box>
        <TableText value="sm max width" />
      </Box>

      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading> Variant multi</Heading>
        </Box>
        <TableText value="multi" variant="multi" />
        <TableText value="Has a larger max width meant to stay in single line. Will hold a lot of lorem ipsum" />
      </Box>
    </Box>
  );
};
