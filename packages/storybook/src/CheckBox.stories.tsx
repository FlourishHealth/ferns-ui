import React from "react";
import {Box} from "../../ui/src/Box";
import {CheckBox} from "../../ui/src/CheckBox";
import {WithLabel} from "../../ui/src/WithLabel";
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "../../ui/src/StorybookContainer";

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
          id="check"
          checked={this.state.boolean}
          onChange={(result) => this.setState({boolean: result.value})}
        />
        <WithLabel label="With A Label">
          <CheckBox
            id="withLabel"
            checked={this.state.withLabel}
            onChange={(result) => this.setState({withLabel: result.value})}
          />
        </WithLabel>

        <WithLabel label="Primary Color">
          <CheckBox
            id="primary"
            checked={this.state.primary}
            label="Primary Color"
            color="primary"
            labelColor="primary"
            onChange={(result) => this.setState({primary: result.value})}
          />
        </WithLabel>
        <WithLabel label="Small">
          <CheckBox
            id="small"
            checked={this.state.small}
            label="Small"
            size="sm"
            onChange={(result) => this.setState({small: result.value})}
          />
        </WithLabel>
      </StorybookContainer>
    );
  }
}

storiesOf("Check Box", module).add("Plain", () => <Forms />);
