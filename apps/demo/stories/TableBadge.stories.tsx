import {Box, Heading, TableBadge, TableBadgeProps} from "ferns-ui";
import React from "react";

export const TableBadgeDemo = (props: Partial<TableBadgeProps>) => {
  return (
    <Box alignContent="center" justifyContent="center">
      <TableBadge value="Table Title" {...props} />
    </Box>
  );
};

export const TableBadgeStates = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box alignItems="center" marginBottom={1}>
          <Heading>Default</Heading>
        </Box>
        <TableBadge value="Table Title" />
      </Box>
      <Box padding={2}>
        <Box alignItems="center" marginBottom={1}>
          <Heading>Editing</Heading>
        </Box>
        <TableBadge
          editingOptions={[
            {label: "Table Title", value: "Table Title"},
            {label: "Second Option", value: "so"},
            {label: "Third Option", value: "to"},
          ]}
          isEditing
          value="Table Title"
        />
      </Box>
    </Box>
  );
};
