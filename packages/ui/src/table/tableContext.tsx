import React, {Context, createContext, useContext} from "react";

import {TableContextProviderProps, TableContextType} from "../Common";

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  columns: [],
  hasDrawerContents: false,
  sortColumn: undefined,
  setSortColumn: () => {},
  stickyHeader: true,
  borderStyle: "sm",
  alternateRowBackground: true,
  page: 1,
});

export const {Provider} = TableContext;

export const TableContextProvider = ({
  children,
  columns,
  hasDrawerContents,
  sortColumn,
  setSortColumn,
  stickyHeader,
  borderStyle,
  alternateRowBackground,
  page,
}: TableContextProviderProps): React.ReactElement<typeof Provider> => {
  return (
    <Provider
      value={{
        columns,
        alternateRowBackground,
        borderStyle,
        hasDrawerContents,
        sortColumn,
        setSortColumn,
        stickyHeader,
        page,
      }}
    >
      {children}
    </Provider>
  );
};

export function useTableContext(): TableContextType {
  const {
    columns,
    hasDrawerContents,
    setSortColumn,
    sortColumn,
    stickyHeader,
    alternateRowBackground,
    borderStyle,
  } = useContext(TableContext);
  return {
    columns,
    hasDrawerContents,
    setSortColumn,
    sortColumn,
    stickyHeader,
    alternateRowBackground,
    borderStyle,
  };
}
