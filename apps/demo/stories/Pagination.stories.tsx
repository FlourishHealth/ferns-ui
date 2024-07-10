import {Pagination} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const PaginationDemo = (): ReactElement => {
  const [page, setPage] = useState(5);
  return <Pagination page={page} setPage={setPage} totalPages={10} />;
};

export const PaginationStory = (): ReactElement => {
  const [page, setPage] = useState(2);
  return <Pagination page={page} setPage={setPage} totalPages={4} />;
};

export const PaginationMoreStory = (): ReactElement => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} setPage={setPage} totalPages={10} />;
};
