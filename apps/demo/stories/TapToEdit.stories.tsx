import {Box, TapToEdit} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const TapDemo = (): ReactElement => {
  const [value, setValue] = useState("Santa Claus !");
  return (
    <TapToEdit
      helperText="This is a some helper text to help you understand what you are editing."
      setValue={setValue}
      title="Name"
      type="text"
      value={value}
      withConfirmation
      onSave={(): void => {}}
    />
  );
};

export const TapStory = (): ReactElement => {
  const [bool, setBool] = useState(true);
  const [text, setText] = useState("text");
  // const [currency, setCurrency] = useState(14523.23);
  // 1.957 causes a floating imprecision if not handled correctly.
  // const [percent, setPercent] = useState(1.957);
  const [select, setSelect] = useState("Option1");
  const [multiselect, setMultiselect] = useState(["Option2"]);
  const [textArea, setTextArea] = useState(
    "Dunder Mifflin ipsum dolor sit amet, beet farm consectetur adipiscing elit. That's what she said. Regional Manager Michael Scott, always I want people to be afraid of how much they love me. Bears, beets, Battlestar Galactica. Assistant to the Regional Manager Dwight Schrute identity theft is not a joke, Jim! Millions of families suffer every year!\n" +
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
  const [number, setNumber] = useState(12345);
  const [email, setEmail] = useState("email@example.com");
  const [customSelect, setCustomSelect] = useState("Option1");
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("+18885551212");
  const [date, setDate] = useState("2024-01-15");
  const [datetime, setDatetime] = useState("2024-01-15T14:30:00");
  const [time, setTime] = useState("14:30:00");
  const [emptyDate, setEmptyDate] = useState("");

  return (
    <Box direction="column" display="flex" height="100%" scroll width="100%">
      <Box>
        <TapToEdit
          setValue={setText}
          title="Text"
          type="text"
          value={text}
          onSave={(value): void => {
            setText(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setTextArea}
          title="Text Area"
          type="textarea"
          value={textArea}
          onSave={(value): void => {
            setTextArea(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setBool}
          title="Boolean"
          type="boolean"
          value={bool}
          onSave={(value): void => {
            setBool(value);
          }}
        />
      </Box>
      {/* <TapToEdit
        setValue={setCurrency}
        title="Currency"
        type="currency"
        value={currency}
        onSave={(value): void => {
          setCurrency(value);
        }}
      /> */}
      {/* <TapToEdit
        setValue={setPercent}
        title="Percent"
        type="percent"
        value={percent}
        onSave={(value): void => {
          setPercent(value);
        }}
      /> */}
      <Box>
        <TapToEdit
          options={[
            {label: "Option1", value: "Option1"},
            {label: "Option2", value: "Option2"},
          ]}
          setValue={setSelect}
          title="Select"
          type="select"
          value={select}
          onSave={(value: any): void => {
            setSelect(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
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
      <Box>
        <TapToEdit
          setValue={setAddress}
          title="Address"
          type="address"
          value={address}
          onSave={(value): void => {
            setAddress(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setURL}
          title="URL"
          type="url"
          value={url}
          onSave={(value): void => {
            setURL(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setNumber}
          title="Number"
          type="number"
          value={number}
          onSave={(value): void => {
            setNumber(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setEmail}
          title="Email"
          type="email"
          value={email}
          onSave={(value): void => {
            setEmail(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          options={[
            {label: "Option1", value: "Option1"},
            {label: "Option2", value: "Option2"},
          ]}
          setValue={setCustomSelect}
          title="Custom Select"
          type="customSelect"
          value={customSelect}
          onSave={(value): void => {
            setCustomSelect(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setPhoneNumber}
          title="Phone Number"
          type="phoneNumber"
          value={phoneNumber}
          onSave={(value): void => {
            setPhoneNumber(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setSecondPhoneNumber}
          title="Second Phone Number"
          type="phoneNumber"
          value={secondPhoneNumber}
          onSave={(value): void => {
            setSecondPhoneNumber(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setDate}
          title="Date (with initial value)"
          type="date"
          value={date}
          onSave={(value): void => {
            setDate(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setDatetime}
          title="DateTime (with initial value)"
          type="datetime"
          value={datetime}
          onSave={(value): void => {
            setDatetime(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setTime}
          title="Time (with initial value)"
          type="time"
          value={time}
          onSave={(value): void => {
            setTime(value);
          }}
        />
      </Box>
      <Box>
        <TapToEdit
          setValue={setEmptyDate}
          title="Date (empty - test clear button)"
          type="date"
          value={emptyDate}
          onSave={(value): void => {
            setEmptyDate(value);
          }}
        />
      </Box>
    </Box>
  );
};
