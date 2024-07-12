import {CustomSelectField, CustomSelectFieldProps} from "ferns-ui";
import React, {useState} from "react";

export const CustomSelectFieldDemo = (
  props: Partial<CustomSelectFieldProps>
): React.ReactElement => {
  const [value, setValue] = useState<string | undefined>("");

  return (
    <CustomSelectField
      options={[
        {label: "One option", value: "option1"},
        {label: "Another option", value: "option2"},
        {label: "A third option", value: "option3"},
      ]}
      value={value}
      onChange={setValue}
      {...props}
    />
  );
};
