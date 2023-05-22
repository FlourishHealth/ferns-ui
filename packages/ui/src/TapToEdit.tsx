import React, {ReactElement, useState} from "react";
import {Linking} from "react-native";

import {Box} from "./Box";
import {Button} from "./Button";
import {BoxProps} from "./Common";
import {Field, FieldProps} from "./Field";
import {Icon} from "./Icon";
import {Text} from "./Text";

export function formatAddress(address: any): string {
  let city = "";
  if (address?.city) {
    city = address?.state || address.zipcode ? `${address.city}, ` : `${address.city}`;
  }

  let state = "";
  if (address?.state) {
    state = address?.zipcode ? `${address.state} ` : `${address.state}`;
  }

  const zip = address?.zipcode || "";

  const addressLineOne = address?.address1 ?? "";
  const addressLineTwo = address?.address2 ?? "";
  const addressLineThree = `${city}${state}${zip}`;

  // Only add new lines if lines before and after are not empty to avoid awkward whitespace
  return `${addressLineOne}${
    addressLineOne && (addressLineTwo || addressLineThree) ? `\n` : ""
  }${addressLineTwo}${addressLineTwo && addressLineThree ? `\n` : ""}${addressLineThree}`;
}

export interface TapToEditProps extends Omit<FieldProps, "onChange" | "value"> {
  title: string;
  value: any;
  // Not required if not editable.
  setValue?: (value: any) => void;
  // Not required if not editable.
  onSave?: (value: any) => void | Promise<void>;
  // Defaults to true
  editable?: boolean;
  // enable edit mode from outside the component
  isEditing?: boolean;
  // For changing how the non-editing row renders
  rowBoxProps?: Partial<BoxProps>;
  transform?: (value: any) => string;
  fieldComponent?: (setValue: () => void) => ReactElement;
  withConfirmation?: boolean;
  confirmationText?: string;
  confirmationHeading?: string;
}

export const TapToEdit = ({
  value,
  setValue,
  placeholder,
  title,
  onSave,
  editable = true,
  isEditing = false,
  rowBoxProps,
  transform,
  fieldComponent,
  withConfirmation = false,
  confirmationText = "Are you sure you want to save your changes?",
  confirmationHeading = "Confirm",
  ...fieldProps
}: TapToEditProps): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [initialValue] = useState(value);

  if (editable && !setValue) {
    throw new Error("setValue is required if editable is true");
  }

  if (editable && (editing || isEditing)) {
    return (
      <Box direction="column">
        {fieldComponent ? (
          fieldComponent(setValue as any)
        ) : (
          <Field
            label={title}
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            {...fieldProps}
          />
        )}
        {editing && !isEditing && (
          <Box direction="row">
            <Button
              color="blue"
              confirmationHeading={confirmationHeading}
              confirmationText={confirmationText}
              inline
              text="Save"
              withConfirmation={withConfirmation}
              onClick={async (): Promise<void> => {
                if (!onSave) {
                  console.error("No onSave provided for editable TapToEdit");
                } else {
                  await onSave(value);
                }
                setEditing(false);
              }}
            />
            <Box marginLeft={2}>
              <Button
                color="red"
                inline
                text="Cancel"
                onClick={(): void => {
                  if (setValue) {
                    setValue(initialValue);
                  }
                  setEditing(false);
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  } else {
    let displayValue = value;
    // If a transform props is present, that takes priority
    if (transform) {
      displayValue = transform(value);
    } else {
      // If no transform, try and display the value reasonably.
      if (fieldProps?.type === "boolean") {
        displayValue = value ? "Yes" : "No";
      } else if (fieldProps?.type === "percent") {
        // Prevent floating point errors from showing up by using parseFloat and precision. Pass through parseFloat again
        // to trim off insignificant zeroes.
        displayValue = `${parseFloat(parseFloat(String(value * 100)).toPrecision(7))}%`;
      } else if (fieldProps?.type === "currency") {
        // TODO: support currencies other than USD in Field and related components.
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        });
        displayValue = formatter.format(value);
      } else if (fieldProps?.type === "multiselect") {
        // ???
        displayValue = value.join(", ");
      } else if (fieldProps?.type === "url") {
        // Show only the domain, full links are likely too long.
        try {
          const url = new URL(value);
          displayValue = url?.hostname ?? value;
        } catch (e) {
          // Don't print an error message for empty values.
          if (value) {
            console.debug(`Invalid URL: ${value}`);
          }
          displayValue = value;
        }
      } else if (fieldProps?.type === "address") {
        displayValue = formatAddress(value);
      }
    }

    const openLink = (): void => {
      if (fieldProps?.type === "url") {
        Linking.openURL(value);
      }
    };

    return (
      <Box
        direction="row"
        justifyContent="between"
        paddingX={3}
        paddingY={2}
        width="100%"
        {...rowBoxProps}
      >
        <Box>
          <Text weight="bold">{title}:</Text>
        </Box>
        <Box direction="row">
          <Box onClick={fieldProps?.type === "url" ? openLink : undefined}>
            <Text underline={fieldProps?.type === "url"}>{displayValue}</Text>
          </Box>
          {editable && (
            <Box marginLeft={2} onClick={(): void => setEditing(true)}>
              <Icon color="darkGray" name="edit" prefix="far" size="md" />
            </Box>
          )}
        </Box>
      </Box>
    );
  }
};
