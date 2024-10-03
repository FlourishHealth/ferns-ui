import {Box, Button, DateTimeField, DateTimeFieldProps} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const DateTimeFieldDemo = (props: Partial<DateTimeFieldProps>): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <Box maxWidth={400}>
      <DateTimeField
        helperText="Supporting helper text"
        title="Date and Time Field"
        type="datetime"
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        {...props}
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
        helperText={disabled ? "Tell the user why this is disabled." : undefined}
        title="type datetime"
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

export const DateTimeFieldTypes = (): ReactElement => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  return (
    <Box maxWidth={400} gap={2}>
      <Box padding={3}>
        <DateTimeField
          title="type datetime"
          type="datetime"
          value={value}
          disabled={disabled}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </Box>
      <Box padding={3}>
        <DateTimeField
          title="type date"
          type="date"
          value={value}
          disabled={disabled}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </Box>
      <Box padding={3}>
        <DateTimeField
          title="type time"
          type="time"
          value={value}
          disabled={disabled}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </Box>
    </Box>
  );
};
