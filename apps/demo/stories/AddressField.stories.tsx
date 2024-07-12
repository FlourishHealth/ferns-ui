import {Box, formatAddress, Text} from "ferns-ui";
import React from "react";

export const AddressFieldDemo = ({address}: any) => {
  const formattedAddress = formatAddress(
    address ?? {
      address1: "1234 Main St",
      address2: "Apt 123",
      city: "Anytown",
      state: "California",
      zipcode: "12345",
      countyName: "Any County",
      countyCode: "67890",
    }
  );
  return (
    <Box alignContent="end">
      <Text align="right">{formattedAddress}</Text>
    </Box>
  );
};
