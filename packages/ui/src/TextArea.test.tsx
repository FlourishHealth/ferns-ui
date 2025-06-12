import {userEvent} from "@testing-library/react-native";
import React from "react";

import {TextArea} from "./TextArea";
import {renderWithTheme} from "./test-utils";

describe("TextArea", () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("basic functionality", () => {
    it("should render as multiline text field", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="test content" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("test content");
      expect(input.props.multiline).toBe(true);
      expect(input.props.value).toBe("test content");
    });

    it("should render with title", () => {
      const {getByText} = renderWithTheme(
        <TextArea title="Description" value="" onChange={mockOnChange} />
      );
      
      expect(getByText("Description")).toBeTruthy();
    });

    it("should render with placeholder", () => {
      const {getByPlaceholderText} = renderWithTheme(
        <TextArea placeholder="Enter description" value="" onChange={mockOnChange} />
      );
      
      expect(getByPlaceholderText("Enter description")).toBeTruthy();
    });

    it("should render helper text", () => {
      const {getByText} = renderWithTheme(
        <TextArea helperText="Maximum 500 characters" value="" onChange={mockOnChange} />
      );
      
      expect(getByText("Maximum 500 characters")).toBeTruthy();
    });

    it("should render error text", () => {
      const {getByText} = renderWithTheme(
        <TextArea errorText="This field is required" value="" onChange={mockOnChange} />
      );
      
      expect(getByText("This field is required")).toBeTruthy();
    });

    it("should support grow behavior", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea grow value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      expect(input.props.multiline).toBe(true);
    });

    it("should be disabled when disabled prop is true", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea disabled value="test" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("test");
      expect(input.props.readOnly).toBe(true);
    });

    it("should always have text type", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      expect(input.props.keyboardType).toBe("default");
    });
  });

  describe("user interactions", () => {
    it("should call onChange when text is entered", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      await user.type(input, "hello world");

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
    });

    it("should handle multiline text input", async () => {
      const user = userEvent.setup();
      const multilineText = "Line 1\nLine 2\nLine 3";
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      await user.type(input, multilineText);

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe("accessibility", () => {
    it("should have correct accessibility properties", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      expect(input.props.accessibilityHint).toBe("Enter text here");
      expect(input.props["aria-label"]).toBe("Text input field");
    });

    it("should indicate disabled state in accessibility", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea disabled value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      expect(input.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle empty value", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      expect(input.props.value).toBe("");
    });

    it("should handle undefined value", () => {
      const {root} = renderWithTheme(
        <TextArea value={undefined} onChange={mockOnChange} />
      );
      
      expect(root).toBeTruthy();
    });

    it("should handle long text values", () => {
      const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50);
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value={longText} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(longText);
      expect(input.props.value).toBe(longText);
    });

    it("should handle text with line breaks", () => {
      const textWithBreaks = "First line\nSecond line\n\nFourth line";
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value={textWithBreaks} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(textWithBreaks);
      expect(input.props.value).toBe(textWithBreaks);
    });
  });

  describe("props inheritance", () => {
    it("should inherit all TextField props except multiline and type", () => {
      const mockOnFocus = jest.fn();
      const mockOnBlur = jest.fn();
      
      const {getByDisplayValue} = renderWithTheme(
        <TextArea 
          value="test" 
          onChange={mockOnChange}
          onFocus={mockOnFocus}
          onBlur={mockOnBlur}
          placeholder="Test placeholder"
          disabled={false}
          rows={5}
        />
      );
      
      const input = getByDisplayValue("test");
      expect(input.props.numberOfLines).toBe(5);
      expect(input.props.onFocus).toBeTruthy();
      expect(input.props.onBlur).toBeTruthy();
    });

    it("should support inputRef", () => {
      const mockInputRef = jest.fn();
      renderWithTheme(
        <TextArea inputRef={mockInputRef} value="" onChange={mockOnChange} />
      );
      
      expect(mockInputRef).toHaveBeenCalled();
    });
  });
});
