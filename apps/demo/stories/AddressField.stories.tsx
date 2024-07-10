import {Box, formatAddress, Text} from "ferns-ui";
import React from "react";

export const AddressFieldDemo = ({address}: any) => {
  const formattedAddress = formatAddress(address);
  return (
    <Box alignContent="end">
      <Text align="right">{formattedAddress}</Text>
    </Box>
  );
};
