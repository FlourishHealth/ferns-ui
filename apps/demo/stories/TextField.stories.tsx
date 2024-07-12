import {TextField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const TextFieldDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <TextField
      placeholderText="This is placeholder text."
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

export const TextFieldWithLabelDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <TextField
      placeholderText="This is placeholder text."
      title="Form field title"
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

export const TextFieldWithHelperTextDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <TextField
      helperText="Helpful information for filling out the form field."
      placeholderText="This is placeholder text."
      title="Form field title"
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

export const TextFieldWithErrorMsgDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <TextField
      errorText="Provide actionable information"
      helperText="Helpful information for filling out the form field."
      placeholderText="This is placeholder text."
      title="Enter some text"
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

export const TextFieldDisabledDemo = (): ReactElement => {
  const [value, setValue] = useState("");
  return (
    <TextField
      disabled
      helperText="Tell the user why this is disabled."
      placeholderText="This is placeholder text."
      title="Form field title"
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};
