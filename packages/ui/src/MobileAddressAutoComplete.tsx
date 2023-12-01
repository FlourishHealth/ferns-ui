import React from "react";
import {Button, TextInput, View} from "react-native";
import RNGooglePlaces from "react-native-google-places";

export const MobileAddressAutocomplete = () => {
  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        // process the details and assign to the input
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View>
      <TextInput placeholder="Enter address" />
      <Button title="Search Address" onPress={openSearchModal} />
    </View>
  );
};
