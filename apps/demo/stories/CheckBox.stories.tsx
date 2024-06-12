import {StorybookContainer} from "@components";
import {CheckBox} from "ferns-ui";
import React from "react";

export const CheckboxDemo = () => {
  return <CheckBox checked label="Checkbox With A Label" onChange={() => {}} />;
};

export const Checkboxes = ({disabled}: {disabled: boolean}): React.ReactElement => {
  const [boolean, setBoolean] = React.useState(false);
  const [withLabel, setWithLabel] = React.useState(false);
  const [primary, setPrimary] = React.useState(false);
  const [small, setSmall] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);

  return (
    <StorybookContainer>
      <CheckBox
        checked={boolean}
        disabled={disabled}
        onChange={(result) => setBoolean(result.value)}
      />

      <CheckBox
        checked={withLabel}
        disabled={disabled}
        label="With A Label"
        onChange={(result) => setWithLabel(result.value)}
      />

      <CheckBox
        checked={primary}
        color="primary"
        disabled={disabled}
        label="Primary Color"
        labelColor="primary"
        onChange={(result) => setPrimary(result.value)}
      />

      <CheckBox
        checked={small}
        disabled={disabled}
        label="Small"
        size="sm"
        onChange={(result) => setSmall(result.value)}
      />

      <CheckBox
        disabled={disabled}
        indeterminate={indeterminate}
        label="Indeterminate"
        size="sm"
        onChange={(result) => {
          setIndeterminate(result.value);
        }}
      />
    </StorybookContainer>
  );
};
