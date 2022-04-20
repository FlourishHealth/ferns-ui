/* eslint-disable react/display-name */
import { Field } from "ferns-ui";
import React from "react";

import { StorybookContainer } from "./StorybookContainer";

export const FieldStories = {
  title: "Field",
  component: Field,
  stories: {
    "Text Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            initialValue="Pre-filled text"
            label="Text Field"
            name="text"
            type="text"
          />
        </StorybookContainer>
      );
    },
    "Boolean Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {
              console.info("Change");
            }}
            helperText="Here's some help text"
            label="Boolean Field"
            name="text"
            type="boolean"
          />
        </StorybookContainer>
      );
    },
    "Email Text Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Email Field"
            name="text"
            type="email"
          />

          <Field
            handleChange={() => {}}
            helperText="Requires @example.com"
            label="Email Field With Extra Validation"
            name="text"
            type="email"
            validate={(value) => value.search("@example.com") > -1}
            validateErrorMessage="Must be an example.com email"
          />
        </StorybookContainer>
      );
    },
    "Text Area Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="TextArea Field"
            name="text"
            type="textarea"
          />
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Large TextArea "
            name="text"
            rows={10}
            type="textarea"
          />
        </StorybookContainer>
      );
    },
    "Number Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Number Field"
            name="text"
            type="number"
          />
        </StorybookContainer>
      );
    },
    "Currency Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Currency Field"
            name="text"
            type="currency"
          />
        </StorybookContainer>
      );
    },
    "Percent Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Percent Field"
            name="text"
            type="percent"
          />
        </StorybookContainer>
      );
    },

    "Select Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Select Field"
            name="text"
            options={[
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ]}
            type="select"
          />
        </StorybookContainer>
      );
    },
    "Password Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Password Field"
            name="text"
            type="password"
          />
        </StorybookContainer>
      );
    },
    "URL Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Url Field"
            name="text"
            type="url"
          />
        </StorybookContainer>
      );
    },
    "Date Field": function () {
      return (
        <StorybookContainer>
          <Field
            handleChange={() => {}}
            helperText="Here's some help text"
            label="Date Field"
            name="text"
            type="date"
          />
        </StorybookContainer>
      );
    },
  },
};
