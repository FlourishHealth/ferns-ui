import React, {useContext, useEffect, useRef, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

import {AddressInterface, OnChangeCallback} from "./Common";
import {GOOGLE_PLACES_API_RESTRICTIONS} from "./Constants";
import {TextField} from "./TextField";
import {ThemeContext} from "./Theme";
import {processAddressComponents} from "./Utilities";

export const MobileAddressAutocomplete = ({
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
  const {theme} = useContext(ThemeContext);
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!googleMapsApiKey) return;
    if (ref?.current) {
      ref.current.setAddressText(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textInputStyles = {
    borderRadius: 16,
    borderColor: isFocused ? theme.blue : theme.gray,
    borderWidth: isFocused ? 5 : 1,
    paddingHorizontal: isFocused ? 10 : 14,
    paddingVertical: isFocused ? 0 : 4,
    backgroundColor: theme.white,
  };

  if (!googleMapsApiKey) {
    return (
      <TextField
        disabled={disabled}
        id="address1"
        label="Street Address"
        type="text"
        value={inputValue}
        onChange={(result) => handleAddressChange(result)}
      />
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => setIsFocused(false)}>
      <View>
        <GooglePlacesAutocomplete
          ref={ref}
          GooglePlacesDetailsQuery={{
            fields: Object.values(GOOGLE_PLACES_API_RESTRICTIONS.fields).join(","),
          }}
          disableScroll
          fetchDetails
          placeholder="Street Address"
          query={{
            key: googleMapsApiKey,
            language: "en",
            components: `country:${GOOGLE_PLACES_API_RESTRICTIONS.components.country}`,
          }}
          styles={{
            textInputContainer: {
              ...textInputStyles,
            },
            textInput: {
              fontFamily: theme.primaryFont,
            },
          }}
          textInputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            onChange: (event) => {
              handleAddressChange({value: event.nativeEvent.text});
            },
          }}
          onPress={(data, details = null) => {
            const addressComponents = details?.address_components;
            const formattedAddressObject = processAddressComponents(addressComponents);
            const {address1} = formattedAddressObject;
            handleAutoCompleteChange(formattedAddressObject);
            if (ref.current) {
              ref.current.setAddressText(address1);
            }
            setIsFocused(false);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
