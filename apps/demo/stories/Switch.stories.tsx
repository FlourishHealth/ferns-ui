import {Box, Switch, WithLabel} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const SwitchDemo = () => {
  return (
    <WithLabel label="Switch With A Label">
      <Switch id="withLabel" switched onChange={() => {}} />
    </WithLabel>
  );
};

export const SwitchForms = (): React.ReactElement => {
  const [boolean, setBoolean] = React.useState(false);
  const [withLabel, setWithLabel] = React.useState(false);
  const [primary, setPrimary] = React.useState(false);
  const [small, setSmall] = React.useState(false);

  return (
    <StorybookContainer>
      <Box direction="column" display="flex" height="100%" width="100%">
        <Switch id="check" switched={boolean} onChange={(result) => setBoolean(result)} />
        <WithLabel label="With A Label">
          <Switch id="withLabel" switched={withLabel} onChange={setWithLabel} />
        </WithLabel>

        <WithLabel label="Primary Color">
          <Switch
            id="primary"
            label="Primary Color"
            labelColor="primary"
            // color="primary"
            switched={primary}
            onChange={setPrimary}
          />
        </WithLabel>
        <WithLabel label="Small">
          <Switch
            id="small"
            label="Small"
            switched={small}
            // size="sm"
            onChange={setSmall}
          />
        </WithLabel>
      </Box>
    </StorybookContainer>
  );
};
