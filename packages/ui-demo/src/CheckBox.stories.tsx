import {CheckBox} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const Checkboxes = ({disabled}: {disabled: boolean}): React.ReactElement => {
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
        id="check"
        onChange={(result) => setBoolean(result.value)}
      />

      <CheckBox
        checked={withLabel}
        disabled={disabled}
        id="withLabel"
        label="With A Label"
        onChange={(result) => setWithLabel(result.value)}
      />

      <CheckBox
        checked={primary}
        color="primary"
        disabled={disabled}
        id="primary"
        label="Primary Color"
        labelColor="primary"
        onChange={(result) => setPrimary(result.value)}
      />

      <CheckBox
        checked={small}
        disabled={disabled}
        id="small"
        label="Small"
        size="sm"
        onChange={(result) => setSmall(result.value)}
      />

      <CheckBox
        disabled={disabled}
        id="small"
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

export const CheckBoxStories = {
  title: "CheckBox",
  component: CheckBox,
  stories: {
    // eslint-disable-next-line react/display-name
    "Plain Checkbox": function () {
      return <Checkboxes disabled={false} />;
    },
    "Disabled Checkbox": function () {
      return <Checkboxes disabled />;
    },
  },
};
