import React, {Children, ReactElement, useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {DimensionValue} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import {Box} from "../Box";
import {ColumnSortInterface, TableProps} from "../Common";
import {PaginationControl} from "../Pagination";
import {TableContextProvider} from "./tableContext";

export const Table = ({
  children,
  columns, // see notes in common about table columns width and decide if we need to change this to a more specific type 'size'
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

  // If propsPage changes in the parent, update the local page state.
  useEffect(() => {
    if (propsPage && propsPage !== page) {
      setPage(propsPage);
    }
  }, [page, propsPage]);

  const shouldPaginate = more || page > 1;

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
        <Box flex="grow" maxWidth="100%" style={styles.tableContainer} width={width}>
          <ScrollView horizontal style={{width, maxWidth: "100%"}}>
            <View style={{width, maxWidth: "100%", flex: 1, maxHeight}}>
              {stickyHeader && (
                <View style={styles.stickyHeader}>
                  {Children.map(children, (child, index) =>
                    index === 0
                      ? React.cloneElement(child as any, {
                          color: index % 2 === 1 && alternateRowBackground ? "lightGray" : "white",
                        })
                      : null
                  )}
                </View>
              )}
              <ScrollView style={styles.scrollView}>
                {Children.map(
                  children,
                  (child, index) =>
                    index > 0 &&
                    Boolean(child) &&
                    React.cloneElement(child as any, {
                      color: index % 2 === 1 && alternateRowBackground ? "lightGray" : "white",
                    })
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </Box>
        {Boolean(shouldPaginate) && (
          <Box alignItems="center" borderTop="default" direction="row" height={60} paddingX={8}>
            <PaginationControl
              page={propsPage ?? page}
              setPage={propsSetPage ?? setPage}
              shouldDisableBackButton={(propsPage ?? page) <= 1}
              shouldDisableNextButton={!more}
            />
            {Boolean(extraControls) && extraControls}
          </Box>
        )}
      </>
    </TableContextProvider>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    position: "relative",
  },
  stickyHeader: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollView: {
    marginTop: 2,
  },
});
