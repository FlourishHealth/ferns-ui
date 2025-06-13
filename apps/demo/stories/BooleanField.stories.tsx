import {BooleanField, useStoredState} from "ferns-ui";
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
        title="Boolean field"
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

export const BooleanFieldWithStoredStateDemo = (): React.ReactElement => {
  const [value, setValue, isLoading] = useStoredState<boolean>("booleanFieldDemo", false);
  
  if (isLoading) {
    return (
      <StorybookContainer>
        <div>Loading...</div>
      </StorybookContainer>
    );
  }

  return (
    <StorybookContainer>
      <BooleanField
        title="Persistent Boolean Field"
        helperText="This value persists after page refresh. Try toggling it and refreshing the page!"
        value={value ?? false}
        variant="title"
        onChange={(newValue) => {
          void setValue(newValue);
        }}
      />
    </StorybookContainer>
  );
};
