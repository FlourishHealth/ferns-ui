import {BooleanField} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

export const BooleanFieldDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField
        disabledHelperText="Here's some help text"
        title="Boolean field"
        value={value}
        variant="simple"
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

export const BooleanFieldDisabledDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField
        disabled
        disabledHelperText="Here's some help text"
        label="Boolean field"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

export const BooleanFieldWithTitleDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField
        disabledHelperText="Here's some help text"
        title="Boolean field"
        value={value}
        variant="title"
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

export const BooleanFieldDisabledWithTitleDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField
        disabled
        disabledHelperText="Here's some help text"
        title="Boolean field"
        value={value}
        variant="title"
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

export const BooleanFieldNoLabelDemo = (): React.ReactElement => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <BooleanField value={value} variant="simple" onChange={setValue} />
    </StorybookContainer>
  );
};
