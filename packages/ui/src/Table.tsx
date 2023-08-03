import React, {Children, ReactElement} from "react";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

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
  maxHeight?: DimensionValue;
  /**
   * If true, the header will stick to the top of the table when scrolling. Defaults to true.
   */
  stickyHeader?: boolean;
  /**
   * If true, alternate rows will have a light gray background. Defaults to true.
   */
  alternateRowBackground?: boolean;
}

export function Table({
  children,
  columns,
  borderStyle,
  alternateRowBackground = true,
  maxHeight,
  stickyHeader = true,
}: TableProps): React.ReactElement {
  const arrayChildren = Children.toArray(children);
  const [sortColumn, setSortColumn] = React.useState<ColumnSortInterface | undefined>(undefined);

  // Check if any of the rows below have a drawerContents prop to see if we need to render space for the caret.
  const hasDrawerContents = arrayChildren.some((child) => {
    return (child as ReactElement).props?.drawerContents;
  });

  // Calculate the total width of the table. If the table has only number widths, calculate a width. Otherwise use 100%.
  let width: DimensionValue;
  if (columns.every((column) => typeof column === "number")) {
    width = columns.reduce((acc, curr) => {
      return (acc as number) + (curr as number);
    }, 0) as number;
    if (hasDrawerContents) {
      width = (width as number) + 30;
    }
  } else {
    width = "100%";
  }

  return (
    <TableContextProvider
      alternateRowBackground={alternateRowBackground}
      borderStyle={borderStyle}
      columns={columns}
      hasDrawerContents={hasDrawerContents}
      setSortColumn={setSortColumn}
      sortColumn={sortColumn}
      stickyHeader={stickyHeader}
    >
      <ScrollView horizontal style={{width, maxWidth: "100%"}}>
        <ScrollView
          stickyHeaderIndices={stickyHeader ? [0] : undefined}
          style={{width, maxWidth: "100%", flex: 1, maxHeight}}
        >
          {Children.map(children, (child, index) =>
            React.cloneElement(child as any, {
              color: index % 2 === 1 && alternateRowBackground ? "lightGray" : "white",
            })
          )}
        </ScrollView>
      </ScrollView>
    </TableContextProvider>
  );
}
