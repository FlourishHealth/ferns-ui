import {PhoneNumberField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const PhoneNumberFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("(608) 222-2222");
  return (
    <PhoneNumberField
      placeholderText="Enter a phone number"
      title="Phone Number"
      value={value}
      onChange={(v: string) => setValue(v)}
    />
  );
};
