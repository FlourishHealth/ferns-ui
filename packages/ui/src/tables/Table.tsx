import React, {Children, ReactElement} from "react";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import {Box} from "../Box";
import {ColumnSortInterface, TableProps} from "../Common";
import {PaginationControl} from "../Pagination";
import {ScrollView} from "../ScrollView";
import {TableContextProvider} from "./tableContext";

export const Table = ({
  children,
  columns,
  borderStyle,
  alternateRowBackground = true,
  maxHeight,
  stickyHeader = true,
  sort,
  page: propsPage,
  setPage: propsSetPage,
  more,
  extraControls,
}: TableProps): React.ReactElement => {
  const arrayChildren = Children.toArray(children);

  // Check if any of the rows below have a drawerContents prop to see if we need to render space
  // for the caret.
  const [sortColumn, setSortColumn] = React.useState<ColumnSortInterface | undefined>(sort);
  const [page, setPage] = React.useState<number>(propsPage ?? 1);
  // Check if any of the rows below have a drawerContents prop to see if we need to render space
  // for the caret.
  const hasDrawerContents = arrayChildren.some((child) => {
    return (child as ReactElement).props?.drawerContents;
  });

  // Calculate the total width of the table. If the table has only number widths, calculate a
  // width. Otherwise use 100%.
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

  const shouldPaginate = true;

  return (
    <TableContextProvider
      alternateRowBackground={alternateRowBackground}
      borderStyle={borderStyle}
      columns={columns}
      hasDrawerContents={hasDrawerContents}
      page={page}
      setSortColumn={setSortColumn}
      sortColumn={sortColumn}
      stickyHeader={stickyHeader}
    >
      <>
        <Box flex="grow" maxWidth="100%" width={width}>
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
        </Box>
        {Boolean(shouldPaginate) && (
          <Box direction="row" height={60} paddingX={8}>
            <PaginationControl
              page={propsPage ?? page}
              setPage={propsSetPage ?? setPage}
              shouldDisableBackButton={page <= 1}
              shouldDisableNextButton={!more}
            />
            {Boolean(extraControls) && extraControls}
          </Box>
        )}
      </>
    </TableContextProvider>
  );
};
