import React from "react";

import {TextAreaProps} from "./Common";
import {TextField} from "./TextField";

export const TextArea = (props: TextAreaProps): React.ReactElement => {
  return <TextField {...props} multiline />;
};
