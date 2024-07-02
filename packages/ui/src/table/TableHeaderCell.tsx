import React, {ReactElement} from "react";

import {Box} from "../Box";
import {TableHeaderCellProps} from "../Common";
import {IconButton} from "../IconButton";
import {useTableContext} from "./tableContext";

/**
 * Use TableHeaderCell to define a header cell in Table.
 */
export const TableHeaderCell = ({
  children,
  index,
  sortable,
  onSortChange,
}: TableHeaderCellProps): ReactElement => {
  const {columns, setSortColumn, sortColumn} = useTableContext();
  const width = columns[index];
  if (!width) {
    console.warn(`No width defined for column ${index} in TableHeaderCell`);
  }

  const onClick = () => {
    // desc => asc => undefined
    const newSort = sort === "desc" ? "asc" : sort === "asc" ? undefined : "desc";
    if (setSortColumn) {
      setSortColumn(newSort ? {column: index, direction: newSort} : undefined);
    }
    onSortChange && onSortChange(newSort);
  };
  const sort = sortColumn?.column === index ? sortColumn.direction : undefined;

  if (sortable) {
    if (!onSortChange) {
      console.error("onSortChange is required when sortable is true");
    }
    return (
      <Box
        alignItems="center"
        direction="row"
        flex="grow"
        justifyContent="between"
        marginBottom={2}
        marginTop={2}
        maxWidth={width}
        minHeight={36}
        width={width}
        onClick={onClick}
      >
        {children}
        {Boolean(sort) && (
          <Box paddingX={2}>
            <IconButton
              accessibilityLabel="sort"
              iconName={sort === "asc" ? "arrow-down" : "arrow-up"}
              onClick={() => {}}
            />
          </Box>
        )}
      </Box>
    );
  } else {
    return (
      <Box flex="grow" justifyContent="center" marginBottom={2} marginTop={2} width={width}>
        {children}
      </Box>
    );
  }
};
