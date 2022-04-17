import {Switch} from "../../ui/src/Switch";
import {storiesOf} from "@storybook/react-native";
import React from "react";
import {Box} from "../../ui/src/Box";
import {WithLabel} from "../../ui/src/WithLabel";
import {StorybookContainer} from "../../ui/src/StorybookContainer";

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
        <Box width="100%" height="100%" display="flex" direction="column">
          <Switch
            id="check"
            switched={this.state.boolean}
            onChange={(result) => this.setState({boolean: result})}
          />
          <WithLabel label="With A Label">
            <Switch
              id="withLabel"
              switched={this.state.withLabel}
              onChange={(result) => this.setState({withLabel: result})}
            />
          </WithLabel>

          <WithLabel label="Primary Color">
            <Switch
              id="primary"
              switched={this.state.primary}
              label="Primary Color"
              // color="primary"
              labelColor="primary"
              onChange={(result) => this.setState({primary: result})}
            />
          </WithLabel>
          <WithLabel label="Small">
            <Switch
              id="small"
              switched={this.state.small}
              label="Small"
              // size="sm"
              onChange={(result) => this.setState({small: result})}
            />
          </WithLabel>
        </Box>
      </StorybookContainer>
    );
  }
}

storiesOf("Switch", module).add("Switch", () => <SwitchForms />);
