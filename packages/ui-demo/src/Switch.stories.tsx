import { Box, Switch, WithLabel } from "@ferns/ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

interface State {
  boolean: boolean;
  withLabel: boolean;
  primary: boolean;
  small: boolean;
}

class SwitchForms extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      boolean: false,
      withLabel: false,
      primary: false,
      small: false,
    };
  }

  render() {
    return (
      <StorybookContainer>
        <Box direction="column" display="flex" height="100%" width="100%">
          <Switch
            id="check"
            switched={this.state.boolean}
            onChange={(result) => this.setState({ boolean: result })}
          />
          <WithLabel label="With A Label">
            <Switch
              id="withLabel"
              switched={this.state.withLabel}
              onChange={(result) => this.setState({ withLabel: result })}
            />
          </WithLabel>

          <WithLabel label="Primary Color">
            <Switch
              id="primary"
              label="Primary Color"
              labelColor="primary"
              // color="primary"
              switched={this.state.primary}
              onChange={(result) => this.setState({ primary: result })}
            />
          </WithLabel>
          <WithLabel label="Small">
            <Switch
              id="small"
              label="Small"
              switched={this.state.small}
              // size="sm"
              onChange={(result) => this.setState({ small: result })}
            />
          </WithLabel>
        </Box>
      </StorybookContainer>
    );
  }
}

export const SwitchStories = {
  title: "Switch",
  component: Switch,
  stories: {
    Switch() {
      return <SwitchForms />;
    },
  },
};
