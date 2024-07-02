import {Box, TableTitle, TableTitleProps} from "ferns-ui";
import React from "react";

export const TableTitleDemo = (props: Partial<TableTitleProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableTitle title="Table Title" {...props} />
    </Box>
  );
};

export const TableTitleExample = () => {
  return (
    <Box alignContent="center" justifyContent="center">
      <TableTitle title="Standard Table Title" />
    </Box>
  );
};
