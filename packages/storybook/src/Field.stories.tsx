import React from "react";
// import {Box} from "@ferns/ui";
import {Field} from "@ferns/ui";
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer"

export default {
  title: "Field",
  component: Field,
};

storiesOf("Field", module)
  .add("TextField", () => (
    <StorybookContainer>
      <Field
        label="Text Field"
        type="text"
        name="text"
        helperText="Here's some help text"
        initialValue="Pre-filled text"
        handleChange={() => {}}
      />
      <Field
        label="Disabled Field"
        type="text"
        name="text"
        disabled={true}
        helperText="Here's some help text"
        initialValue="Pre-filled text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Boolean Field", () => (
    <StorybookContainer>
      <Field
        label="Boolean Field"
        type="boolean"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Email Text Field", () => (
    <StorybookContainer>
      <Field
        label="Email Field"
        type="email"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />

      <Field
        label="Email Field With Extra Validation"
        type="email"
        name="text"
        helperText="Requires @example.com"
        handleChange={() => {}}
        validate={(value) => value.search("@example.com") > -1}
        validateErrorMessage="Must be an example.com email"
      />
    </StorybookContainer>
  ))
  .add("Text Area Field", () => (
    <StorybookContainer>
      <Field
        label="TextArea Field"
        type="textarea"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
      <Field
        label="Large TextArea "
        type="textarea"
        name="text"
        rows={10}
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Number Field", () => (
    <StorybookContainer>
      <Field
        label="Number Field"
        type="number"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Currency Field", () => (
    <StorybookContainer>
      <Field
        label="Currency Field"
        type="currency"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Percent Field", () => (
    <StorybookContainer>
      <Field
        label="Percent Field"
        type="percent"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Select Field", () => (
    <StorybookContainer>
      <Field
        label="Select Field"
        type="select"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
        options={[
          {label: "Option 1", value: "Option 1"},
          {label: "Option 2", value: "Option 2"},
        ]}
      />
    </StorybookContainer>
  ))
  .add("Password Field", () => (
    <StorybookContainer>
      <Field
        label="Password Field"
        type="password"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("URL Field", () => (
    <StorybookContainer>
      <Field
        label="Url Field"
        type="url"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ))
  .add("Date Field", () => (
    <StorybookContainer>
      <Field
        label="Date Field"
        type="date"
        name="text"
        helperText="Here's some help text"
        handleChange={() => {}}
      />
    </StorybookContainer>
  ));
