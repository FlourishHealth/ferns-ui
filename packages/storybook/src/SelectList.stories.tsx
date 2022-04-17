import React from "react";
import {Box} from "../../ui/src/Box";
import {SelectList, SelectListOptions} from "../../ui/src/SelectList";
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "../../ui/src/StorybookContainer";

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

storiesOf("Select List", module)
  .add("Select Lists", () => {
    const [item, setItem] = React.useState(options[0].value);

    return (
      <StorybookContainer>
        <SelectList
          id="none"
          options={options}
          value={item}
          onChange={(item) => setItem(item)}
          placeholder="Here's some placeholder text."
        />
      </StorybookContainer>
    );
  })
  .add("With Label", () => {
    const [item, setItem] = React.useState(options[0].value);

    return (
      <StorybookContainer>
        <SelectList
          id="none"
          label="Enter a bunch of text"
          helperText="And some subtext"
          options={options}
          value={item}
          onChange={(item) => setItem(item)}
        />
      </StorybookContainer>
    );
  })
  .add("Disabled", () => {
    const [item, setItem] = React.useState(options[0].value);

    return (
      <StorybookContainer>
        <SelectList
          id="none"
          options={options}
          value={item}
          onChange={(item) => setItem(item)}
          disabled={true}
          placeholder="This is disabled"
        />
      </StorybookContainer>
    );
  });
