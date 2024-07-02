import {Box, Heading, TableIconButton, TableIconButtonProps} from "ferns-ui";
import React from "react";

export const TableIconButtonDemo = (props: Partial<TableIconButtonProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableIconButton
        tableIconButtonName="edit"
        onClick={() => console.info("hello table icon button")}
        {...props}
      />
    </Box>
  );
};

export const TableIconButtonStates = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Edit</Heading>
        </Box>
        <Box alignItems="center">
          <TableIconButton tableIconButtonName="edit" onClick={() => console.info("click edit")} />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Save and Close</Heading>
        </Box>
        <Box alignItems="center">
          <TableIconButton
            tableIconButtonName="saveAndClose"
            onClick={() => console.info("save and close")}
          />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Insert</Heading>
        </Box>
        <Box alignItems="center">
          <TableIconButton
            tableIconButtonName="insert"
            onClick={() => console.info("insert data")}
          />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Drawer Open</Heading>
        </Box>
        <Box alignItems="center">
          <TableIconButton
            tableIconButtonName="drawerOpen"
            onClick={() => console.info("open drawer")}
          />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Drawer Close</Heading>
        </Box>
        <Box alignItems="center">
          <TableIconButton
            tableIconButtonName="drawerClose"
            onClick={() => console.info("close drawer")}
          />
        </Box>
      </Box>
    </Box>
  );
};
