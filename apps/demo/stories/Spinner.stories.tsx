import {Box, Spinner, SpinnerProps} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const SpinnerDemo = (props: SpinnerProps): React.ReactElement => {
  return (
    <Box width="100%">
      <Spinner {...props} />
    </Box>
  );
};

export const SpinnerVariations = (): React.ReactElement => {
  return (
    <StorybookContainer>
      <Box direction="row" display="flex" justifyContent="between" marginBottom={2}>
        <Spinner color="light" size="md" />
        <Spinner color="dark" size="md" />
        <Spinner color="secondary" size="md" />
        <Spinner color="accent" size="md" />
      </Box>
      <Box direction="row" justifyContent="between">
        <Spinner color="light" size="sm" />
        <Spinner color="dark" size="sm" />
        <Spinner color="secondary" size="sm" />
        <Spinner color="accent" size="sm" />
      </Box>
    </StorybookContainer>
  );
};
