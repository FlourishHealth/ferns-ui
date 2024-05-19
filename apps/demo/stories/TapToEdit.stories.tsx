import {DemoConfiguration} from "@config";
import {Box, TapToEdit} from "ferns-ui";
import React, {ReactElement, useState} from "react";

const TapDemo = (): ReactElement => {
  return (
    <TapToEdit
      key="text"
      name="text"
      openApiField="name"
      openApiModel="users"
      setValue={() => {}}
      title="Name"
      type="text"
      value="Luke Skywalker"
      onSave={(): void => {}}
    />
  );
};

const TapStory = (): ReactElement => {
  const [bool, setBool] = useState(true);
  const [text, setText] = useState("text");
  const [currency, setCurrency] = useState(14523.23);
  // 1.957 causes a floating imprecision if not handled correctly.
  const [percent, setPercent] = useState(1.957);
  const [select, setSelect] = useState("Option1");
  const [multiselect, setMultiselect] = useState(["Option2"]);
  const [textArea, setTextArea] = useState(
    "Dunder Mifflin ipsum dolor sit amet, beet farm consectetur adipiscing elit. That's what she said. Regional Manager Michael Scott no God please no, always I want people to be afraid of how much they love me. Bears, beets, Battlestar Galactica. Assistant to the Regional Manager Dwight Schrute identity theft is not a joke, Jim! Millions of families suffer every year!\n" +
      "\n" +
      "Fact. Bears eat beets. Bears, beets, Battlestar Galactica. Did I stutter? Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way. I am Beyonce, always. I'm not superstitious, but I am a little stitious.\n" +
      "\n" +
      "You miss 100% of the shots you don't take - Wayne Gretzky - Michael Scott. Through concentration, I can raise and lower my cholesterol at will. Why are you the way that you are? I declare bankruptcy!\n" +
      "\n" +
      "How the turntables... If I can't scuba, the\n"
  );
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
        key="text"
        name="textarea"
        openApiField="name"
        openApiModel="users"
        setValue={setText}
        title="Text"
        type="textarea"
        value={textArea}
        onSave={(value): void => {
          setTextArea(value);
        }}
      />
      <TapToEdit
        key="text"
        name="text"
        openApiField="name"
        openApiModel="users"
        setValue={setText}
        showDescriptionAsTooltip
        title="Text Tooltip"
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
        openApiField="namePronunciation"
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
        openApiField="staffRoles.SuperUser"
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

export const TapToEditConfiguration: DemoConfiguration = {
  name: "Tap to edit",
  component: TapToEdit, // Replace with actual component reference
  related: ["Tap to edit pattern", "Address tap-to-edit pattern"],
  description:
    "This element allows the user to see information and interact with an icon to edit it. See the pattern here.",
  a11yNotes: [
    "The user should be able to tab to the tap-to-edit icon and press enter/space to interact with it.",
    "The user should be able to tap the label as well to interact with the element.",
  ],
  category: ["Data Entry", "Form"],
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23478&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [],
  interfaceName: "TapToEditProps",
  usage: {
    do: [
      "Display the information that will be edited.",
      "If needed, update the font color to font-link.",
    ],
    doNot: ["Do not replace the icon."],
  },
  props: {},
  demo: TapDemo,
  demoOptions: {},
  stories: {
    "Tap to edit": {render: TapStory},
  },
  testMatrix: {},
  testMatrixDefaultProps: {},
};
