import React from "react";
import {Box} from "@ferns/ui"
import {FormLine} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

export default {
  title: "FormLine",
  component: FormLine,
};

interface State {
  name: string;
  boolean: boolean;
  textarea: string;
  multiboolean: any;
  select?: string;
}

class Forms extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      boolean: true,
      textarea: "",
      multiboolean: {one: true, two: true, three: true},
      select: undefined,
    };
  }

  render() {
    return (
      <StorybookContainer>
        <Box paddingY={2}>
          <FormLine
            name="name"
            value={this.state.name}
            onSave={(name) => this.setState({name})}
            kind="string"
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            name="boolean"
            value={this.state.boolean}
            onSave={(boolean) => this.setState({boolean})}
            kind="boolean"
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            name="textarea"
            value={this.state.textarea}
            onSave={(textarea) => this.setState({textarea})}
            kind="textarea"
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            name="multiboolean"
            value={this.state.multiboolean}
            onSave={(multiboolean) => this.setState({multiboolean})}
            kind="multiboolean"
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            name="select"
            value={this.state.select}
            onSave={(select) => this.setState({select})}
            kind="select"
            options={[undefined, "ay", "bee", "see"]}
          />
        </Box>
      </StorybookContainer>
    );
  }
}

storiesOf("Form", module).add("Forms", () => <Forms />);
