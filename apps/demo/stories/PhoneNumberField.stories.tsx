import {Box, PhoneNumberField, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const PhoneNumberFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("(608) 222-2222");
  return (
    <>
      <PhoneNumberField
        placeholder="Enter a phone number"
        title="Phone Number"
        value={value}
        onChange={(v: string) => setValue(v)}
      />
      <Box marginTop={2}>
        <Text>We only return correct phone numbers back to the parent component.</Text>
        <Text>Returned Value: {value}</Text>
      </Box>
    </>
  );
};
