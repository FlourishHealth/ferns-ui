import React from "react";

import {Box} from "./Box";
import {CheckBox} from "./CheckBox";
import {AddressInterface, FieldWithLabelsProps, TextFieldType} from "./Common";
import {USSTATESLIST} from "./Constants";
import {CustomSelect} from "./CustomSelect";
import {FieldWithLabels} from "./FieldWithLabels";
import {SelectList, SelectListOptions} from "./SelectList";
import {Switch} from "./Switch";
import {Text} from "./Text";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";

export interface FieldProps extends FieldWithLabelsProps {
  name: string;
  label?: string;
  height?: number;
  type?:
    | "boolean"
    | "email"
    | "text"
    | "textarea"
    | "number"
    | "currency"
    | "percent"
    | "select"
    | "password"
    | "url"
    | "date"
    | "multiselect"
    | "address"
    | "customSelect";
  rows?: number;
  value?: any;
  onChange?: any;
  options?: SelectListOptions;
  placeholder?: string;
  disabled?: boolean;
  useCheckbox?: boolean;
}

export const Field = ({
  name,
  label,
  labelColor,
  height,
  type,
  rows,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  errorMessage,
  errorMessageColor,
  helperText,
  helperTextColor,
}: FieldProps) => {
  const handleAddressChange = (field: string, newValue: string) => {
    onChange({...value, [field]: newValue});
  };

  const handleSwitchChange = (switchValue: boolean) => {
    onChange(switchValue);
  };

  const renderField = () => {
    if (type === "select") {
      if (!options) {
        console.error("Field with type=select require options");
        return null;
      }
      return (
        <SelectList
          disabled={disabled}
          id={name}
          options={options}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "multiselect") {
      if (!options) {
        console.error("Field with type=multiselect require options");
        return null;
      }
      return (
        <Box width="100%">
          {options.map((o) => (
            <Box
              key={o.label + o.value}
              alignItems="center"
              direction="row"
              justifyContent="between"
              width="100%"
            >
              <Box flex="shrink" marginRight={2}>
                <Text weight="bold">{o.label}</Text>
              </Box>
              <Box>
                <CheckBox
                  key={o.label + o.value}
                  checked={(value ?? []).includes(o.value)}
                  disabled={disabled}
                  id={name}
                  name={name}
                  size="sm"
                  onChange={(result) => {
                    let newValue;
                    if (result.value) {
                      if (value.includes(o.value)) {
                        console.warn(`Tried to add value that already exists: ${o.value}`);
                        return;
                      }
                      newValue = [...value, o.value];
                    } else {
                      newValue = value.filter((v: string) => v !== o.value);
                    }
                    onChange(newValue);
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      );
    } else if (type === "textarea") {
      return (
        <TextArea
          disabled={disabled}
          height={height ?? 100}
          id={name}
          placeholder={Boolean(value) ? "" : placeholder}
          rows={rows}
          value={String(value)}
          onChange={(result) => onChange(result.value)}
        />
      );
    } else if (type === "boolean") {
      return (
        <Switch
          disabled={disabled}
          id={name}
          name={name}
          switched={Boolean(value)}
          onChange={(result) => handleSwitchChange(result)}
        />
      );
    } else if (type === "date") {
      return (
        <TextField
          disabled
          id={name}
          placeholder={placeholder}
          type="date"
          // TODO: allow editing with a date picker
          value={value}
          onChange={(result) => onChange(result.value)}
        />
      );
    } else if (type === "address") {
      const addressValue = value ? value : {};
      const {
        address1 = "",
        address2 = "",
        city = "",
        state = "",
        zipcode = "",
      }: AddressInterface = addressValue;
      return (
        <>
          <TextField
            id="address1"
            label="Street Address"
            type="text"
            value={address1}
            onChange={(result) => handleAddressChange("address1", result.value)}
          />
          <TextField
            id="address2"
            label="Apt, suite, etc"
            type="text"
            value={address2}
            onChange={(result) => handleAddressChange("address2", result.value)}
          />
          <TextField
            id="city"
            label="City"
            type="text"
            value={city}
            onChange={(result) => handleAddressChange("city", result.value)}
          />
          <SelectList
            id="state"
            label="State"
            options={USSTATESLIST}
            placeholder="Select state"
            style={{borderRadius: 16}}
            value={state}
            onChange={(result) => handleAddressChange("state", result)}
          />
          <TextField
            id="zipcode"
            label="Zipcode"
            type="text"
            value={zipcode}
            onChange={(result) => handleAddressChange("zipcode", result.value)}
          />
        </>
      );
    } else if (type === "customSelect") {
      if (!options) {
        console.error("Field with type=customSelect require options");
        return null;
      }
      return (
        <CustomSelect disabled={disabled} options={options} value={value} onChange={onChange} />
      );
    } else {
      let tfType: TextFieldType = "text";
      let tfValue: string = value;
      // Number is supported differently because we need fractional numbers and they don't work
      // well on iOS.
      if (type && ["date", "email", "password", "url"].indexOf(type) > -1) {
        tfType = type as TextFieldType;
      } else if (type === "percent" || type === "currency") {
        tfType = "text";
      }
      let autoComplete: "on" | "current-password" | "username" = "on";
      if (tfType === "password") {
        autoComplete = "current-password";
      } else if (tfType === "email") {
        autoComplete = "username";
      }
      if (type === "percent") {
        tfValue = `${Number(value).toFixed(0)}%`;
      } else if (type === "currency") {
        tfValue = `$${Number(value).toFixed(2)}`;
      }
      return (
        <TextField
          autoComplete={autoComplete}
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          type={tfType as "date" | "email" | "number" | "password" | "text" | "url"}
          value={tfValue}
          onChange={(result) => onChange(result.value)}
        />
      );
    }
  };

  const children = renderField();
  return (
    <Box marginBottom={5}>
      <FieldWithLabels
        {...{
          errorMessage,
          errorMessageColor,
          helperText,
          helperTextColor,
          label,
          labelColor,
        }}
      >
        {children}
      </FieldWithLabels>
    </Box>
  );
};
