import React, {useMemo} from "react";

import {AddressInterface, OnChangeCallback} from "./Common";
import {isMobileDevice} from "./MediaQuery";
import {MobileAddressAutocomplete} from "./MobileAddressAutoComplete";
import {TextField} from "./TextField";
import {isNative, isValidGoogleApiKey} from "./Utilities";
import {WebAddressAutocomplete} from "./WebAddressAutocomplete";

export const UnifiedAddressAutoCompleteField = ({
  disabled,
  googleMapsApiKey,
  inputValue,
  handleAddressChange,
  handleAutoCompleteChange,
}: {
  disabled?: boolean;
  googleMapsApiKey?: string;
  inputValue: string;
  handleAddressChange: OnChangeCallback;
  handleAutoCompleteChange: (value: AddressInterface) => void;
}) => {
  const isWeb = typeof document !== "undefined";
  const isValidatedGoogleApiKey = useMemo(
    () => (googleMapsApiKey ? isValidGoogleApiKey(googleMapsApiKey) : false),
    [googleMapsApiKey]
  );

  if (isWeb && isValidatedGoogleApiKey) {
    return (
      <WebAddressAutocomplete
        disabled={disabled}
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        inputValue={inputValue}
      />
    );
  } else if (isMobileDevice() && isNative() && isValidatedGoogleApiKey) {
    return (
      <MobileAddressAutocomplete
        disabled={disabled}
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        inputValue={inputValue}
      />
    );
  } else {
    return (
      <TextField
        disabled={disabled}
        label="Street Address"
        placeholder="Enter an address"
        type="text"
        value={inputValue}
        onChange={({value}): void => {
          handleAddressChange({value});
        }}
      />
    );
  }
};
