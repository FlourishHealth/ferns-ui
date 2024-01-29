// A read-only cell that displays a checkmark if the user has completed a task or not
import React from "react";

import {Box} from "../Box";
import {Icon} from "../Icon";

export const CheckedCell = ({checked}: {checked: boolean}): React.ReactElement => {
  return (
    <Box flex="grow" justifyContent="center" width="100%">
      <Icon color={checked ? "green" : "gray"} name={checked ? "check" : "times"} />
    </Box>
  );
};
