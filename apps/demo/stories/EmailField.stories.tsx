import {EmailField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const EmailFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("dwight@example.com");
  return (
    <EmailField
      label="Email"
      placeholderText="Enter an email address"
      value={value}
      onChange={(v: string) => setValue(v)}
    />
  );
};
