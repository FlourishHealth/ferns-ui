import React, {ReactElement, useEffect, useRef} from "react";

import {AddressInterface, OnChangeCallback} from "./Common";
import {TextField} from "./TextField";

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
  googleMapsApiKey,
  inputValue,
  handleAddressChange,
  handleAutoCompleteChange,
}: {
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
          autocompleteInputRef.current
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            // handle the selected address here (e.g., saving to state, sending to a backend, etc.)
            const streetNumber =
              place.address_components.find((component: any) =>
                component.types.includes("street_number")
              )?.long_name ?? "";
            const streetName =
              place.address_components.find((component: any) => component.types.includes("route"))
                ?.long_name ?? "";
            const city =
              place.address_components.find((component: any) =>
                component.types.includes("locality")
              )?.long_name ?? "";
            const state =
              place.address_components.find((component: any) =>
                component.types.includes("administrative_area_level_1")
              )?.long_name ?? "";
            const zipcode =
              place.address_components.find((component: any) =>
                component.types.includes("postal_code")
              )?.long_name ?? "";
            const countyName =
              place.address_components.find((component: any) =>
                component.types.includes("administrative_area_level_2")
              )?.long_name ?? "";
            handleAutoCompleteChange({
              address1: `${streetNumber} ${streetName}`,
              city,
              state,
              zipcode,
              countyName,
            });
          }
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
