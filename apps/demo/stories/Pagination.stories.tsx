import {Pagination, PaginationProps} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const PaginationDemo = ({totalPages = 5}: Partial<PaginationProps>): ReactElement => {
  // Something funky is going on with FieldProps through the config so this is a temp fix for demo
  // purposes
  const convertedTotalPages = totalPages;

  if (typeof totalPages === "string") {
    parseInt(totalPages);
  }
  const [page, setPage] = useState(5);
  return <Pagination page={page} setPage={setPage} totalPages={convertedTotalPages} />;
};

export const PaginationStory = (): ReactElement => {
  const [page, setPage] = useState(2);
  return <Pagination page={page} setPage={setPage} totalPages={5} />;
};

export const PaginationMoreStory = (): ReactElement => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} setPage={setPage} totalPages={10} />;
};
