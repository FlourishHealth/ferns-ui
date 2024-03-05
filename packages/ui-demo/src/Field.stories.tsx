/* eslint-disable react/display-name */
import {Box, Field, Heading, TapToEdit, Text} from "ferns-ui";
import {printDateAndTime} from "ferns-ui/dist/DateUtilities";
import {TimezonePicker} from "ferns-ui/dist/TimezonePicker";
import {DateTime} from "luxon";
import React, {useState} from "react";
import {Image} from "react-native";

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

const DateTimeField = () => {
  const [dateValue, setDateValue] = useState<string>(DateTime.now().toISO());
  const [timeValue, setTimeValue] = useState(
    DateTime.now().set({hour: 12, minute: 0, second: 0}).toISO()
  );
  const [value, setValue] = useState<string>(DateTime.now().toISO());
  const [timezone, setTimezone] = useState<string | undefined>("America/New_York");
  return (
    <StorybookContainer>
      <TimezonePicker showLabel timezone={timezone} onChange={(tz) => setTimezone(tz)} />
      <Field
        helperText="Here's some help text"
        label="Date Time Field"
        name="text"
        transformValue={{
          options: {timezone},
        }}
        type="datetime"
        value={value}
        onChange={(v: string) => {
          setValue(v);
        }}
      />
      <Field
        disabled
        label="Time in local timezone"
        type="text"
        value={printDateAndTime(value, {showTimezone: true})}
      />

      <Field
        helperText="Here's some help text"
        label="Date Field"
        name="text"
        type="date"
        value={dateValue}
        onChange={setDateValue}
      />

      <Field
        helperText="Here's some help text"
        label="Time Field"
        name="text"
        type="time"
        value={timeValue}
        onChange={setTimeValue}
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
          label="Multiselect Field"
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
  });

  const [secondValue, setSecondValue] = useState({
    address1: "456 Main St",
    address2: "",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  });

  const [thirdVal, setThirdVal] = useState({
    address1: "789 Main St",
    address2: "",
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
        <TapToEdit
          isEditing={false}
          name="address"
          setValue={setValue}
          title="Address"
          type="address"
          value={value}
          onSave={setValue}
        />
        <Box paddingY={2} />
        <Heading>Auto Complete </Heading>
        <Field
          helperText="Test Your API Key Here"
          label="Google Maps API Key"
          name="googleMapsApiKey"
          type="text"
          value={googleMapsApiKey}
          onChange={setGoogleMapsApiKey}
        />
        <Heading size="sm">Without County</Heading>
        <Field
          googleMapsApiKey={googleMapsApiKey}
          label="Address Field"
          name="address"
          type="address"
          value={secondValue}
          onChange={setSecondValue}
        />
        <TapToEdit
          googleMapsApiKey={googleMapsApiKey}
          isEditing={false}
          name="address"
          setValue={setSecondValue}
          title="Address"
          type="address"
          value={secondValue}
          onSave={setSecondValue}
        />
        <Box padding={2} />
        <Heading size="sm">With County</Heading>
        <Field
          googleMapsApiKey={googleMapsApiKey}
          includeCounty
          label="Address Field"
          name="address"
          type="address"
          value={thirdVal}
          onChange={setThirdVal}
        />
        <TapToEdit
          googleMapsApiKey={googleMapsApiKey}
          includeCounty
          isEditing={false}
          name="address"
          setValue={setThirdVal}
          title="Address"
          type="address"
          value={thirdVal}
          onSave={setThirdVal}
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

interface SignatureFieldProps {
  setScrollEnabled: (scrollEnabled: boolean) => void;
}

const SignatureField = ({setScrollEnabled}: SignatureFieldProps) => {
  const [signature, setValue] = useState("");
  return (
    <StorybookContainer>
      <Field
        label="Signature Field"
        name="signature"
        type="signature"
        onChange={setValue}
        onEnd={() => setScrollEnabled(true)}
        onStart={() => setScrollEnabled(false)}
      />
      <Image
        resizeMode="contain"
        source={{uri: signature}}
        style={{
          width: 300,
          height: 80,
          borderWidth: 1,
          borderColor: "black",
        }}
      />
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
    "Date And Time Fields": function () {
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
    "Signature Field": function (setScrollEnabled: any) {
      return <SignatureField setScrollEnabled={setScrollEnabled} />;
    },
  },
};
