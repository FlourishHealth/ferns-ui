import {DemoConfiguration} from "@config";
import {Box, Button, Table, TableHeader, TableHeaderCell, TableRow, Text} from "ferns-ui";
import sortBy from "lodash/sortBy";
import React, {useState} from "react";

const SortableExpandableTable = () => {
  const [rows, setRows] = useState([
    ["Data 1 has some data in it", "Data 2 has some longer data in it", 5, 1000.4],
    ["Row 2 short", "Row 2 long", 10, 2000.0],
    [
      "Row 3 very long, lots of overflow here, wow is this still going? I hope it all fits!",
      "Row 3 long",
      1,
      2,
    ],
  ]);

  const renderDrawerContents = (index: number) => {
    return (
      <Box paddingY={8}>
        <Text>Drawer contents for row {index}</Text>
        <Button text="Console.log()" onClick={() => console.info("Button clicked")} />
      </Box>
    );
  };

  const setSort = (direction: "asc" | "desc" | undefined, index: number): void => {
    if (!direction) {
      setRows(rows);
    } else {
      direction === "asc" ? setRows(sortBy(rows, index)) : setRows(sortBy(rows, index).reverse());
    }
  };

  return (
    <Table columns={[160, 200, 120, 200]}>
      <TableHeader>
        <TableHeaderCell
          index={0}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 0);
          }}
        >
          <Text>Column 1</Text>
        </TableHeaderCell>
        <TableHeaderCell
          index={1}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 1);
          }}
        >
          <Text>Column 2</Text>
        </TableHeaderCell>
        <TableHeaderCell
          index={2}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 2);
          }}
        >
          <Text>Column 3</Text>
        </TableHeaderCell>
        <TableHeaderCell
          index={3}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 3);
          }}
        >
          <Text>Cost</Text>
        </TableHeaderCell>
      </TableHeader>
      {rows.map((row, index) => (
        <TableRow key={row[0]} drawerContents={renderDrawerContents(index)}>
          <Text>{row[0]}</Text>
          <Text>{row[1]}</Text>
          <Text>{row[2]}</Text>
          <Text>{`$${(row[3] as number).toFixed(2)}`}</Text>
        </TableRow>
      ))}
    </Table>
  );
};

const StandardTable = (): React.ReactElement => {
  const rows = [
    "Data 1 has some data in it",
    "Row 2 short",
    "Row 2 long",
    10,
    2000.0,
    "Row 3 very long, lots of overflow here, wow is this still going? I hope it all fits!",
    "Row 3 long",
    1,
    2,
  ];
  return (
    <Box color="white" height={190} scroll width={400}>
      <Table columns={[80, 200, 200, 80]}>
        <TableHeader>
          <TableHeaderCell index={0}>
            <Text>Column 1</Text>
          </TableHeaderCell>
          <TableHeaderCell index={1}>
            <Text>Column 2</Text>
          </TableHeaderCell>
          <TableHeaderCell index={2}>
            <Text>Column 3</Text>
          </TableHeaderCell>
          <TableHeaderCell index={2}>
            <Text>Cost</Text>
          </TableHeaderCell>
        </TableHeader>
        {rows.map((row) => (
          <TableRow key={row}>
            <Text key={`${row}1`}>{row}</Text>
            <Text key={`${row}2`}>Data</Text>
            <Text key={`${row}3`}>Other Data</Text>
            <Text key={`${row}4`}>$2.00</Text>
          </TableRow>
        ))}
      </Table>
    </Box>
  );
};

const SortableExpandableTableStory = (): React.ReactElement => {
  return (
    <Box color="white" width="100%">
      <SortableExpandableTable />
    </Box>
  );
};

export const TableConfiguration: DemoConfiguration = {
  name: "Table",
  component: Table,
  related: [
    "Table badge",
    "Table boolean",
    "Table date",
    "Table icon button",
    "Table number",
    "Table text field",
  ],
  description:
    "In this case, Table is a pattern, not a component. Build a table by sorting the table component items into rows. Each row should have an alternating color.",
  a11yNotes: [
    "Use a label to announce the content of the table.",
    "Don’t include the word 'table' in that label, as it’s redundant.",
    "The tab key should place focus on interactive elements, including sortable headers.",
  ],
  category: ["Layout", "Pattern"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A24283&mode=design&t=iCiJI3xbrm6rrXPg-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "TableProps",
  usage: {
    do: [
      "Display structured data in a scannable way.",
      "Allow users to compare information in rows and columns.",
      "Keep scannability in mind whenever designing new components for this pattern.",
    ],
    doNot: [
      "Don’t use this if there will never be enough data to populate more than two rows.",
      "Display content that can’t be reasonably sorted and compared.",
    ],
  },
  props: {},
  demo: StandardTable,
  demoOptions: {},
  stories: {
    Standard: {render: StandardTable},
    SortableExpandable: {render: SortableExpandableTableStory},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
