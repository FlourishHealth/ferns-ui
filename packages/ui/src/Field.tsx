import React from "react";

import {AddressField} from "./AddressField";
import {BooleanField} from "./BooleanField";
import {Box} from "./Box";
import {FieldProps, ReactChildren, TextFieldType} from "./Common";
import {CustomSelect} from "./CustomSelect";
import {FieldWithLabels} from "./FieldWithLabels";
import {Signature} from "./Signature";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";

export const Field = ({
  name,
  label,
  labelColor,
  height,
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
  transformValue,
}: FieldProps) => {
  const renderField = (): ReactChildren => {
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
    //                 if (result.value) {
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
          height={height ?? 100}
          id={name}
          placeholderText={Boolean(value) ? "" : placeholder}
          rows={rows}
          testID={testID}
          value={String(value)}
          onBlur={onBlur}
          onChange={(result) => onChange(result.value)}
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
        <TextField
          disabled={disabled}
          id={name}
          placeholderText={placeholder}
          testID={testID}
          transformValue={transformValue}
          type={type as "date" | "time" | "datetime"}
          value={value}
          onBlur={(result) => {
            onBlur && onBlur(result.value);
          }}
          onChange={(result) => onChange(result.value)}
        />
      );
    } else if (type === "address") {
      return (
        <AddressField
          disabled={disabled}
          googleMapsApiKey={googleMapsApiKey}
          googlePlacesMobileStyles={googlePlacesMobileStyles}
          includeCounty={includeCounty}
          testID={testID}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
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
        <TextField
          disabled={disabled}
          id={name}
          placeholderText={placeholder}
          testID={testID}
          type="number"
          value={value}
          onBlur={(result) => {
            onBlur && onBlur(result.value);
          }}
          onChange={(result) => {
            onChange(result.value);
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
          onBlur={(result) => {
            onBlur && onBlur(result.value);
          }}
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
