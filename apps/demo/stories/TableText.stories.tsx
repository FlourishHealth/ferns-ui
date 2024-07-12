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
  const twoLines = `This text is broken up\ninto two lines`;
  return (
    <Box alignContent="center" justifyContent="center">
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Default</Heading>
        </Box>
        <TableText value="Smaller Text" />
        <TableText value="Has a larger amount of text, meant to stay in single line. Will hold a lot of lorem ipsum" />
        <TableText value={twoLines} />
      </Box>
    </Box>
  );
};
