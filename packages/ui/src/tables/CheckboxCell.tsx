import get from "lodash/get";
import startCase from "lodash/startCase";
import React, {useState} from "react";

import {Box} from "../Box";
import {CheckBox} from "../CheckBox";
import {ModelAdminFieldConfig} from "../Common";
import {CheckedCell} from "./CheckedCell";

export const CheckboxCell = ({
  doc,
  field,
  editing,
  onChange,
}: {
  doc: any;
  field: ModelAdminFieldConfig;
  path: string; // Use dot notation to access nested objects.
  editing: boolean;
  onChange: (checked: boolean) => Promise<void>;
}): React.ReactElement => {
  // Locally cache this value so that we can update it immediately when the user taps it,
  // otherwise we wind up with a delay while the server responds (very noticeable when checking a
  // couple)
  const [checked, setChecked] = useState(get(doc, field.fieldKey));
  if (editing) {
    return (
      <Box flex="grow" justifyContent="center" width="100%">
        <CheckBox
          {...field}
          checked={checked}
          label={startCase(field.fieldKey)}
          onChange={({value}): Promise<void> => {
            setChecked(value);
            return onChange(value);
          }}
        />
      </Box>
    );
  } else {
    return <CheckedCell checked={get(doc, field.fieldKey)} />;
  }
};
