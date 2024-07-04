import {Box, Heading, TableTextField, TableTextFieldProps} from "ferns-ui";
import React from "react";

export const TableTextFieldDemo = (props: Partial<TableTextFieldProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableTextField value="Table Text" {...props} />
    </Box>
  );
};

export const TableTextFieldVariants = () => {
  return (
    <Box alignContent="center" justifyContent="center">
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading> Default</Heading>
        </Box>
        <TableTextField value="sm max width" />
      </Box>

      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading> Variant multi</Heading>
        </Box>
        <TableTextField value="multi" variant="multi" />
        <TableTextField value="Has a larger max width meant to stay in single line. Will hold a lot of lorem ipsum" />
      </Box>
    </Box>
  );
};
