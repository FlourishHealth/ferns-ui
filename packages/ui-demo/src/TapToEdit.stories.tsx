import {Box, TapToEdit, Text} from "ferns-ui";
import React, {ReactElement, useState} from "react";

const TapStory = (): ReactElement => {
  const [bool, setBool] = useState(true);
  const [text, setText] = useState("text");
  const [currency, setCurrency] = useState(14523.23);
  // 1.957 causes a floating imprecision if not handled correctly.
  const [percent, setPercent] = useState(1.957);
  const [select, setSelect] = useState("Option1");

  return (
    <Box direction="column" display="flex" height="100%" width="100%">
      <TapToEdit
        key="text"
        initialValue={text}
        name="text"
        title="Text"
        type="text"
        onSave={(value): void => {
          setText(value);
        }}
      />
      <TapToEdit
        key="bool"
        initialValue={bool}
        name="bool"
        title="Boolean"
        type="boolean"
        onSave={(value): void => {
          setBool(value);
        }}
      />
      <TapToEdit
        key="currency"
        initialValue={currency}
        name="currency"
        title="Currency"
        type="currency"
        onSave={(value): void => {
          setCurrency(value);
        }}
      />
      <TapToEdit
        key="percent"
        initialValue={percent}
        name="percent"
        title="Percent"
        type="percent"
        onSave={(value): void => {
          setPercent(value);
        }}
      />
      <TapToEdit
        key="select"
        initialValue={select}
        name="select"
        options={[
          {label: "Option1", value: "Option1"},
          {label: "Option2", value: "Option2"},
        ]}
        title="Select"
        type="select"
        onSave={(value): void => {
          setSelect(value);
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
