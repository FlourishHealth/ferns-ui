import {fireEvent} from "@testing-library/react-native";
import React from "react";

import {AddressField} from "./AddressField";
import {renderWithTheme} from "./test-utils";

describe("AddressField", () => {
  const defaultProps = {
    testID: "test-address",
    value: {
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "Springfield",
      state: "IL",
      zipcode: "62701",
      countyName: "Sangamon",
      countyCode: "17167",
    },
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it("renders correctly with default props", () => {
    const {toJSON} = renderWithTheme(<AddressField {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders all address fields", () => {
    const {getByTestId} = renderWithTheme(<AddressField {...defaultProps} />);

    expect(getByTestId("test-address-address1")).toBeTruthy();
    expect(getByTestId("test-address-address2")).toBeTruthy();
    expect(getByTestId("test-address-city")).toBeTruthy();
    expect(getByTestId("test-address-zip")).toBeTruthy();
  });

  it("calls onChange when address fields are updated", () => {
    const {getByTestId} = renderWithTheme(<AddressField {...defaultProps} />);

    const cityInput = getByTestId("test-address-city");
    fireEvent.changeText(cityInput, "New City");

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      ...defaultProps.value,
      city: "New City",
    });
  });

  it("calls onBlur when a field is blurred", () => {
    const {getByTestId} = renderWithTheme(<AddressField {...defaultProps} />);
    // Reset mock since it was called during render
    defaultProps.onBlur.mockClear();
    const zipInput = getByTestId("test-address-zip");
    fireEvent.changeText(zipInput, "90210");
    fireEvent(zipInput, "blur");

    expect(defaultProps.onBlur).toHaveBeenCalledWith({
      ...defaultProps.value,
      zipcode: "90210",
    });
  });

  it("renders county fields when includeCounty is true", () => {
    const {getByTestId} = renderWithTheme(<AddressField {...defaultProps} includeCounty />);

    expect(getByTestId("test-address-county")).toBeTruthy();
    expect(getByTestId("test-address-county-code")).toBeTruthy();
  });

  it("does not render county fields when includeCounty is false", () => {
    const {queryByTestId} = renderWithTheme(
      <AddressField {...defaultProps} includeCounty={false} />
    );

    expect(queryByTestId("test-address-county")).toBeNull();
    expect(queryByTestId("test-address-county-code")).toBeNull();
  });

  it("disables all fields when disabled prop is true", () => {
    const {getByTestId} = renderWithTheme(<AddressField {...defaultProps} disabled />);

    const address1Input = getByTestId("test-address-address1");
    const cityInput = getByTestId("test-address-city");

    // Check that the disabled prop is passed down to the inputs
    expect(address1Input.props.accessibilityState.disabled).toBe(true);
    expect(cityInput.props.accessibilityState.disabled).toBe(true);
  });
});
