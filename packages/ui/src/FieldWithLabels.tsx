import React from "react";
import {FieldWithLabelsProps} from "./Common";
import {WithLabel} from "./WithLabel";

export function FieldWithLabels({
  children,
  errorMessage,
  errorMessageColor = "red",
  helperText,
  helperTextColor = "darkGray",
  label,
  labelColor = "darkGray",
}: FieldWithLabelsProps) {
  return (
    <WithLabel
      show={Boolean(helperText)}
      label={helperText}
      labelPlacement="after"
      labelSize="sm"
      labelColor={helperTextColor}
    >
      <WithLabel
        show={Boolean(errorMessage)}
        label={errorMessage}
        labelPlacement="after"
        labelSize="md"
        labelColor={errorMessageColor}
      >
        <WithLabel show={Boolean(label)} label={label} labelColor={labelColor}>
          {children}
        </WithLabel>
      </WithLabel>
    </WithLabel>
  );
}
