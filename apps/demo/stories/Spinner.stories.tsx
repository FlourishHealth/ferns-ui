import {Box, Spinner} from "ferns-ui";
import React from "react";

export const Small = (): React.ReactElement => {
  return (
    <Box width="100%">
      <Spinner size="sm" />
    </Box>
  );
};

export const Big = (): React.ReactElement => {
  return (
    <Box display="flex">
      <Spinner size="md" />
    </Box>
  );
};

export const Dark = (): React.ReactElement => {
  return (
    <Box color="darkGray" paddingY={6}>
      <Spinner color="white" />
    </Box>
  );
};
