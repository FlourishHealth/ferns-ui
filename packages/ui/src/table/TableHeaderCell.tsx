// TableHeaderCell.tsx
import {FontAwesome6} from "@expo/vector-icons";
import React, {ReactElement, useCallback} from "react";
import {View} from "react-native";

import {Box} from "../Box";
import {AlignItems, TableHeaderCellProps} from "../Common";
import {useTheme} from "../Theme";
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
  const {theme} = useTheme();

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
      // accessibilityHint="press to change sorting alphabetical order"
      // accessibilityLabel="sort"
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
          {/* Make it look like an IconButton, but we can't nest buttons and the whole row is clickable. */}
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.surface.primary,
              borderRadius: theme.radius.rounded as any,
              justifyContent: "center",
              height: 16,
              width: 16,
            }}
          >
            <FontAwesome6
              brand="solid"
              color={theme.text.inverted}
              name={sort === "asc" ? "arrow-down" : "arrow-up"}
              size={10}
            />
          </View>
        </Box>
      )}
    </Box>
  );
};
