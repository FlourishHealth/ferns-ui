import React, {ReactElement, useEffect, useRef} from "react";

import {AddressInterface, OnChangeCallback} from "./Common";
import {TextField} from "./TextField";
import {processAddressComponents} from "./UnifiedAddressAutoComplete";

const loadGooglePlacesScript = (googleMapsApiKey: string, callbackName: any): Promise<void> => {
  return new Promise<void>((resolve, reject): undefined => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }
    (window as any)[callbackName] = (): void => resolve();
    const script: HTMLScriptElement = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = (): any => reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  });
};

export const WebAddressAutocomplete = ({
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
}): ReactElement => {
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    const callbackName = "initAutocomplete";
    if (!googleMapsApiKey) return;
    loadGooglePlacesScript(googleMapsApiKey, callbackName)
      .then(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          {
            componentRestrictions: {country: "us"},
            fields: ["address_components", "formatted_address"],
          }
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const addressComponents = place?.address_components;
          const formattedAddressObject = processAddressComponents(addressComponents);
          handleAutoCompleteChange(formattedAddressObject);
        });
      })
      .catch((error) => console.error(error));

    // Cleanup
    return () => {
      (window as any)[callbackName] = null;
    };
  }, [googleMapsApiKey, handleAutoCompleteChange]);

  return (
    <TextField
      disabled={disabled}
      inputRef={
        !googleMapsApiKey ? undefined : (ref: any): void => (autocompleteInputRef.current = ref)
      }
      label="Street Address"
      placeholder="Enter an address"
      type="text"
      value={inputValue}
      onChange={({value}): void => {
        handleAddressChange({value});
      }}
    />
  );
};
