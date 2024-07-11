import React from "react";

import {BooleanField} from "./BooleanField";
import {AddressInterface, FieldProps, TextFieldType} from "./Common";
import {CustomSelect} from "./CustomSelect";
import {DateTimeField} from "./DateTimeField";
import {EmailField} from "./EmailField";
import {NumberField} from "./NumberField";
import {PhoneNumberField} from "./PhoneNumberField";
import {Signature} from "./Signature";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";
import {UnifiedAddressAutoCompleteField} from "./UnifiedAddressAutoComplete";

export const Field = ({
  name,
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
  includeCounty = false,
  googleMapsApiKey,
  googlePlacesMobileStyles,
  testID,
  ...rest
}: FieldProps) => {
  const handleAddressChange = (field: string, newValue: string) => {
    onChange({...value, [field]: newValue});
    onBlur && onBlur({...value, [field]: newValue});
  };

  const handleAutoCompleteChange = (newValue: AddressInterface) => {
    onChange({...value, ...newValue});
  };

  // if (type === "select") {
  //   if (!options) {
  //     console.error("Field with type=select require options");
  //     return undefined;
  //   }
  //   return (
  //     <SelectList
  //       disabled={disabled}
  //       id={name}
  //       options={options}
  //       placeholder={placeholder}
  //       testID={testID}
  //       value={value}
  //       onChange={(result) => {
  //         onChange(result);
  //         onBlur && onBlur(result);
  //       }}
  //     />
  //   );
  // }
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
        {...rest}
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
        {...rest}
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
        {...rest}
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
        {...rest}
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
        {...rest}
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
    return <Signature {...rest} onChange={onChange} onEnd={onEnd} onStart={onStart} />;
  } else if (type === "email") {
    return <EmailField {...rest} value={value} onChange={onChange} />;
  } else if (type === "phoneNumber") {
    return <PhoneNumberField {...rest} value={value} onChange={onChange} />;
  } else {
    let tfType: TextFieldType = "text";
    const tfValue: string = value;
    if (type && ["password", "url"].includes(type)) {
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

    return (
      <TextField
        {...rest}
        autoComplete={autoComplete}
        disabled={disabled}
        id={name}
        placeholderText={placeholder}
        testID={testID}
        type={tfType as "email" | "password" | "phoneNumber" | "text" | "url"}
        value={tfValue}
        onBlur={(result) => {
          onBlur?.(result);
        }}
        onChange={(result) => onChange(result)}
      />
    );
  }
};
