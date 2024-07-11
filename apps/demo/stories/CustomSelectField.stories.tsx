import {CustomSelectField, CustomSelectFieldProps} from "ferns-ui";
import React, {useState} from "react";

export const CustomSelectFieldDemo = (
  props: Partial<CustomSelectFieldProps>
): React.ReactElement => {
  const [value, setValue] = useState<string | undefined>("");

  return (
    <CustomSelectField
      options={[
        {label: "She/her/hers", value: "she/her/hers"},
        {label: "He/him/his", value: "he/him/his"},
        {label: "They/them/theirs", value: "they/them/theirs"},
        {label: "Prefer not to say", value: "declined"},
      ]}
      value={value}
      onChange={setValue}
      {...props}
    />
  );
};
