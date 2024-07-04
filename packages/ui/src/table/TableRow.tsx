import React, {Children, useRef} from "react";

import {Box} from "../Box";
import {TableRowProps} from "../Common";
import {IconButton} from "../IconButton";
import {useTableContext} from "./tableContext";

/**
 * Use TableRow to define a row in Table.
 */
export const TableRow = ({
  children,
  headerRow = false,
  expanded,
  drawerContents,
  color = "base",
}: TableRowProps): React.ReactElement => {
  const [isExpanded, setIsExpanded] = React.useState(expanded || false);
  const {columns, hasDrawerContents} = useTableContext();
  const rowRef = useRef<typeof Box>(null);

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
              accessibilityHint="press to expand"
              accessibilityLabel="expand"
              iconName={isExpanded ? "chevron-up" : "chevron-down"}
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
};
