import {act, render, userEvent} from "@testing-library/react-native";
import React from "react";
import {assert} from "chai";

import {TextField} from "./TextField";
import {ThemeProvider} from "./Theme";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("TextField", () => {
  let mockOnChange: jest.Mock;
  let mockOnFocus: jest.Mock;
  let mockOnBlur: jest.Mock;
  let mockOnEnter: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnChange = jest.fn();
    mockOnFocus = jest.fn();
    mockOnBlur = jest.fn();
    mockOnEnter = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe("basic rendering", () => {
    it("should render with default props", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="test value" onChange={mockOnChange} />
      );
      
      assert.equal(getByDisplayValue("test value").props.value, "test value");
    });

    it("should render with title", () => {
      const {getByText} = renderWithTheme(
        <TextField title="Test Title" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("Test Title"));
    });

    it("should render with placeholder", () => {
      const {getByPlaceholderText} = renderWithTheme(
        <TextField placeholder="Enter text" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByPlaceholderText("Enter text"));
    });

    it("should render helper text", () => {
      const {getByText} = renderWithTheme(
        <TextField helperText="This is helper text" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("This is helper text"));
    });

    it("should render error text", () => {
      const {getByText} = renderWithTheme(
        <TextField errorText="This is an error" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByText("This is an error"));
    });
  });

  describe("user interactions", () => {
    it("should call onChange when text is entered", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      await user.type(input, "hello");

      assert.isTrue(mockOnChange.mock.calls.length > 0);
      assert.equal(mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0], "hello");
    });

    it("should call onFocus when input is focused", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} onFocus={mockOnFocus} />
      );

      const input = getByDisplayValue("");
      await user.press(input);

      assert.isTrue(mockOnFocus.calledOnce);
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="test" onChange={mockOnChange} onBlur={mockOnBlur} />
      );

      const input = getByDisplayValue("test");
      await user.press(input);
      await act(async () => {
        input.props.onBlur();
      });

      assert.isTrue(mockOnBlur.calledOnce);
      assert.equal(mockOnBlur.mock.calls[0][0], "test");
    });

    it("should call onEnter when enter key is pressed", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} onEnter={mockOnEnter} />
      );

      const input = getByDisplayValue("");
      await act(async () => {
        input.props.onSubmitEditing();
      });

      assert.isTrue(mockOnEnter.calledOnce);
    });
  });

  describe("field types", () => {
    it("should render email type with correct keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="email" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.keyboardType, "email-address");
    });

    it("should render password type with secure text entry", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="password" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.secureTextEntry);
    });

    it("should render url type with correct keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="url" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.keyboardType === "url" || input.props.keyboardType === "default");
    });

    it("should render phoneNumber type with number keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="phoneNumber" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.keyboardType, "number-pad");
    });

    it("should render search type with default keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="search" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.keyboardType, "default");
    });
  });

  describe("multiline behavior", () => {
    it("should render as multiline when multiline prop is true", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField multiline value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.multiline);
    });

    it("should set number of lines when rows prop is provided", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField multiline rows={5} value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.numberOfLines, 5);
    });

    it("should handle grow behavior with multiline", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField multiline grow value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.multiline);
    });
  });

  describe("disabled state", () => {
    it("should be read-only when disabled", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="test" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("test");
      assert.isTrue(input.props.readOnly);
    });

    it("should not call onFocus when disabled", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="" onChange={mockOnChange} onFocus={mockOnFocus} />
      );

      const input = getByDisplayValue("");
      await act(async () => {
        input.props.onFocus();
      });

      assert.isFalse(mockOnFocus.called);
    });

    it("should not call onBlur when disabled", async () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="test" onChange={mockOnChange} onBlur={mockOnBlur} />
      );

      const input = getByDisplayValue("test");
      await act(async () => {
        input.props.onBlur();
      });

      assert.isFalse(mockOnBlur.called);
    });
  });

  describe("icon functionality", () => {
    it("should render icon when iconName is provided", () => {
      const {getByRole} = renderWithTheme(
        <TextField iconName="search" value="" onChange={mockOnChange} />
      );
      
      assert.isNotNull(getByRole("button"));
    });

    it("should call onIconClick when icon is pressed", async () => {
      const mockOnIconClick = jest.fn();
      const user = userEvent.setup();
      const {getByRole} = renderWithTheme(
        <TextField iconName="search" onIconClick={mockOnIconClick} value="" onChange={mockOnChange} />
      );

      const iconButton = getByRole("button");
      await user.press(iconButton);

      assert.isTrue(mockOnIconClick.calledOnce);
    });
  });

  describe("accessibility", () => {
    it("should have correct accessibility properties", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.accessibilityHint, "Enter text here");
      assert.equal(input.props["aria-label"], "Text input field");
    });

    it("should indicate disabled state in accessibility", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isTrue(input.props.accessibilityState.disabled);
    });
  });

  describe("auto-complete and text content", () => {
    it("should set autoComplete property", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField autoComplete="username" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isDefined(input.props.autoComplete);
    });

    it("should handle text content type for email", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="email" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.textContentType, "emailAddress");
    });

    it("should handle text content type for password", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="password" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.textContentType, "password");
    });
  });

  describe("edge cases", () => {
    it("should handle empty value", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.value, "");
    });

    it("should handle undefined value", () => {
      const {container} = renderWithTheme(
        <TextField value={undefined} onChange={mockOnChange} />
      );
      
      assert.isNotNull(container);
    });

    it("should handle long text values", () => {
      const longText = "a".repeat(1000);
      const {getByDisplayValue} = renderWithTheme(
        <TextField value={longText} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(longText);
      assert.equal(input.props.value, longText);
    });

    it("should handle special characters", () => {
      const specialText = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
      const {getByDisplayValue} = renderWithTheme(
        <TextField value={specialText} onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue(specialText);
      assert.equal(input.props.value, specialText);
    });
  });

  describe("return key behavior", () => {
    it("should set return key type", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField returnKeyType="done" value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.equal(input.props.enterKeyHint, "done");
    });

    it("should handle blur on submit", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField blurOnSubmit={false} value="" onChange={mockOnChange} />
      );
      
      const input = getByDisplayValue("");
      assert.isFalse(input.props.blurOnSubmit);
    });
  });

  describe("input ref", () => {
    it("should call inputRef with the input reference", () => {
      const mockInputRef = jest.fn();
      renderWithTheme(
        <TextField inputRef={mockInputRef} value="" onChange={mockOnChange} />
      );
      
      assert.isTrue(mockInputRef.called);
    });
  });
});
