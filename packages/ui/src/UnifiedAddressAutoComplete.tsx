import React from "react";

import {AddressInterface, OnChangeCallback} from "./Common";
import {MobileAddressAutocomplete} from "./MobileAddressAutoComplete";
import {WebAddressAutocomplete} from "./WebAddressAutocomplete";
// import { Platform } from 'react-native';
export const UnifiedAddressAutoCompleteField = ({
  googleMapsApiKey,
  value,
  handleAddressChange,
  handleAutoCompleteChange,
}: {
  googleMapsApiKey?: string;
  value: string;
  handleAddressChange: OnChangeCallback;
  handleAutoCompleteChange: (value: AddressInterface) => void;
}) => {
  const isWeb = typeof document !== "undefined";
  if (isWeb) {
    return (
      <WebAddressAutocomplete
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        inputValue={value}
      />
    );
  } else {
    return <MobileAddressAutocomplete />;
  }
};
