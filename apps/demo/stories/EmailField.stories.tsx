import {Box, Text, EmailField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const EmailFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("dwight@example.com");
  return (
    <>
      <EmailField
        label="Email"
        placeholderText="Enter an email address"
        value={value}
        onChange={(v: string) => setValue(v)}
      />
      <Box marginTop={2}>
        <Text>We only return correct email address back to the parent component.</Text>
        <Text>Returned Value: {value}</Text>
      </Box>
    </>
  );
};
