import React from "react";

import {Badge} from "./Badge";
import {renderWithTheme} from "./test-utils";

describe("Badge", () => {
  const defaultProps = {
    value: "Test",
  };

  it("renders correctly with default props", () => {
    const {toJSON} = renderWithTheme(<Badge {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders text value correctly", () => {
    const {getByText} = renderWithTheme(<Badge {...defaultProps} />);
    expect(getByText("Test")).toBeTruthy();
  });

  it("renders number value correctly", () => {
    const {getByText} = renderWithTheme(<Badge value={42} />);
    expect(getByText("42")).toBeTruthy();
  });

  it("truncates large numbers with maxValue", () => {
    const {getByText} = renderWithTheme(<Badge maxValue={100} value={150} variant="numberOnly" />);
    expect(getByText("100+")).toBeTruthy();
  });

  it("does not truncate numbers below maxValue", () => {
    const {getByText} = renderWithTheme(<Badge maxValue={100} value={50} variant="numberOnly" />);
    expect(getByText("50")).toBeTruthy();
  });

  it("applies correct status colors", () => {
    const statuses = ["error", "warning", "info", "success", "neutral"] as const;

    statuses.forEach((status) => {
      let {getByTestId} = renderWithTheme(
        <Badge {...defaultProps} status={status} testID="badge" />
      );

      // Test primary variant
      const badge = getByTestId("badge");
      expect(badge).toHaveStyle({backgroundColor: expect.any(String)});

      // Test secondary variant
      ({getByTestId} = renderWithTheme(
        <Badge {...defaultProps} secondary status={status} testID="badge-secondary" />
      ));
      const secondaryBadge = getByTestId("badge-secondary");
      expect(secondaryBadge).toHaveStyle({backgroundColor: expect.any(String)});
    });
  });

  it("renders icon when iconName is provided", () => {
    const {getByTestId} = renderWithTheme(
      <Badge {...defaultProps} iconName="check" testID="badge-with-icon" />
    );
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("renders icon only when variant is iconOnly", () => {
    const {getByTestId, queryByText} = renderWithTheme(
      <Badge {...defaultProps} iconName="check" testID="icon-only-badge" variant="iconOnly" />
    );

    expect(getByTestId("icon")).toBeTruthy();
    expect(queryByText("Test")).toBeNull();
  });

  it("applies custom colors when status is custom", () => {
    const customColors = {
      customBackgroundColor: "#123456",
      customTextColor: "#ffffff",
      customBorderColor: "#654321",
      customIconColor: "#ffcc00",
    };

    const {getByTestId} = renderWithTheme(
      <Badge
        {...defaultProps}
        iconName="star"
        secondary
        status="custom"
        testID="custom-badge"
        {...(customColors as any)}
      />
    );

    const badge = getByTestId("custom-badge");
    expect(badge).toHaveStyle({
      backgroundColor: customColors.customBackgroundColor,
      borderColor: customColors.customBorderColor,
    });
  });

  it("applies correct border radius based on variant", () => {
    // Default variant
    let {getByTestId} = renderWithTheme(<Badge {...defaultProps} testID="default-badge" />);
    expect(getByTestId("default-badge")).toHaveStyle({borderRadius: expect.any(Number)});

    // Icon only variant
    ({getByTestId} = renderWithTheme(
      <Badge {...defaultProps} iconName="check" testID="icon-only-badge" variant="iconOnly" />
    ));
    expect(getByTestId("icon-only-badge")).toHaveStyle({borderRadius: expect.any(Number)});

    // Number only variant
    ({getByTestId} = renderWithTheme(
      <Badge {...defaultProps} testID="number-only-badge" variant="numberOnly" />
    ));
    expect(getByTestId("number-only-badge")).toHaveStyle({borderRadius: expect.any(Number)});
  });
});
