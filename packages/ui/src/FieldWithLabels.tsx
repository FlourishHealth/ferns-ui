import React from "react";

import {FieldWithLabelsProps} from "./Common";
import {WithLabel} from "./WithLabel";

export const FieldWithLabels = ({
  children,
  errorMessage,
  errorMessageColor = "error",
  helperText,
  helperTextColor = "primary",
  label,
  labelColor = "primary",
}: FieldWithLabelsProps) => {
  return (
    <WithLabel
      label={helperText}
      labelColor={helperTextColor}
      labelPlacement="after"
      labelSize="sm"
      show={Boolean(helperText)}
    >
      <WithLabel
        label={errorMessage}
        labelColor={errorMessageColor}
        labelPlacement="after"
        labelSize="md"
        show={Boolean(errorMessage)}
      >
        <WithLabel label={label} labelColor={labelColor} show={Boolean(label)}>
          {children}
        </WithLabel>
      </WithLabel>
    </WithLabel>
  );
};
