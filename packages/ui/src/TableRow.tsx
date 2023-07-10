import React, {Children, useRef} from "react";

import {Box} from "./Box";
import {BoxColor} from "./Common";
import {IconButton} from "./IconButton";
import {useTableContext} from "./tableContext";

interface Props {
  /**
   * Must be instances of TableCell or TableHeaderCell.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Header rows have an extra thick bottom border.
   */
  headerRow?: boolean;
  /**
   * Whether the row should start expanded or not.
   */
  expanded?: boolean;
  /**
   * When the row is expanded, the drawerContents are shown. If not
   */
  drawerContents?: React.ReactNode | React.ReactNode[];
  /**
   * Background color of the row. Defaults to white.
   */
  color?: BoxColor;
}

/**
 * Use TableRow to define a row in Table.
 */
export function TableRow({
  children,
  headerRow = false,
  expanded,
  drawerContents,
  color = "white",
}: Props): React.ReactElement {
  const [isExpanded, setIsExpanded] = React.useState(expanded || false);
  const {columns, hasDrawerContents} = useTableContext();
  const rowRef = useRef<Box>(null);

  const renderCellWithColumnIndex = (child: React.ReactNode, index: number) => {
    if (!columns[index]) {
      console.warn(`No width defined for column ${index} in TableRow`);
      return null;
    }
    return (
      <Box paddingX={2} width={columns[index]}>
        {child}
      </Box>
    );
  };

  const border = {__style: {borderBottom: `${headerRow ? 2 : 1}px solid #e0e0e0`}};

  return (
    <Box ref={rowRef} color={color} dangerouslySetInlineStyle={border} width="100%">
      <Box direction="row" paddingY={1} width="100%">
        {Boolean(drawerContents) && (
          <Box width={30}>
            <IconButton
              accessibilityLabel="expand"
              bgColor="white"
              icon={isExpanded ? "chevron-up" : "chevron-down"}
              iconColor="darkGray"
              size="sm"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          </Box>
        )}
        {/* Still render a blank space so the columns line up. */}
        {Boolean(hasDrawerContents && !drawerContents) && <Box width={30} />}
        {Children.map(children, renderCellWithColumnIndex)}
      </Box>
      {Boolean(isExpanded) && (
        <Box paddingX={2} width="100%">
          {drawerContents}
        </Box>
      )}
    </Box>
  );
}
