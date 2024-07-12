import React, {useContext, useEffect, useRef, useState} from "react";
import {TextStyle, TouchableOpacity, View} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

import {AddressAutocompleteProps} from "./Common";
import {GOOGLE_PLACES_API_RESTRICTIONS} from "./Constants";
import {TextField} from "./TextField";
import {ThemeContext} from "./Theme";
import {processAddressComponents} from "./Utilities";

export const MobileAddressAutocomplete = ({
  disabled,
  googleMapsApiKey,
  includeCounty,
  inputValue,
  // More on react-native-google-places-autocomplete styles here: https://github.com/FaridSafi/react-native-google-places-autocomplete#styling
  styles,
  handleAddressChange,
  handleAutoCompleteChange,
  testID,
}: AddressAutocompleteProps) => {
  const {theme} = useContext(ThemeContext);
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Load the Google Maps script and initialize the autocomplete.
  useEffect(() => {
    if (!googleMapsApiKey) return;
    if (ref?.current) {
      ref.current.setAddressText(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textInputContainerStyles = {
    backgroundColor: theme.surface.base,
    borderColor: isFocused ? theme.border.hover : theme.border.default,
    borderWidth: isFocused ? 5 : 1,
    borderRadius: theme.radius.default,
    paddingHorizontal: isFocused ? 10 : 14,
    paddingVertical: isFocused ? 0 : 4,
    ...(styles?.textInputContainer as object),
  };

  const textInputStyles = {
    backgroundColor: theme.surface.base,
    borderRadius: theme.radius.default,
    color: theme.text.primary,
    fontFamily: "text",
    fontSize: (styles?.textInput as TextStyle)?.fontSize ?? 14,
    height: 40,
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 4,
    ...(styles?.textInput as object),
  };

  if (!googleMapsApiKey) {
    return (
      <TextField
        disabled={disabled}
        id="address1"
        testID={testID}
        type="text"
        value={inputValue}
        onChange={(result) => handleAddressChange(result)}
      />
    );
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={1}
      style={{flex: 1}}
      onPress={() => setIsFocused(false)}
    >
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
              ...textInputContainerStyles,
            },
            textInput: {
              ...textInputStyles,
            },
            ...styles,
          }}
          textInputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            onChange: (event) => {
              handleAddressChange(event.nativeEvent.text);
            },
          }}
          onPress={(data, details = null) => {
            const addressComponents = details?.address_components;
            const formattedAddressObject = processAddressComponents(addressComponents, {
              includeCounty,
            });
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
