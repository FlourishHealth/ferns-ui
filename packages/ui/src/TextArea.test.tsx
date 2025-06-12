import {render, userEvent} from "@testing-library/react-native";
import React from "react";
import {assert} from "chai";

import {TextArea} from "./TextArea";
import {ThemeProvider} from "./Theme";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

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
      assert.isTrue(input.props.multiline);
      assert.equal(input.props.value, "test content");
    });

    it("should render with title", () => {
      const {getByText} = renderWithTheme(
        <TextArea title="Description" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("Description"));
    });

    it("should render with placeholder", () => {
      const {getByPlaceholderText} = renderWithTheme(
        <TextArea placeholder="Enter description" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByPlaceholderText("Enter description"));
    });

    it("should render helper text", () => {
      const {getByText} = renderWithTheme(
        <TextArea helperText="Maximum 500 characters" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("Maximum 500 characters"));
    });

    it("should render error text", () => {
      const {getByText} = renderWithTheme(
        <TextArea errorText="This field is required" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("This field is required"));
    });

    it("should support grow behavior", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea grow value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.multiline);
    });

    it("should be disabled when disabled prop is true", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea disabled value="test" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("test");
      assert.isTrue(input.props.readOnly);
    });

    it("should always have text type", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.keyboardType, "default");
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

      assert.isTrue(mockOnChange.mock.calls.length > 0);
      assert.equal(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0], "hello world");
    });

    it("should handle multiline text input", async () => {
      const user = userEvent.setup();
      const multilineText = "Line 1\nLine 2\nLine 3";
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      await user.type(input, multilineText);

      assert.isTrue(mockOnChange.mock.calls.length > 0);
      assert.equal(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0], multilineText);
    });
  });

  describe("accessibility", () => {
    it("should have correct accessibility properties", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.accessibilityHint, "Enter text here");
      assert.equal(input.props["aria-label"], "Text input field");
    });

    it("should indicate disabled state in accessibility", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea disabled value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.accessibilityState.disabled);
    });
  });

  describe("edge cases", () => {
    it("should handle empty value", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.value, "");
    });

    it("should handle undefined value", () => {
      const {container} = renderWithTheme(
        <TextArea value={undefined} onChange={mockOnChange} />
      );
      
      assert.isNotNull(container);
    });

    it("should handle long text values", () => {
      const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50);
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value={longText} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(longText);
      assert.equal(input.props.value, longText);
    });

    it("should handle text with line breaks", () => {
      const textWithBreaks = "First line\nSecond line\n\nFourth line";
      const {getByDisplayValue} = renderWithTheme(
        <TextArea value={textWithBreaks} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(textWithBreaks);
      assert.equal(input.props.value, textWithBreaks);
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
      assert.equal(input.props.numberOfLines, 5);
      assert.isNotNull(input.props.onFocus);
      assert.isNotNull(input.props.onBlur);
    });

    it("should support inputRef", () => {
      const mockInputRef = jest.fn();
      renderWithTheme(
        <TextArea inputRef={mockInputRef} value="" onChange={mockOnChange} />
      );
      
      assert.isTrue(mockInputRef.called);
    });
  });
});
