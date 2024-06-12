import {Field} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BooleanFieldDemo = () => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Boolean Field"
        name="boolean"
        type="boolean"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};
