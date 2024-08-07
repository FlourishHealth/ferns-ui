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
  Text,
} from "ferns-ui";
import sortBy from "lodash/sortBy";
import React, {useState} from "react";

export const SortableExpandableTableStory = (): React.ReactElement => {
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
    <Box color="base" direction="column" maxHeight={250} maxWidth={400} scroll>
      <Table columns={[160, 200, 120, 200, 140, 140]}>
        <TableHeader>
          <TableHeaderCell
            index={0}
            sortable
            title="Column 1"
            onSortChange={(direction) => {
              setSort(direction, 0);
            }}
          />
          <TableHeaderCell
            index={1}
            sortable
            title="Column 2"
            onSortChange={(direction) => {
              setSort(direction, 1);
            }}
          />
          <TableHeaderCell
            index={2}
            sortable
            title="Column 3"
            onSortChange={(direction) => {
              setSort(direction, 2);
            }}
          />
          <TableHeaderCell
            align="right"
            index={3}
            sortable
            title="Cost"
            onSortChange={(direction) => {
              setSort(direction, 3);
            }}
          />
          <TableHeaderCell
            align="center"
            index={4}
            sortable
            title="Badge"
            onSortChange={(direction) => {
              setSort(direction, 4);
            }}
          />
          <TableHeaderCell
            align="center"
            index={5}
            sortable
            title="Boolean"
            onSortChange={(direction) => {
              setSort(direction, 5);
            }}
          />
        </TableHeader>
        {rows.map((row, index) => (
          <TableRow key={row[0]} drawerContents={renderDrawerContents(index)}>
            <TableText value={String(row[0])} />
            <TableText value={String(row[1])} />
            <TableText value={String(row[2])} />
            <TableText align="right" value={`$${(row[3] as number).toFixed(2)}`} />
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
    </Box>
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
    <Box color="base" direction="column" maxHeight={250} maxWidth={400} scroll>
      <Table columns={[120, 120, 120, 120]}>
        <TableHeader>
          <TableHeaderCell index={0} title="Column 1" />
          <TableHeaderCell index={1} title="Column 2" />
          <TableHeaderCell index={2} title="Column 3" />
          <TableHeaderCell align="right" index={3} title="Cost" />
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
