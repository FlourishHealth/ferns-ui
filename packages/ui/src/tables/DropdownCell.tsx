import get from "lodash/get";
import startCase from "lodash/startCase";
import React, {useState} from "react";

import {ModelAdminFieldConfig} from "../Common";
import {Field} from "../Field";
import {TextCell} from "./TextCell";

export const DropdownCell = ({
  doc,
  options,
  field,
  onChange,
  editing,
  text,
}: {
  doc: any;
  field: ModelAdminFieldConfig;
  options: {value: string; label: string}[];
  onChange: (value: string) => void;
  editing: boolean;
  text?: string;
}): React.ReactElement => {
  const [value, setValue] = useState(get(doc, field.fieldKey));
  if (editing) {
    return (
      <Field
        {...field}
        label={startCase(field.fieldKey)}
        name={field.fieldKey}
        options={options}
        type="select"
        value={value}
        onChange={(result: any): void => {
          setValue(result);
          onChange(result);
        }}
      />
    );
  } else {
    return <TextCell text={text ?? value} />;
  }
};
