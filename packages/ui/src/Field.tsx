import React, {FC} from "react";

import {AddressField} from "./AddressField";
import {BooleanField} from "./BooleanField";
import {
  AddressFieldProps,
  BooleanFieldProps,
  DateTimeFieldProps,
  EmailFieldProps,
  FieldProps,
  NumberFieldProps,
  PhoneNumberFieldProps,
  SignatureFieldProps,
  TextAreaProps,
  TextFieldProps,
  TextFieldType,
} from "./Common";
import {DateTimeField} from "./DateTimeField";
import {EmailField} from "./EmailField";
import {NumberField} from "./NumberField";
import {PhoneNumberField} from "./PhoneNumberField";
import {Signature} from "./Signature";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";

export const Field: FC<FieldProps> = ({type, ...rest}) => {
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
    return <TextArea {...(rest as TextAreaProps)} />;
  } else if (type === "boolean") {
    return <BooleanField {...(rest as BooleanFieldProps)} />;
  } else if (type && ["date", "time", "datetime"].includes(type)) {
    return <DateTimeField {...(rest as DateTimeFieldProps)} />;
  } else if (type === "address") {
    return <AddressField {...(rest as AddressFieldProps)} />;
  } else if (type === "customSelect") {
    return null;
    // if (!options) {
    //   console.error("Field with type=customSelect require options");
    //   return null;
    // }
    // return (
    //   <CustomSelect
    //     {...rest}
    //     disabled={disabled}
    //     options={options}
    //     placeholder={placeholder}
    //     value={value}
    //     onChange={(val) => {
    //       onChange(val);
    //       onBlur && onBlur(val);
    //     }}
    //   />
    // );
  } else if (type === "number") {
    return <NumberField {...(rest as NumberFieldProps)} />;
  } else if (type === "signature") {
    return <Signature {...(rest as SignatureFieldProps)} />;
  } else if (type === "email") {
    return <EmailField {...(rest as EmailFieldProps)} />;
  } else if (type === "phoneNumber") {
    return <PhoneNumberField {...(rest as PhoneNumberFieldProps)} />;
  } else {
    let tfType: TextFieldType = "text";
    let autoComplete: "on" | "current-password" | "username" = "on";
    if (type && ["password", "url"].includes(type)) {
      tfType = type as TextFieldType;
      // } else if (type === "percent" || type === "currency") {
      // TODO: Implement percent and currency fields
      // tfType = "text";
      // }
      if (tfType === "password") {
        autoComplete = "current-password";
      } else if (tfType === "email") {
        autoComplete = "username";
      }
    }

    return (
      <TextField
        autoComplete={autoComplete}
        type={tfType as "email" | "password" | "phoneNumber" | "text" | "url"}
        {...(rest as TextFieldProps)}
      />
    );
  }
};
