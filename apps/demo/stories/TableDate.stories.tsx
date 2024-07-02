import {Box, Heading, TableDate, TableTitleProps} from "ferns-ui";
import React from "react";

export const TableDateDemo = (props: Partial<TableTitleProps>) => {
  return (
    <Box alignContent="center" justifyContent="center">
      <TableDate value="2013-01-12" {...props} />
    </Box>
  );
};

export const TableDateAnnotation = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading size="sm">Default</Heading>
        </Box>
        <TableDate value="2013-01-12" />
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading size="sm">Annotated</Heading>
        </Box>
        <TableDate annotated value="2024-01-12" />
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading size="sm">Is Editing</Heading>
        </Box>
        <TableDate isEditing value="2013-01-12" />
      </Box>
    </Box>
  );
};
