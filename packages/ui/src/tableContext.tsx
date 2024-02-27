import React, {Context, createContext, useContext} from "react";

export interface ColumnSortInterface {
  column: number | undefined;
  direction: "asc" | "desc" | undefined;
}

interface TableContextType {
  columns: Array<number | string>;
  hasDrawerContents: boolean;
  sortColumn?: ColumnSortInterface | undefined;
  setSortColumn?: (sort: ColumnSortInterface | undefined) => void;
  stickyHeader?: boolean;
  borderStyle?: "sm" | "none";
  alternateRowBackground?: boolean;
  page?: number;
}

interface Props extends TableContextType {
  children: React.ReactElement;
}

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
}: Props): React.ReactElement<typeof Provider> => {
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
