import React from "react";
import {View} from "react-native";

import {AddressInterface, FieldProps} from "./Common";
import {USSTATESLIST} from "./Constants";
import {SelectField} from "./SelectField";
import {TextField} from "./TextField";
import {UnifiedAddressAutoCompleteField} from "./UnifiedAddressAutoComplete";
export const AddressField = ({
  disabled,
  googleMapsApiKey,
  googlePlacesMobileStyles,
  includeCounty,
  value,
  testID,
  onChange,
  onBlur,
}: Partial<FieldProps>) => {
  const handleAddressChange = (field: string, newValue: string) => {
    onChange({...value, [field]: newValue});
    onBlur && onBlur({...value, [field]: newValue});
  };

  const handleAutoCompleteChange = (newValue: AddressInterface) => {
    onChange({...value, ...newValue});
  };

  const addressValue = value ? value : {};
  const {
    address1 = "",
    address2 = "",
    city = "",
    state = "",
    zipcode = "",
    countyName = "",
    countyCode = "",
  }: AddressInterface = addressValue;

  return (
    <>
      <View style={{marginBottom: 16}}>
        <UnifiedAddressAutoCompleteField
          disabled={disabled}
          googleMapsApiKey={googleMapsApiKey}
          googlePlacesMobileStyles={googlePlacesMobileStyles}
          handleAddressChange={(result) => handleAddressChange("address1", result.value)}
          handleAutoCompleteChange={(result) => handleAutoCompleteChange(result)}
          includeCounty={includeCounty}
          inputValue={address1}
          testID={`${testID}-address1`}
        />
      </View>
      <View style={{marginBottom: 16}}>
        <TextField
          disabled={disabled}
          id="address2"
          testID={`${testID}-address2`}
          title="Apt, suite, etc"
          type="text"
          value={address2}
          onChange={(result) => handleAddressChange("address2", result.value)}
        />
      </View>
      <View style={{marginBottom: 16}}>
        <TextField
          disabled={disabled}
          id="city"
          testID={`${testID}-city`}
          title="City"
          type="text"
          value={city}
          onChange={(result) => handleAddressChange("city", result.value)}
        />
      </View>
      <View style={{marginBottom: 16}}>
        <SelectField
          options={USSTATESLIST}
          title="State"
          value={state}
          onChange={(result) => handleAddressChange("state", result!)}
        />
      </View>
      <View style={{marginBottom: 16}}>
        <TextField
          disabled={disabled}
          id="zipcode"
          testID={`${testID}-zip`}
          title="Zipcode"
          type="text"
          value={zipcode}
          onChange={(result) => handleAddressChange("zipcode", result.value)}
        />
      </View>
      {includeCounty && (
        <>
          <View style={{marginBottom: 16}}>
            <TextField
              disabled={disabled}
              id="countyName"
              testID={`${testID}-county`}
              title="County Name"
              type="text"
              value={countyName}
              onChange={(result) => handleAddressChange("countyName", result.value)}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <TextField
              disabled={disabled}
              id="countyCode"
              testID={`${testID}-county-code`}
              title="County Code"
              type="number"
              value={countyCode}
              onChange={(result) => handleAddressChange("countyCode", result.value)}
            />
          </View>
        </>
      )}
    </>
  );
};
