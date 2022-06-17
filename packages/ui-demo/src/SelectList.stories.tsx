import {Box, SelectList, SelectListOptions} from "ferns-ui";
import React from "react";

import {StorybookContainer} from "./StorybookContainer";

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

const SelectLists = () => {
  const [item, setItem] = React.useState(options[0].value);

  return (
    <StorybookContainer>
      <SelectList
        id="none"
        options={options}
        placeholder="Here's some placeholder text."
        value={item}
        onChange={(newItem) => setItem(newItem)}
      />
    </StorybookContainer>
  );
};

const WithLabel = () => {
  const [item, setItem] = React.useState(options[0].value);

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
  const [item, setItem] = React.useState(options[0].value);

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
    SelectLists() {
      return <SelectLists />;
    },
    WithLabel() {
      return <WithLabel />;
    },
    Disabled() {
      return <Disabled />;
    },
  },
};
