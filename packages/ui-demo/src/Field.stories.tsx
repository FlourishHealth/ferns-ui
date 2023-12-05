/* eslint-disable react/display-name */
import dayjs from "dayjs";
import {Box, Field, Heading, TapToEdit, Text} from "ferns-ui";
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

const FieldWithError = () => {
  const [value, setValue] = useState("");
  return (
    <StorybookContainer>
      <Field
        errorMessage={value.length > 1 ? "Error message" : undefined}
        helperText="Only enter 1 character, enter 2 to see the error label"
        label="Field with error"
        name="boolean"
        type="text"
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
        placeholder="Select option"
        type="select"
        value={value}
        onChange={setValue}
      />
      <Text>This is the select value: {value}</Text>
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

const PhoneNumberField = () => {
  const [value, setValue] = useState("+15558675309");
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Phone Number Field"
        name="text"
        type="phoneNumber"
        value={value}
        onChange={setValue}
      />
      <Text>Phone number return: {value}</Text>
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

const DateTimeField = () => {
  const [value, setValue] = useState(new Date());
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Date Time Field"
        name="text"
        type="datetime"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const TimeField = () => {
  const [value, setValue] = useState(dayjs().hour(12).minute(0).toISOString());
  return (
    <StorybookContainer>
      <Field
        helperText="Here's some help text"
        label="Time Field"
        name="text"
        type="time"
        value={value}
        onChange={setValue}
      />
    </StorybookContainer>
  );
};

const MultiselectField = () => {
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
    countyName: "San Francisco",
    countyCode: "00000",
  });
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState("");

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
        <Heading>Auto Complete & County</Heading>
        <Field
          helperText="Test Your API Key Here"
          label="Google Maps API Key"
          name="googleMapsApiKey"
          type="text"
          value={googleMapsApiKey}
          onChange={setGoogleMapsApiKey}
        />
        <Field
          googleMapsApiKey={googleMapsApiKey}
          helperText="Address Fields Helper Text"
          includeCounty
          label="Address Field"
          name="address"
          type="address"
          value={value}
          onChange={setValue}
        />
        <TapToEdit
          isEditing={false}
          name="address"
          setValue={setValue}
          title="Address"
          type="address"
          value={value}
          onSave={setValue}
        />
      </Box>
    </StorybookContainer>
  );
};

const CustomSelectField = () => {
  const [value1, setValue1] = useState("they/them/theirs");
  const [value2, setValue2] = useState("they/them/theirs");
  return (
    <StorybookContainer>
      <Box width={300}>
        <Field
          helperText="Helper text goes here"
          label="Custom Select Field With Placeholder"
          name="customSelect"
          options={[
            {label: "she/her/hers", value: "she/her/hers"},
            {label: "he/him/his", value: "he/him/his"},
            {label: "they/them/theirs", value: "they/them/theirs"},
          ]}
          placeholder="None selected"
          type="customSelect"
          value={value1}
          onChange={setValue1}
        />
      </Box>
      <Box width={300}>
        <Field
          helperText="Helper text goes here"
          label="Custom Select Field Without Placeholder"
          name="customSelect"
          options={[
            {label: "she/her/hers", value: "she/her/hers"},
            {label: "he/him/his", value: "he/him/his"},
            {label: "they/them/theirs", value: "they/them/theirs"},
          ]}
          type="customSelect"
          value={value2}
          onChange={setValue2}
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
    "Phone Number Field": function () {
      return <PhoneNumberField />;
    },
    "URL Field": function () {
      return <URLField />;
    },
    "Date Field": function () {
      return <DateField />;
    },
    "Time Field": function () {
      return <TimeField />;
    },
    "Date Time Field": function () {
      return <DateTimeField />;
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
    "Field With Error Message": function () {
      return <FieldWithError />;
    },
  },
};
