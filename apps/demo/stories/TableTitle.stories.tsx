import {Box, TableTitle, TableTitleProps} from "ferns-ui";
import React from "react";

export const TableTitleDemo = (props: Partial<TableTitleProps>) => {
  return <TableTitle size="md" title="Table Title" {...props} />;
};

export const TableTitleSize = () => {
  return (
    <Box>
      <Box padding={1}>
        <TableTitle size="sm" title="sm" />
      </Box>
      <Box padding={1}>
        <TableTitle
          size="sm"
          title="Small with many words pneumonoultramicroscopicsilicovolcanoconiosis"
        />
      </Box>
      <Box padding={1}>
        <TableTitle size="md" title="md" />
      </Box>
      <Box padding={1}>
        <TableTitle
          size="md"
          title="Medium with many words pneumonoultramicroscopicsilicovolcanoconiosis"
        />
      </Box>
      <Box padding={1}>
        <TableTitle size="lg" title="lg" />
      </Box>
      <Box padding={1}>
        <TableTitle
          size="lg"
          title="Large with many words pneumonoultramicroscopicsilicovolcanoconiosis"
        />
      </Box>
      <Box padding={1}>
        <TableTitle size="xl" title="xl" />
      </Box>
      <Box padding={1}>
        <TableTitle
          size="xl"
          title="Extra Large with many words pneumonoultramicroscopicsilicovolcanoconiosis"
        />
      </Box>
    </Box>
  );
};
