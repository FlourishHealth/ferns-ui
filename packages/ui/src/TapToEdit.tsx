import React, {ReactElement, useState} from "react";
import {Linking} from "react-native";

import {Box} from "./Box";
import {Button} from "./Button";
import {TapToEditProps} from "./Common";
import {Field} from "./Field";
import {Icon} from "./Icon";
// import {useOpenAPISpec} from "./OpenAPIContext";
import {Text} from "./Text";
import {Tooltip} from "./Tooltip";

export function formatAddress(address: any, asString = false): string {
  let city = "";
  if (address?.city) {
    city = address?.state || address.zipcode ? `${address.city}, ` : `${address.city}`;
  }

  let state = "";
  if (address?.state) {
    state = address?.zipcode ? `${address.state} ` : `${address.state}`;
  }

  const zip = address?.zipcode || "";

  const countyName = address?.countyName ?? "";

  const countyCode = address?.countyCode ?? "";

  const addressLineOne = address?.address1 ?? "";
  const addressLineTwo = address?.address2 ?? "";
  const addressLineThree = `${city}${state}${zip}`;
  const addressLineFour = `${countyName}${address?.countyCode ? ` [${countyCode}]` : ""}`;

  if (!asString) {
    // Only add new lines if lines before and after are not empty to avoid awkward whitespace
    return `${addressLineOne}${
      addressLineOne && (addressLineTwo || addressLineThree) ? `\n` : ""
    }${addressLineTwo}${addressLineTwo && addressLineThree ? `\n` : ""}${addressLineThree}${
      addressLineThree && addressLineFour ? `\n` : ""
    }${addressLineFour}`;
  } else {
    return `${addressLineOne}${
      addressLineOne && (addressLineTwo || addressLineThree) ? `, ` : ""
    }${addressLineTwo}${addressLineTwo && addressLineThree ? `, ` : ""}${addressLineThree}${
      addressLineThree && addressLineFour ? `, ` : ""
    }${addressLineFour}`;
  }
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
  description: propsDescription,
  // openApiModel,
  // openApiField,
  showDescriptionAsTooltip = false,
  ...fieldProps
}: TapToEditProps): ReactElement => {
  const [editing, setEditing] = useState(false);
  const [initialValue] = useState(value);
  // const {getModelField} = useOpenAPISpec();

  const description: string | undefined = propsDescription;
  // if (!description && openApiModel && openApiField) {
  //   description = getModelField(openApiModel, openApiField)?.description;
  // }

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
            helperText={description}
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
        // Prevent floating point errors from showing up by using parseFloat and precision.
        // Pass through parseFloat again to trim off insignificant zeroes.
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

    const openLink = async (): Promise<void> => {
      if (fieldProps?.type === "url") {
        await Linking.openURL(value);
      } else if (fieldProps?.type === "address") {
        await Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            formatAddress(value, true)
          )}`
        );
      }
    };
    const isClickable = fieldProps?.type === "url" || fieldProps?.type === "address";

    const renderTitleDescription = (): React.ReactElement => {
      return (
        <Box flex="grow">
          <Text weight="bold">{title}:</Text>
          {Boolean(description && !showDescriptionAsTooltip) && <Text>{description}</Text>}
        </Box>
      );
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
        {showDescriptionAsTooltip ? (
          <Tooltip idealDirection="top" text={description}>
            {renderTitleDescription()}
          </Tooltip>
        ) : (
          renderTitleDescription()
        )}
        <Box direction="row" justifyContent="start" marginLeft={2}>
          <Box justifyContent="start" onClick={isClickable ? openLink : undefined}>
            <Text align="right" underline={isClickable}>
              {displayValue}
            </Text>
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
