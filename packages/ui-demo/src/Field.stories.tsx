/* eslint-disable react/display-name */
import {Box, Field} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

export const FieldStories = {
  title: "Field",
  component: Field,
  stories: {
    "Text Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Text Field"
            name="text"
            type="text"
            value="Pre-filled text"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Boolean Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Boolean Field"
            name="text"
            type="boolean"
            value
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Email Text Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Email Field"
            name="text"
            type="email"
            value="abc@123.org"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Text Area Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="TextArea Field"
            name="text"
            placeholder="this is my placeholder"
            type="textarea"
            onChange={() => {}}
          />
          <Field
            helperText="Here's some help text"
            label="Large TextArea "
            name="text"
            placeholder="this is my placeholder"
            rows={10}
            type="textarea"
            value="initial value"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Number Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Number Field"
            name="text"
            type="number"
            value={123}
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Currency Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Currency Field"
            name="text"
            type="currency"
            value="1234.56"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Percent Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Percent Field"
            name="text"
            type="percent"
            value={12}
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },

    "Select Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Select Field"
            name="text"
            options={[
              {label: "Option 1", value: "Option 1"},
              {label: "Option 2", value: "Option 2"},
            ]}
            type="select"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Password Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Password Field"
            name="text"
            type="password"
            value="mypassword"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "URL Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Url Field"
            name="text"
            type="url"
            value="https://www.flourish.health"
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Date Field": function () {
      return (
        <StorybookContainer>
          <Field
            helperText="Here's some help text"
            label="Date Field"
            name="text"
            type="date"
            value={new Date()}
            onChange={() => {}}
          />
        </StorybookContainer>
      );
    },
    "Multiselect Field": function () {
      return (
        <StorybookContainer>
          <Box width={300}>
            <Field
              helperText="Here's some help text"
              label="Date Field"
              name="text"
              options={[
                {label: "Option1", value: "Option1"},
                {label: "Option2", value: "Option2"},
                {label: "Option3", value: "Option3"},
              ]}
              type="multiselect"
              value={[]}
              onChange={() => {}}
            />
          </Box>
        </StorybookContainer>
      );
    },
    "Address Field": function () {
      return (
        <StorybookContainer>
          <Box width={300}>
            <Field
              helperText="Address Fields Helper Text"
              label="Address Field"
              name="address"
              type="address"
              value={{
                address1: "123 Main St",
                address2: "Apt 1",
                city: "San Francisco",
                state: "CA",
                zipcode: "94105",
              }}
              onChange={() => {}}
            />
          </Box>
        </StorybookContainer>
      );
    },
    "Custom Select Field": function () {
      return (
        <StorybookContainer>
          <Box width={300}>
            <Field
              helperText="Helper text goes here"
              label="Custom Select Field"
              name="customSelect"
              options={[
                {label: "she/her/hers", value: "she/her/hers"},
                {label: "he/him/his", value: "he/him/his"},
                {label: "they/them/theirs", value: "they/them/theirs"},
              ]}
              type="customSelect"
              value="she/her/hers"
              onChange={() => {}}
            />
          </Box>
        </StorybookContainer>
      );
    },
  },
};
