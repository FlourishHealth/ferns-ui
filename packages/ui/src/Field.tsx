import React from "react";

import {BooleanField} from "./BooleanField";
import {Box} from "./Box";
import {AddressInterface, FieldProps, ReactChildren, TextFieldType} from "./Common";
import {CustomSelect} from "./CustomSelect";
import {DateTimeField} from "./DateTimeField";
import {FieldWithLabels} from "./FieldWithLabels";
import {NumberField} from "./NumberField";
import {SelectField} from "./SelectField";
import {Signature} from "./Signature";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";
import {UnifiedAddressAutoCompleteField} from "./UnifiedAddressAutoComplete";

export const Field = ({
  name,
  label,
  labelColor,
  type,
  rows,
  value,
  onChange,
  onBlur,
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
    onBlur && onBlur({...value, [field]: newValue});
  };

  const handleAutoCompleteChange = (newValue: AddressInterface) => {
    onChange({...value, ...newValue});
  };

  const renderField = (): ReactChildren => {
    if (type === "select") {
      if (!options) {
        console.error("Field with type=select require options");
        return undefined;
      }
      return (
        <SelectField
          disabled={disabled}
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={(result) => {
            onChange(result);
            onBlur && onBlur(result);
          }}
        />
      );
    }
    // TODO: Either implement multiselect or remove it
    //  else if (type === "multiselect") {
    //   if (options === undefined) {
    //     console.error("Field with type=multiselect require options");
    //     return undefined;
    //   }
    //   return (
    //     <Box width="100%">
    //       {options.map((o) => (
    //         <Box
    //           key={o.label + o.value}
    //           alignItems="center"
    //           direction="row"
    //           justifyContent="between"
    //           width="100%"
    //         >
    //           <Box flex="shrink" marginRight={2}>
    //             <Text bold>{o.label}</Text>
    //           </Box>
    //           <Box>
    //             <CheckBox
    //               key={o.label + o.value}
    //               checked={(value ?? []).includes(o.value)}
    //               name={name}
    //               size="sm"
    //               testID={`${testID}-${o.value}`}
    //               onChange={(result) => {
    //                 let newValue;
    //                 if (result) {
    //                   if (value.includes(o.value)) {
    //                     console.warn(`Tried to add value that already exists: ${o.value}`);
    //                     return;
    //                   }
    //                   newValue = [...value, o.value];
    //                 } else {
    //                   newValue = value.filter((v: string) => v !== o.value);
    //                 }
    //                 onChange(newValue);
    //                 onBlur && onBlur(newValue);
    //               }}
    //             />
    //           </Box>
    //         </Box>
    //       ))}
    //     </Box>
    //   );
    // }
    // else
    if (type === "textarea") {
      return (
        <TextArea
          disabled={disabled}
          id={name}
          placeholderText={Boolean(value) ? "" : placeholder}
          rows={rows}
          testID={testID}
          value={String(value)}
          onBlur={onBlur}
          onChange={(result) => onChange(result)}
        />
      );
    } else if (type === "boolean") {
      return (
        <BooleanField
          interaction={!disabled}
          label={name ?? ""}
          value={value}
          onChange={(result) => {
            onChange(result);
          }}
        />
      );
    } else if (type && ["date", "time", "datetime"].includes(type)) {
      return (
        <DateTimeField
          id={name}
          placeholderText={placeholder}
          testID={testID}
          type={type as "date" | "time" | "datetime"}
          value={value}
          onChange={(result) => onChange(result)}
        />
      );
    } else if (type === "address") {
      const addressValue = value ? value : {};
      const {
        address1 = "",
        address2 = "",
        city = "",
        // eslint-disable-next-line unused-imports/no-unused-vars
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
            handleAddressChange={(result) => handleAddressChange("address1", result)}
            handleAutoCompleteChange={(result) => handleAutoCompleteChange(result)}
            includeCounty={includeCounty}
            inputValue={address1}
            testID={`${testID}-address1`}
          />
          <TextField
            disabled={disabled}
            id="address2"
            testID={`${testID}-address2`}
            title="Apt, suite, etc"
            type="text"
            value={address2}
            onChange={(result) => handleAddressChange("address2", result)}
          />
          <TextField
            disabled={disabled}
            id="city"
            testID={`${testID}-city`}
            title="City"
            type="text"
            value={city}
            onChange={(result) => handleAddressChange("city", result)}
          />
          {/* <SelectList
            disabled={disabled}
            id="state"
            label="State"
            options={USSTATESLIST}
            placeholder="Select state"
            style={{borderRadius: 16}}
            testID={`${testID}-state`}
            value={state}
            onChange={(result) => {
              handleAddressChange("state", result!);
            }}
          /> */}
          <TextField
            disabled={disabled}
            id="zipcode"
            testID={`${testID}-zip`}
            title="Zipcode"
            type="text"
            value={zipcode}
            onChange={(result) => handleAddressChange("zipcode", result)}
          />
          {includeCounty && (
            <>
              <TextField
                disabled={disabled}
                id="countyName"
                testID={`${testID}-county`}
                title="County Name"
                type="text"
                value={countyName}
                onChange={(result) => handleAddressChange("countyName", result)}
              />
              <NumberField
                disabled={disabled}
                id="countyCode"
                testID={`${testID}-county-code`}
                title="County Code"
                type="number"
                value={countyCode}
                onChange={(result) => handleAddressChange("countyCode", result)}
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
          onChange={(val) => {
            onChange(val);
            onBlur && onBlur(val);
          }}
        />
      );
    } else if (type === "number") {
      return (
        <NumberField
          disabled={disabled}
          id={name}
          placeholderText={placeholder}
          testID={testID}
          type="number"
          value={value}
          onBlur={(result) => {
            onBlur && onBlur(result);
          }}
          onChange={(result) => {
            onChange(result);
          }}
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
          placeholderText={placeholder}
          testID={testID}
          type={tfType as "email" | "password" | "phoneNumber" | "text" | "url"}
          value={tfValue}
          onBlur={(result) => {
            onBlur && onBlur(result);
          }}
          onChange={(result) => onChange(result)}
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
