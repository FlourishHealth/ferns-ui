import {
  Box,
  Button,
  Table,
  TableBadge,
  TableBoolean,
  TableHeader,
  TableHeaderCell,
  TableNumber,
  TableRow,
  TableText,
  TableTitle,
  Text,
} from "ferns-ui";
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
    <Table columns={[160, 200, 120, 200, 140, 140]}>
      <TableHeader>
        <TableHeaderCell
          index={0}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 0);
          }}
        >
          <TableTitle title="Column 1" />
        </TableHeaderCell>
        <TableHeaderCell
          index={1}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 1);
          }}
        >
          <TableTitle title="Column 2" />
        </TableHeaderCell>
        <TableHeaderCell
          index={2}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 2);
          }}
        >
          <TableTitle title="Column 3" />
        </TableHeaderCell>
        <TableHeaderCell
          index={3}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 3);
          }}
        >
          <TableTitle title="Cost" />
        </TableHeaderCell>
        <TableHeaderCell
          index={4}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 4);
          }}
        >
          <TableTitle align="center" title="Badge" />
        </TableHeaderCell>
        <TableHeaderCell
          index={5}
          sortable
          onSortChange={(direction) => {
            setSort(direction, 5);
          }}
        >
          <TableTitle align="center" title="Boolean" />
        </TableHeaderCell>
      </TableHeader>
      {rows.map((row, index) => (
        <TableRow key={row[0]} drawerContents={renderDrawerContents(index)}>
          <TableText value={String(row[0])} />
          <TableText value={String(row[1])} />
          <TableText value={String(row[2])} />
          <TableText value={`$${(row[3] as number).toFixed(2)}`} />
          <TableBadge value="Some Status" />
          <TableBoolean
            value={index % 2 === 0}
            onSave={function (): void | Promise<void> {
              console.info("Saved!");
            }}
          />
        </TableRow>
      ))}
    </Table>
  );
};

export const StandardTable = (): React.ReactElement => {
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
    <Box color="base" height={190} scroll width={400}>
      <Table columns={[120, 200, 200, 120]}>
        <TableHeader>
          <TableHeaderCell index={0}>
            <TableTitle title="Column 1" />
          </TableHeaderCell>
          <TableHeaderCell index={1}>
            <TableTitle title="Column 2" />
          </TableHeaderCell>
          <TableHeaderCell index={2}>
            <TableTitle title="Column 3" />
          </TableHeaderCell>
          <TableHeaderCell index={3}>
            <TableTitle title="Cost" />
          </TableHeaderCell>
        </TableHeader>
        {rows.map((row) => (
          <TableRow key={row}>
            <TableText key={`${row}1`} value={String(row)} />
            <TableText key={`${row}2`} value="Data" />
            <TableText key={`${row}3`} value="Other Data" />
            <TableNumber key={`${row}4`} value="$2.00" />
          </TableRow>
        ))}
      </Table>
    </Box>
  );
};

export const SortableExpandableTableStory = (): React.ReactElement => {
  return (
    <Box color="base" width="100%">
      <SortableExpandableTable />
    </Box>
  );
};
