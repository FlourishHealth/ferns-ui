import {fireEvent} from "@testing-library/react-native";
import React from "react";
import {Text} from "react-native";

import {Accordion} from "./Accordion";
import {renderWithTheme} from "./test-utils";

describe("Accordion", () => {
  const defaultProps = {
    title: "Test Title",
    children: <Text testID="test-content">Test Content</Text>,
  };

  it("renders correctly with default props", () => {
    const {toJSON} = renderWithTheme(<Accordion {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders title and children", () => {
    const {getByText, getByTestId} = renderWithTheme(
      <Accordion {...defaultProps} isCollapsed={false} />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByTestId("test-content")).toBeTruthy();
  });

  it("renders subtitle when provided", () => {
    const {getByText} = renderWithTheme(<Accordion {...defaultProps} subtitle="Test Subtitle" />);
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("collapses when isCollapsed is true", () => {
    const {queryByTestId} = renderWithTheme(<Accordion {...defaultProps} isCollapsed />);
    expect(queryByTestId("test-content")).toBeNull();
  });

  it("expands when isCollapsed is false", () => {
    const {getByTestId} = renderWithTheme(<Accordion {...defaultProps} isCollapsed={false} />);
    expect(getByTestId("test-content")).toBeTruthy();
  });

  it("toggles visibility when header is pressed", () => {
    const {queryByTestId, getByTestId} = renderWithTheme(
      <Accordion {...defaultProps} isCollapsed={false} />
    );

    // Content should be visible initially
    expect(getByTestId("test-content")).toBeTruthy();

    // Click the toggle button
    const toggleButton = getByTestId("accordion-toggle");
    fireEvent.press(toggleButton);

    // Content should be hidden after click
    expect(queryByTestId("test-content")).toBeNull();
  });

  it("renders info modal icon when includeInfoModal is true and infoModalTitle is provided", () => {
    const {getByTestId} = renderWithTheme(
      <Accordion {...defaultProps} includeInfoModal infoModalTitle="Test Info Title" />
    );

    // The info modal icon should be present
    expect(getByTestId("info-icon")).toBeTruthy();
  });

  it("toggles content visibility when header is clicked", () => {
    const {getByTestId, queryByText, getByText} = renderWithTheme(
      <Accordion {...defaultProps} isCollapsed={false} />
    );

    // Content should be visible initially
    expect(queryByText("Test Content")).toBeTruthy();

    // Click the header to collapse
    const toggleButton = getByTestId("accordion-toggle");
    fireEvent.press(toggleButton);

    // Content should be hidden after click
    expect(queryByText("Test Content")).toBeNull();

    // Click again to expand
    fireEvent.press(toggleButton);
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("renders info modal icon when includeInfoModal is true and infoModalTitle is provided", () => {
    const {getByTestId} = renderWithTheme(
      <Accordion {...defaultProps} includeInfoModal infoModalTitle="Info Title" />
    );

    // The info modal icon should be present
    expect(getByTestId("info-icon")).toBeTruthy();
  });

  it("does not render info modal icon when includeInfoModal is false", () => {
    const {queryByTestId} = renderWithTheme(
      <Accordion {...defaultProps} includeInfoModal={false} infoModalTitle="Info Title" />
    );

    // The info modal icon should not be present
    expect(queryByTestId("info-icon")).toBeNull();
  });
});
