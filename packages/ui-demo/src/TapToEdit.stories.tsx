import {Box, TapToEdit} from "ferns-ui";
import React, {ReactElement, useState} from "react";

const TapStory = (): ReactElement => {
  const [bool, setBool] = useState(true);
  const [text, setText] = useState("text");
  const [currency, setCurrency] = useState(14523.23);
  // 1.957 causes a floating imprecision if not handled correctly.
  const [percent, setPercent] = useState(1.957);
  const [select, setSelect] = useState("Option1");
  const [multiselect, setMultiselect] = useState(["Option2"]);

  return (
    <Box direction="column" display="flex" height="100%" width="100%">
      <TapToEdit
        key="text"
        name="text"
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
    </Box>
  );
};

export const TapToEditStories = {
  title: "TapToEdit",
  component: TapToEdit,
  stories: {
    TapToEdit() {
      return (
        <Box width={300}>
          <TapStory />
        </Box>
      );
    },
  },
};
