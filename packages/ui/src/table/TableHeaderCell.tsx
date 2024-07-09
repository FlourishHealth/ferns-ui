// TableHeaderCell.tsx
import React, {ReactElement, useCallback} from "react";

import {Box} from "../Box";
import {AlignItems, TableHeaderCellProps} from "../Common";
import {IconButton} from "../IconButton";
import {useTableContext} from "./tableContext";
import {TableTitle} from "./TableTitle";

/**
 * Use TableHeaderCell to define a header cell in Table.
 */
export const TableHeaderCell = ({
  children,
  index,
  sortable,
  align = "left",
  title,
  onSortChange,
}: TableHeaderCellProps): ReactElement => {
  const {columns, setSortColumn, sortColumn} = useTableContext();
  const width = columns[index];
  if (!width) {
    console.warn(`No width defined for column ${index} in TableHeaderCell`);
  }
  if (children && title) {
    console.warn("Both children and title are defined in TableHeaderCell. Title will be ignored.");
  }
  if (!children && !title) {
    console.error("Either children or title is required in TableHeaderCell");
  }

  const sort = sortColumn?.column === index ? sortColumn.direction : undefined;
  let alignItems: AlignItems = "start";
  if (align === "center") {
    alignItems = "center";
  } else if (align === "right") {
    alignItems = "end";
  }

  const onClick = useCallback(() => {
    // desc => asc => undefined
    const newSort = sort === "desc" ? "asc" : sort === "asc" ? undefined : "desc";
    if (setSortColumn) {
      setSortColumn(newSort ? {column: index, direction: newSort} : undefined);
    }
    onSortChange && onSortChange(newSort);
  }, [index, onSortChange, setSortColumn, sort]);

  if (sortable && !onSortChange) {
    console.error("onSortChange is required when sortable is true");
  }
  return (
    <Box
      alignItems="center"
      direction="row"
      flex="grow"
      justifyContent={alignItems}
      onClick={sortable ? onClick : undefined}
    >
      {Boolean(children) && children}
      {Boolean(title) && <TableTitle align={align} title={title!} />}
      {Boolean(sort) && (
        <Box alignSelf="end" paddingX={2}>
          <IconButton
            accessibilityHint="press to change sorting alphabetical order"
            accessibilityLabel="sort"
            iconName={sort === "asc" ? "arrow-down" : "arrow-up"}
            onClick={() => {
              // Do nothing, the whole cell is clickable
            }}
          />
        </Box>
      )}
    </Box>
  );
};
