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
}

interface Props extends TableContextType {
  children: React.ReactElement;
}

const TableContext: Context<TableContextType> = createContext<TableContextType>({
  columns: [],
  hasDrawerContents: false,
  sortColumn: undefined,
  setSortColumn: () => {},
});

export const {Provider} = TableContext;

export function TableContextProvider({
  children,
  columns,
  hasDrawerContents,
  sortColumn,
  setSortColumn,
}: Props): React.ReactElement<typeof Provider> {
  return (
    <Provider value={{columns, hasDrawerContents, sortColumn, setSortColumn}}>{children}</Provider>
  );
}

export function useTableContext(): TableContextType {
  const {columns, hasDrawerContents, setSortColumn, sortColumn} = useContext(TableContext);
  return {columns, hasDrawerContents, setSortColumn, sortColumn};
}
