import { Box, CheckBox, WithLabel } from "ferns-ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

interface State {
  boolean: boolean;
  withLabel: boolean;
  primary: boolean;
  small: boolean;
}

class Forms extends React.Component<{}, State> {
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
        <CheckBox
          checked={this.state.boolean}
          id="check"
          onChange={(result) => this.setState({ boolean: result.value })}
        />
        <WithLabel label="With A Label">
          <CheckBox
            checked={this.state.withLabel}
            id="withLabel"
            onChange={(result) => this.setState({ withLabel: result.value })}
          />
        </WithLabel>

        <WithLabel label="Primary Color">
          <CheckBox
            checked={this.state.primary}
            color="primary"
            id="primary"
            label="Primary Color"
            labelColor="primary"
            onChange={(result) => this.setState({ primary: result.value })}
          />
        </WithLabel>
        <WithLabel label="Small">
          <CheckBox
            checked={this.state.small}
            id="small"
            label="Small"
            size="sm"
            onChange={(result) => this.setState({ small: result.value })}
          />
        </WithLabel>
      </StorybookContainer>
    );
  }
}

export const CheckBoxStories = {
  title: "CheckBox",
  component: CheckBox,
  stories: {
    // eslint-disable-next-line react/display-name
    "Plain Checkbox": function () {
      return <Forms />;
    },
  },
};
