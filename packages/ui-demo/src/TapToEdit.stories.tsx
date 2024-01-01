import {Box, OpenAPIProvider, TapToEdit} from "ferns-ui";
import React, {ReactElement, useState} from "react";

const TapStory = (): ReactElement => {
  const [bool, setBool] = useState(true);
  const [text, setText] = useState("text");
  const [currency, setCurrency] = useState(14523.23);
  // 1.957 causes a floating imprecision if not handled correctly.
  const [percent, setPercent] = useState(1.957);
  const [select, setSelect] = useState("Option1");
  const [multiselect, setMultiselect] = useState(["Option2"]);
  const [address, setAddress] = useState({
    address1: "555 N Street Ave",
    address2: "Apt 402",
    city: "New York",
    state: "New York",
    zipcode: "12345",
  });
  const [url, setURL] = useState("https://en.wikipedia.org/wiki/React_Native#Implementation");
  return (
    <Box direction="column" display="flex" height="100%" width="100%">
      <TapToEdit
        key="text"
        name="text"
        openApiField="name"
        openApiModel="users"
        setValue={setText}
        title="Text"
        type="text"
        value={text}
        onSave={(value): void => {
          setText(value);
        }}
      />
      <TapToEdit
        key="bool"
        name="bool"
        openApiField="staffRoles.SuperUser"
        openApiModel="users"
        setValue={setBool}
        title="Boolean"
        type="boolean"
        value={bool}
        onSave={(value): void => {
          setBool(value);
        }}
      />
      <TapToEdit
        key="currency"
        name="currency"
        openApiField="name"
        openApiModel="users"
        setValue={setCurrency}
        title="Currency"
        type="currency"
        value={currency}
        onSave={(value): void => {
          setCurrency(value);
        }}
      />
      <TapToEdit
        key="percent"
        name="percent"
        openApiField="name"
        openApiModel="users"
        setValue={setPercent}
        title="Percent"
        type="percent"
        value={percent}
        onSave={(value): void => {
          setPercent(value);
        }}
      />
      <TapToEdit
        key="select"
        name="select"
        openApiField="name"
        openApiModel="users"
        options={[
          {label: "Option1", value: "Option1"},
          {label: "Option2", value: "Option2"},
        ]}
        setValue={setSelect}
        title="Select"
        type="select"
        value={select}
        onSave={(value): void => {
          setSelect(value);
        }}
      />
      <TapToEdit
        key="multiselect"
        name="multiselect"
        openApiField="name"
        openApiModel="users"
        options={[
          {label: "Option1", value: "Option1"},
          {label: "Option2", value: "Option2"},
          {label: "Option2", value: "Option3"},
          {
            label: "Really long option for testing some wrap around and such",
            value: "Really long option for testing some wrap around and such",
          },
        ]}
        setValue={setMultiselect}
        title="Multi Select"
        type="multiselect"
        value={multiselect}
        onSave={(value): void => {
          setMultiselect(value);
        }}
      />
      <TapToEdit
        name="address"
        openApiField="name"
        openApiModel="users"
        setValue={setAddress}
        title="Address"
        type="address"
        value={address}
        onSave={(value): void => {
          setAddress(value);
        }}
      />
      <TapToEdit
        name="url"
        openApiField="name"
        openApiModel="users"
        setValue={setURL}
        title="URL"
        type="url"
        value={url}
        onSave={(value): void => {
          setURL(value);
        }}
      />

      <TapToEdit
        key="textWithConfirmation"
        name="textWithConfirmation"
        openApiField="name"
        openApiModel="users"
        setValue={setText}
        title="Text With Confirmation"
        type="text"
        value={text}
        withConfirmation
        onSave={(value): void => {
          setText(value);
        }}
      />
    </Box>
  );
};

export const TapToEditStories = {
  title: "TapToEdit",
  component: TapToEdit,
  stories: {
    TapToEdit() {
      return (
        <Box color="white" width={300}>
          <TapStory />
        </Box>
      );
    },
    TapToEditWithOpenAPI() {
      return (
        <Box color="white" width={300}>
          <OpenAPIProvider specUrl="http://localhost:3000/openapi.json">
            <TapStory />
          </OpenAPIProvider>
        </Box>
      );
    },
  },
};
