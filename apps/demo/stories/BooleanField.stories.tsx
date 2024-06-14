import {BooleanField} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BooleanFieldDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField
        disabledHelperText="Here's some help text"
        label="Boolean field"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};
