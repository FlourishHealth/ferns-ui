import React, {ReactElement} from "react";

import {Box} from "./Box";
import {Button} from "./Button";
import {Text} from "./Text";

interface PaginationControlProps {
  shouldDisableBackButton: boolean;
  shouldDisableNextButton: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const PaginationControl = ({
  shouldDisableBackButton,
  shouldDisableNextButton,
  page,
  setPage,
}: PaginationControlProps): ReactElement => {
  return (
    <Box direction="row" paddingY={2}>
      <Box>
        <Button
          color="blue"
          disabled={shouldDisableBackButton}
          text="Prev Page"
          onClick={(): void => setPage(Number(page) - 1)}
        />
      </Box>
      <Box justifyContent="center" paddingX={4}>
        <Text>Page: {page}</Text>
      </Box>
      <Box>
        <Button
          color="blue"
          disabled={shouldDisableNextButton}
          text="Next Page"
          onClick={(): void => setPage(Number(page) + 1)}
        />
      </Box>
    </Box>
  );
};
