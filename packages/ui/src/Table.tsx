import React, {Children, ReactElement, useRef} from "react";

import {Box} from "./Box";
import {ScrollView} from "./ScrollView";
import {ColumnSortInterface, TableContextProvider} from "./tableContext";

interface TableProps {
  /**
   * Must be instances of TableHeader, TableRow, and/or TableFooter components.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Width of columns in the table. This is used to calculate the width of each column. Can be numbers for pixels or strings for percentages.
   */
  columns: Array<number | string>;
  /**
   * Specify a border width for Table: "sm" is 1px.
   */
  borderStyle?: "sm" | "none";
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: number | string;
}

export function Table({children, columns, borderStyle, maxHeight}: TableProps): React.ReactElement {
  const tableRef = useRef(null);
  const arrayChildren = Children.toArray(children);
  const [sortColumn, setSortColumn] = React.useState<ColumnSortInterface | undefined>(undefined);

  // Check if any of the rows below have a drawerContents prop to see if we need to render space for the caret.
  const hasDrawerContents = arrayChildren.some((child) => {
    return (child as ReactElement).props?.drawerContents;
  });

  // Calculate the total width of the table. If the table has only number widths, calculate a width. Otherwise use 100%.
  let width: string | number;
  if (columns.every((column) => typeof column === "number")) {
    width = columns.reduce((acc, curr) => {
      return (acc as number) + (curr as number);
    }, 0);
    if (hasDrawerContents) {
      width = (width as number) + 30;
    }
  } else {
    width = "100%";
  }

  return (
    <TableContextProvider
      columns={columns}
      hasDrawerContents={hasDrawerContents}
      setSortColumn={setSortColumn}
      sortColumn={sortColumn}
    >
      <ScrollView horizontal style={{width, maxWidth: "100%"}}>
        <Box
          width={width}
          {...(borderStyle === "sm" ? {borderStyle: "sm", rounding: 1} : {})}
          ref={tableRef}
          flex="grow"
          maxHeight={maxHeight}
        >
          {children}
        </Box>
      </ScrollView>
    </TableContextProvider>
  );
}
