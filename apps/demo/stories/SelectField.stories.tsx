import {StorybookContainer} from "@components";
import {DemoConfiguration} from "@config";
import {SelectList, SelectListOptions} from "ferns-ui";
import React, {useState} from "react";

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

const SelectListDemo = () => {
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

const SelectLists = () => {
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

const WithLabel = () => {
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

const Disabled = () => {
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

export const SelectFieldConfiguration: DemoConfiguration = {
  name: "Select field",
  component: SelectList,
  related: ["Checkbox", "Radio field"],
  description: "Displays a list of actions or options using the browser’s native select.",
  a11yNotes: ["The list should be labeled so that screen readers know that the list is related."],
  category: ["Form", "Input"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23563&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "SelectFieldProps",
  usage: {
    do: ["Present users with a list of options.", "Allow users to choose one option."],
    doNot: [
      "When more than 10 options are needed, consider using another component instead.",
      "If two or more choices are allowed, use the checkbox field.",
      "If fewer than 4 choices are needed, consider using a Radio field instead.",
    ],
  },
  props: {},
  demo: SelectListDemo,
  demoOptions: {},
  stories: {
    "Select Lists": {render: SelectLists},
    "Select List Label": {render: WithLabel},
    "Select List Disabled": {render: Disabled},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
