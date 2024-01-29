import React from "react";

import {Box} from "../Box";
import {Text} from "../Text";

export const TextCell = ({text}: {text: string}): React.ReactElement => {
  return (
    <Box flex="grow" justifyContent="center">
      <Text>{text}</Text>
    </Box>
  );
};
