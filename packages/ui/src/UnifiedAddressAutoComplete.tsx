import React from "react";

import {AddressInterface, OnChangeCallback} from "./Common";
import {MobileAddressAutocomplete} from "./MobileAddressAutoComplete";
import {WebAddressAutocomplete} from "./WebAddressAutocomplete";

// Find more information about the address component types here: https://developers.google.com/maps/documentation/javascript/place-autocomplete
export type AddressComponentType = {
  long_name: string;
  short_name: string;
  types: string[];
};

export const findAddressComponent = (components: AddressComponentType[], type: string): string => {
  return (
    components.find((component: AddressComponentType) => component.types.includes(type))
      ?.long_name ?? ""
  );
};

export const processAddressComponents = (addressComponents: AddressComponentType[] | undefined) => {
  if (!addressComponents || addressComponents.length === 0) {
    return {
      address1: "",
      city: "",
      state: "",
      zipcode: "",
      countyName: "",
    };
  }
  const streetNumber = findAddressComponent(addressComponents, "street_number");
  const streetName = findAddressComponent(addressComponents, "route");
  const city = findAddressComponent(addressComponents, "locality");
  const state = findAddressComponent(addressComponents, "administrative_area_level_1");
  const zipcode = findAddressComponent(addressComponents, "postal_code");
  const countyName = findAddressComponent(addressComponents, "administrative_area_level_2");
  return {
    address1: `${streetNumber} ${streetName}`.trim(),
    city,
    state,
    zipcode,
    countyName,
  };
};

export const UnifiedAddressAutoCompleteField = ({
  disabled,
  googleMapsApiKey,
  value,
  handleAddressChange,
  handleAutoCompleteChange,
}: {
  disabled?: boolean;
  googleMapsApiKey?: string;
  value: string;
  handleAddressChange: OnChangeCallback;
  handleAutoCompleteChange: (value: AddressInterface) => void;
}) => {
  const isWeb = typeof document !== "undefined";
  if (isWeb) {
    return (
      <WebAddressAutocomplete
        disabled={disabled}
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        inputValue={value}
      />
    );
  } else {
    return (
      <MobileAddressAutocomplete
        disabled={disabled}
        googleMapsApiKey={googleMapsApiKey}
        handleAddressChange={handleAddressChange}
        handleAutoCompleteChange={handleAutoCompleteChange}
        inputValue={value}
      />
    );
  }
};
