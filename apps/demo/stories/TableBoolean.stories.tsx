import {Box, Heading, TableBoolean, TableBooleanProps} from "ferns-ui";
import React from "react";

export const TableBooleanDemo = (props: Partial<TableBooleanProps>) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TableBoolean value={false} onSave={() => console.info("hello table bool")} {...props} />
    </Box>
  );
};

export const TableBooleanStates = () => {
  return (
    <Box direction="row" wrap>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Display True</Heading>
        </Box>
        <Box alignItems="center">
          <TableBoolean value onSave={() => console.info("hello table bool")} />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Display False</Heading>
        </Box>
        <Box alignItems="center">
          <TableBoolean value={false} onSave={() => console.info("hello table bool")} />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Editing True</Heading>
        </Box>
        <Box alignItems="center">
          <TableBoolean isEditing value onSave={() => console.info("hello table bool")} />
        </Box>
      </Box>
      <Box padding={2}>
        <Box marginBottom={1}>
          <Heading>Editing False</Heading>
        </Box>
        <Box alignItems="center">
          <TableBoolean isEditing value={false} onSave={() => console.info("hello table bool")} />
        </Box>
      </Box>
    </Box>
  );
};

// import {DemoConfiguration} from "@config";
// import {TableBoolean} from "ferns-ui";

// import React from "react";

// import {DefaultDemo} from "./DefaultDemo";

// export const TableBooleanConfiguration: DemoConfiguration = {
//   name: "Table boolean",
//   component: TableBoolean, // Replace with actual component reference
//   related: ["Table"],
//   description: "Use the table boolean to create easily scannable binary information for a user.",
//   a11yNotes: [],
//   category: "Component",
//   status: {
//     documentation: "ready",
//     figma: "ready",
//     figmaLink:
//       "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24153&mode=design&t=IZ8oGBzUmBzUtZMr-1",
//     ios: "ready",
//     android: "ready",
//     web: "ready",
//   },
//   additionalDocumentation: [],
//   interfaceName: "TableBooleanProps",
//   usage: {
//     do: ["Use this field to represent a binary. Has/has not, for example."],
//     doNot: ["Do not use this to represent data that’s not a true binary."],
//   },
//   props: {},
//   demo: () => <DefaultDemo />,
//   demoOptions: {},
//   stories: {},
// };
