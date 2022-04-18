import { Box, FormLine } from "@ferns/ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const FormStories = {
  title: "Forms",
  component: FormLine,
  stories: {
    "Form Line": function () {
      return <Forms />;
    },
  },
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
      multiboolean: { one: true, two: true, three: true },
      select: undefined,
    };
  }

  render() {
    return (
      <StorybookContainer>
        <Box paddingY={2}>
          <FormLine
            kind="string"
            name="name"
            value={this.state.name}
            onSave={(name) => this.setState({ name })}
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            kind="boolean"
            name="boolean"
            value={this.state.boolean}
            onSave={(boolean) => this.setState({ boolean })}
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            kind="textarea"
            name="textarea"
            value={this.state.textarea}
            onSave={(textarea) => this.setState({ textarea })}
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            kind="multiboolean"
            name="multiboolean"
            value={this.state.multiboolean}
            onSave={(multiboolean) => this.setState({ multiboolean })}
          />
        </Box>
        <Box paddingY={2}>
          <FormLine
            kind="select"
            name="select"
            options={[undefined, "ay", "bee", "see"]}
            value={this.state.select}
            onSave={(select) => this.setState({ select })}
          />
        </Box>
      </StorybookContainer>
    );
  }
}
