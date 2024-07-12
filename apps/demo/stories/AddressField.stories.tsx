import {AddressInterface, Box, Field, formatAddress, Text} from "ferns-ui";
import React, {useEffect, useState} from "react";

export const AddressFieldDemo = ({googleMapsApiKey, includeCounty}: any) => {
  const [demoAddress, setDemoAddress] = useState<AddressInterface>({
    address1: "1234 Main St",
    address2: "Apt 123",
    city: "Anytown",
    state: "California",
    zipcode: "12345",
  });

  const [formattedAddress, setFormattedAddress] = useState("");

  // Update formatted address
  useEffect(() => {
    setFormattedAddress(formatAddress(demoAddress));
  }, [demoAddress]);

  // Update Demo Address
  useEffect(() => {
    if (includeCounty) {
      setDemoAddress({
        address1: "1234 Main St",
        address2: "Apt 123",
        city: "Anytown",
        state: "California",
        zipcode: "12345",
        countyName: "Any County",
        countyCode: "67890",
      });
    } else {
      setDemoAddress({
        address1: "1234 Main St",
        address2: "Apt 123",
        city: "Anytown",
        state: "California",
        zipcode: "12345",
      });
    }
  }, [includeCounty]);

  console.log(googleMapsApiKey);

  return (
    <Box alignContent="center" direction="row" justifyContent="around" width="100%">
      <Box alignItems="center" justifyContent="center">
        <Text align="right">{formattedAddress}</Text>
      </Box>
      <Box>
        <Field
          googleMapsApiKey={googleMapsApiKey}
          includeCounty={includeCounty}
          type="address"
          value={demoAddress}
          onChange={(val: AddressInterface) => setDemoAddress(val)}
        />
      </Box>
    </Box>
  );
};
