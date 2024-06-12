import {StorybookContainer} from "@components";
import {SelectList, SelectListOptions} from "ferns-ui";
import React, {useState} from "react";

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

export const SelectListDemo = () => {
  return (
    <SelectList
      id="none"
      options={options}
      placeholder="Here's some placeholder text."
      value="first"
      onChange={() => {}}
    />
  );
};

export const SelectLists = () => {
  const [item, setItem] = useState<string | undefined>(options[0].value);
  const [itemNoUndefined, setItemNoUndefined] = useState<string>(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
        id="none"
        options={options}
        placeholder="Here's some placeholder text."
        value={itemNoUndefined}
        onChange={(newItem) => {
          setItemNoUndefined(newItem);
        }}
      />
      <SelectList
        allowClear
        id="none"
        label="Allows clear"
        options={options}
        value={item}
        onChange={(newItem) => {
          setItem(newItem);
        }}
      />
    </StorybookContainer>
  );
};

export const WithLabel = () => {
  const [item, setItem] = useState<string | undefined>(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
        allowClear
        helperText="And some subtext"
        id="none"
        label="Enter a bunch of text"
        options={options}
        value={item}
        onChange={(newItem) => setItem(newItem)}
      />
    </StorybookContainer>
  );
};

export const Disabled = () => {
  const [item, setItem] = useState<string | undefined>(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
        allowClear
        disabled
        id="none"
        options={options}
        placeholder="This is disabled"
        value={item}
        onChange={(newItem) => setItem(newItem)}
      />
    </StorybookContainer>
  );
};

export const SelectListStories = {
  title: "Select List",
  component: SelectList,
  stories: {
    "Select Lists": function () {
      return <SelectLists />;
    },
    "Select List Label": function () {
      return <WithLabel />;
    },
    "Select List Disabled": function () {
      return <Disabled />;
    },
  },
};
