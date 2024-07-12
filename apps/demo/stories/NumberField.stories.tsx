import {NumberField} from "ferns-ui";
import React, {ReactElement, useState} from "react";

export const NumberFieldDemo = (): ReactElement => {
  const [value, setValue] = useState<string | undefined>("");
  return (
    <NumberField
      placeholderText="This is placeholder text."
      type="number"
      value={value}
      onChange={setValue}
    />
  );
};

export const NumberFieldWithLabelDemo = (): ReactElement => {
  const [value, setValue] = useState<string | undefined>("");
  return (
    <NumberField
      placeholderText="Enter a number."
      title="Number field"
      type="number"
      value={value}
      onChange={setValue}
    />
  );
};

export const NumberFieldDecimal = (): ReactElement => {
  const [value, setValue] = useState<string | undefined>("");
  return (
    <NumberField
      placeholderText="This is placeholder text."
      title="Decimal"
      type="decimal"
      value={value}
      onChange={setValue}
    />
  );
};

export const NumberFieldWithErrorMsgDemo = (): ReactElement => {
  const [value, setValue] = useState<string | undefined>("");
  return (
    <NumberField
      errorText="Provide actionable information"
      helperText="Helpful information for filling out the form field."
      placeholderText="This is placeholder text."
      title="Enter some number"
      type="number"
      value={value}
      onChange={setValue}
    />
  );
};

export const NumberFieldDisabledDemo = (): ReactElement => {
  const [value, setValue] = useState<string | undefined>("");
  return (
    <NumberField
      disabled
      helperText="Tell the user why this is disabled."
      placeholderText="This is placeholder text."
      title="Number field title"
      type="number"
      value={value}
      onChange={setValue}
    />
  );
};
