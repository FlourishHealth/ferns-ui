import React from "react";
import {Box} from "@ferns/ui"
import {TextField} from "@ferns/ui"
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

export default {
  title: "TextField",
  component: TextField,
};

storiesOf("Text Field", module)
  .add("Text Fields", () => (
    <StorybookContainer>
      <TextField id="none" onChange={() => {}} placeholder="Here's some placeholder text." />
    </StorybookContainer>
  ))
  .add("With Label", () => (
    <StorybookContainer>
      <TextField
        label="Enter some text"
        helperText="And some subtext"
        id="none"
        onChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Disabled", () => (
    <StorybookContainer>
      <TextField id="none" onChange={() => {}} disabled={true} placeholder="This is disabled" />
    </StorybookContainer>
  ))
  .add("Errored", () => (
    <StorybookContainer>
      <TextField
        label="Enter some text"
        helperText="And some subtext"
        errorMessage="There's been an error"
        id="none"
        onChange={() => {}}
      />
    </StorybookContainer>
  ));
