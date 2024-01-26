import React from "react";

import {Box} from "./Box";
import {CheckBox} from "./CheckBox";
import {AddressInterface, FieldProps, ReactChildren, TextFieldType} from "./Common";
import {USSTATESLIST} from "./Constants";
import {CustomSelect} from "./CustomSelect";
import {FieldWithLabels} from "./FieldWithLabels";
import {SelectList} from "./SelectList";
import {Signature} from "./Signature";
import {Switch} from "./Switch";
import {Text} from "./Text";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";
import {UnifiedAddressAutoCompleteField} from "./UnifiedAddressAutoComplete";

export const Field = ({
  name,
  label,
  labelColor,
  height,
  type,
  rows,
  value,
  onChange,
  onStart,
  onEnd,
  options,
  placeholder,
  disabled,
  errorMessage,
  errorMessageColor,
  helperText,
  helperTextColor,
  includeCounty = false,
  googleMapsApiKey,
  googlePlacesMobileStyles,
  testID,
}: FieldProps) => {
  const handleAddressChange = (field: string, newValue: string) => {
    onChange({...value, [field]: newValue});
  };

  const handleAutoCompleteChange = (newValue: AddressInterface) => {
    onChange({...value, ...newValue});
  };

  const handleSwitchChange = (switchValue: boolean) => {
    onChange(switchValue);
  };

  const renderField = (): ReactChildren => {
    if (type === "select") {
      if (!options) {
        console.error("Field with type=select require options");
        return undefined;
      }
      return (
        <SelectList
          disabled={disabled}
          id={name}
          options={options}
          placeholder={placeholder}
          testID={testID}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "multiselect") {
      if (options === undefined) {
        console.error("Field with type=multiselect require options");
        return undefined;
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
                  name={name}
                  size="sm"
                  testID={`${testID}-${o.value}`}
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
          testID={testID}
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
          testID={testID}
          onChange={(result) => handleSwitchChange(result)}
        />
      );
    } else if (type && ["date", "time", "datetime"].includes(type)) {
      return (
        <TextField
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          testID={testID}
          type={type as "date" | "time" | "datetime"}
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
        countyName = "",
        countyCode = "",
      }: AddressInterface = addressValue;
      return (
        <>
          <UnifiedAddressAutoCompleteField
            disabled={disabled}
            googleMapsApiKey={googleMapsApiKey}
            googlePlacesMobileStyles={googlePlacesMobileStyles}
            handleAddressChange={(result) => handleAddressChange("address1", result.value)}
            handleAutoCompleteChange={(result) => handleAutoCompleteChange(result)}
            includeCounty={includeCounty}
            inputValue={address1}
            testID={`${testID}-address1`}
          />
          <TextField
            disabled={disabled}
            id="address2"
            label="Apt, suite, etc"
            testID={`${testID}-address2`}
            type="text"
            value={address2}
            onChange={(result) => handleAddressChange("address2", result.value)}
          />
          <TextField
            disabled={disabled}
            id="city"
            label="City"
            testID={`${testID}-city`}
            type="text"
            value={city}
            onChange={(result) => handleAddressChange("city", result.value)}
          />
          <SelectList
            disabled={disabled}
            id="state"
            label="State"
            options={USSTATESLIST}
            placeholder="Select state"
            style={{borderRadius: 16}}
            testID={`${testID}-state`}
            value={state}
            onChange={(result) => handleAddressChange("state", result)}
          />
          <TextField
            disabled={disabled}
            id="zipcode"
            label="Zipcode"
            testID={`${testID}-zip`}
            type="text"
            value={zipcode}
            onChange={(result) => handleAddressChange("zipcode", result.value)}
          />
          {includeCounty && (
            <>
              <TextField
                disabled={disabled}
                id="countyName"
                label="County Name"
                testID={`${testID}-county`}
                type="text"
                value={countyName}
                onChange={(result) => handleAddressChange("countyName", result.value)}
              />
              <TextField
                disabled={disabled}
                id="countyCode"
                label="County Code"
                testID={`${testID}-county-code`}
                type="number"
                value={countyCode}
                onChange={(result) => handleAddressChange("countyCode", result.value)}
              />
            </>
          )}
        </>
      );
    } else if (type === "customSelect") {
      if (!options) {
        console.error("Field with type=customSelect require options");
        return null;
      }
      return (
        <CustomSelect
          disabled={disabled}
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      );
    } else if (type === "number") {
      return (
        <TextField
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          testID={testID}
          type="number"
          value={value}
          onChange={(result) => onChange(result.value)}
        />
      );
    } else if (type === "signature") {
      return <Signature onChange={onChange} onEnd={onEnd} onStart={onStart} />;
    } else {
      let tfType: TextFieldType = "text";
      let tfValue: string = value;
      // Number is supported differently because we need fractional numbers and they don't work
      // well on iOS.
      if (
        type &&
        ["date", "time", "datetime", "email", "phoneNumber", "password", "url"].includes(type)
      ) {
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
          testID={testID}
          type={
            tfType as
              | "date"
              | "datetime"
              | "email"
              | "number"
              | "password"
              | "phoneNumber"
              | "text"
              | "time"
              | "url"
          }
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
