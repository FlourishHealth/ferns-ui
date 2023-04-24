import {SelectList, SelectListOptions} from "ferns-ui";
import React, {useState} from "react";

import {StorybookContainer} from "./StorybookContainer";

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

const SelectLists = () => {
  const [item, setItem] = useState(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
        id="none"
        options={options}
        placeholder="Here's some placeholder text."
        value={item}
        onChange={(newItem) => {
          setItem(newItem);
        }}
      />
    </StorybookContainer>
  );
};

const WithLabel = () => {
  const [item, setItem] = useState(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
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

const Disabled = () => {
  const [item, setItem] = useState(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
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
