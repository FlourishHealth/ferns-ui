import { Box, Button, DateTimeField, Text } from "ferns-ui";
import React, { ReactElement, useState } from "react";

export const DateTimeFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <Box maxWidth={400}>
      <DateTimeField
        helperText="Tell the user why this is disabled."
        title="Date and Time Field"
        type="datetime"
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </Box>
  );
};

export const DateTimeFieldStory = (): ReactElement => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  return (
    <Box maxWidth={400} gap={2}>
      <DateTimeField
        helperText="Tell the user why this is disabled."
        title="Date/time field "
        type="datetime"
        value={value}
        disabled={disabled}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <Button onClick={() => setDisabled(!disabled)} text="Toggle Disabled" />
    </Box>
  );
};

export const DateFieldStory = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <Box maxWidth={400}>
      <DateTimeField
        helperText="Tell the user why this is disabled."
        title="Date field"
        type="date"
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <Text>Value: {value}</Text>
    </Box>
  );
};

export const TimeFieldStory = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <Box maxWidth={400}>
      <DateTimeField
        helperText="Tell the user why this is disabled."
        title="Time field"
        type="time"
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <Text>Value: {value}</Text>
    </Box>
  );
};
