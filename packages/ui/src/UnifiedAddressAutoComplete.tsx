import React, {useMemo} from "react";

import {AddressAutocompleteProps} from "./Common";
import {isMobileDevice} from "./MediaQuery";
import {MobileAddressAutocomplete} from "./MobileAddressAutoComplete";
import {TextField} from "./TextField";
import {isNative, isValidGoogleApiKey} from "./Utilities";
import {WebAddressAutocomplete} from "./WebAddressAutocomplete";

export const UnifiedAddressAutoCompleteField = ({
  disabled,
  googleMapsApiKey,
  googlePlacesMobileStyles,
  includeCounty,
  inputValue,
  handleAddressChange,
  handleAutoCompleteChange,
  testID,
}: AddressAutocompleteProps) => {
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
        includeCounty={includeCounty}
        inputValue={inputValue}
        testID={testID}
      />
    );
  } else if (isMobileDevice() && isNative() && isValidatedGoogleApiKey) {
    return (
      <MobileAddressAutocomplete
        disabled={disabled}
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        includeCounty={includeCounty}
        inputValue={inputValue}
        styles={googlePlacesMobileStyles}
        testID={testID}
      />
    );
  } else {
    return (
      <TextField
        disabled={disabled}
        placeholderText="Enter an address"
        testID={testID}
        title="Street Address"
        type="text"
        value={inputValue}
        onChange={(value): void => {
          handleAddressChange(value);
        }}
      />
    );
  }
};
