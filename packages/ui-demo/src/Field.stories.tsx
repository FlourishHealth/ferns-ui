/* eslint-disable react/display-name */
import {Box, Field} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

const TextField = () => {
  const [value, setValue] = useState("Pre-filled text");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Text Field"
        name="text"
        type="text"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const BooleanField = () => {
  const [value, setValue] = useState(true);
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Boolean Field"
        name="boolean"
        type="boolean"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const EmailTextField = () => {
  const [value, setValue] = useState("test@email.com");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Email Field"
        name="text"
        type="email"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const TextAreaField = () => {
  const [value, setValue] = useState("this is my placeholder");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="TextArea Field"
        name="text"
        placeholder="this is my placeholder"
        type="textarea"
        value={value}
        onChange={setValue}
      />
      <Field
        helperText="Here's some help text"
        label="Large TextArea "
        name="text"
        placeholder="this is my placeholder"
        rows={10}
        type="textarea"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const NumberField = () => {
  const [value, setValue] = useState(123);
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Number Field"
        name="text"
        type="number"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const CurrencyField = () => {
  const [value, setValue] = useState(1234.56);
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Currency Field"
        name="text"
        type="currency"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const PercentField = () => {
  const [value, setValue] = useState(0.12);
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Percent Field"
        name="text"
        type="percent"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const SelectField = () => {
  const [value, setValue] = useState();
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Select Field"
        name="text"
        options={[
          {label: "Option 1", value: "Option 1"},
          {label: "Option 2", value: "Option 2"},
          {label: "Option 3", value: "Option 3"},
          {label: "Option 4", value: "Option 4"},
          {label: "Option 5", value: "Option 5"},
          {label: "Option 6", value: "Option 6"},
        ]}
        type="select"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const PasswordField = () => {
  const [value, setValue] = useState("mypassword");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Password Field"
        name="text"
        type="password"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const URLField = () => {
  const [value, setValue] = useState("https://www.flourish.health");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="URL Field"
        name="text"
        type="url"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const DateField = () => {
  const [value, setValue] = useState(new Date());
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Date Field"
        name="text"
        type="date"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const MultiselectField = () => {
  const [toggleValue, setToggleValue] = useState(["Option1", "Option2"]);
  const [checkboxValue, setCheckboxValue] = useState(["Option3"]);
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
          value={toggleValue}
          onChange={setToggleValue}
        />
      </Box>
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
          useCheckbox
          value={checkboxValue}
          onChange={setCheckboxValue}
        />
      </Box>
    </StorybookContainer>
  );
};

const AddressField = () => {
  const [value, setValue] = useState({
    address1: "123 Main St",
    address2: "Apt 1",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  });
  return (
    <StorybookContainer>
      <Box width={300}>
        <Field
          helperText="Address Fields Helper Text"
          label="Address Field"
          name="address"
          type="address"
          value={value}
          onChange={setValue}
        />
      </Box>
    </StorybookContainer>
  );
};

const CustomSelectField = () => {
  const [value, setValue] = useState("they/them/theirs");
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
          value={value}
          onChange={setValue}
        />
      </Box>
    </StorybookContainer>
  );
};

export const FieldStories = {
  title: "Field",
  component: Field,
  stories: {
    "Text Field": function () {
      return <TextField />;
    },
    "Boolean Field": function () {
      return <BooleanField />;
    },
    "Email Text Field": function () {
      return <EmailTextField />;
    },
    "Text Area Field": function () {
      return <TextAreaField />;
    },
    "Number Field": function () {
      return <NumberField />;
    },
    "Currency Field": function () {
      return <CurrencyField />;
    },
    "Percent Field": function () {
      return <PercentField />;
    },

    "Select Field": function () {
      return <SelectField />;
    },
    "Password Field": function () {
      return <PasswordField />;
    },
    "URL Field": function () {
      return <URLField />;
    },
    "Date Field": function () {
      return <DateField />;
    },
    "Multiselect Field": function () {
      return <MultiselectField />;
    },
    "Address Field": function () {
      return <AddressField />;
    },
    "Custom Select Field": function () {
      return <CustomSelectField />;
    },
  },
};
