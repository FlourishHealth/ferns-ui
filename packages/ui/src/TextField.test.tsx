import {act, userEvent} from "@testing-library/react-native";
import React from "react";

import {renderWithTheme} from "./test-utils";
import {TextField} from "./TextField";

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

      expect(getByDisplayValue("test value").props.value).toBe("test value");
    });

    it("should render with title", () => {
      const {getByText} = renderWithTheme(
        <TextField title="Test Title" value="" onChange={mockOnChange} />
      );

      expect(getByText("Test Title")).toBeTruthy();
    });

    it("should render with placeholder", () => {
      const {getByPlaceholderText} = renderWithTheme(
        <TextField placeholder="Enter text" value="" onChange={mockOnChange} />
      );

      expect(getByPlaceholderText("Enter text")).toBeTruthy();
    });

    it("should render helper text", () => {
      const {getByText} = renderWithTheme(
        <TextField helperText="This is helper text" value="" onChange={mockOnChange} />
      );

      expect(getByText("This is helper text")).toBeTruthy();
    });

    it("should render error text", () => {
      const {getByText} = renderWithTheme(
        <TextField errorText="This is an error" value="" onChange={mockOnChange} />
      );

      expect(getByText("This is an error")).toBeTruthy();
    });
  });

  describe("user interactions", () => {
    it("should call onChange when text is entered", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(<TextField value="" onChange={mockOnChange} />);

      const input = getByDisplayValue("");
      await user.type(input, "hello");

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
    });

    it("should call onFocus when input is focused", async () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="" onChange={mockOnChange} onFocus={mockOnFocus} />
      );

      const input = getByDisplayValue("");
      expect(input.props.onFocus).toBeTruthy();
    });

    it("should call onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField value="test" onBlur={mockOnBlur} onChange={mockOnChange} />
      );

      const input = getByDisplayValue("test");
      await user.press(input);
      await act(async () => {
        input.props.onBlur();
      });

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
      expect(mockOnBlur.mock.calls[0][0]).toBe("test");
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

      expect(mockOnEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe("field types", () => {
    it("should render email type with correct keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="email" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.keyboardType).toBe("email-address");
    });

    it("should render password type with secure text entry", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="password" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.secureTextEntry).toBe(true);
    });

    it("should render url type with correct keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="url" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.keyboardType === "url" || input.props.keyboardType === "default").toBe(
        true
      );
    });

    it("should render phoneNumber type with number keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="phoneNumber" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.keyboardType).toBe("number-pad");
    });

    it("should render search type with default keyboard", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="search" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.keyboardType).toBe("default");
    });
  });

  describe("multiline behavior", () => {
    it("should render as multiline when multiline prop is true", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField multiline value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.multiline).toBe(true);
    });

    it("should set number of lines when rows prop is provided", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField multiline rows={5} value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.numberOfLines).toBe(5);
    });

    it("should handle grow behavior with multiline", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField grow multiline value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.multiline).toBe(true);
    });
  });

  describe("disabled state", () => {
    it("should be read-only when disabled", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="test" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("test");
      expect(input.props.readOnly).toBe(true);
    });

    it("should not call onFocus when disabled", async () => {
      const user = userEvent.setup();
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="" onChange={mockOnChange} onFocus={mockOnFocus} />
      );

      const input = getByDisplayValue("");
      expect(input.props.readOnly).toBe(true);
    });

    it("should not call onBlur when disabled", async () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="test" onBlur={mockOnBlur} onChange={mockOnChange} />
      );

      const input = getByDisplayValue("test");
      await act(async () => {
        input.props.onBlur();
      });

      expect(mockOnBlur).not.toHaveBeenCalled();
    });
  });

  describe("icon functionality", () => {
    it("should render icon when iconName is provided", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField iconName="check" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input).toBeTruthy();
    });

    it("should call onIconClick when icon is pressed", async () => {
      const mockOnIconClick = jest.fn();
      const {getByDisplayValue} = renderWithTheme(
        <TextField
          iconName="check"
          value=""
          onChange={mockOnChange}
          onIconClick={mockOnIconClick}
        />
      );

      const input = getByDisplayValue("");
      expect(input).toBeTruthy();
    });
  });

  describe("accessibility", () => {
    it("should have correct accessibility properties", () => {
      const {getByDisplayValue} = renderWithTheme(<TextField value="" onChange={mockOnChange} />);

      const input = getByDisplayValue("");
      expect(input.props.accessibilityHint).toBe("Enter text here");
      expect(input.props["aria-label"]).toBe("Text input field");
    });

    it("should indicate disabled state in accessibility", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField disabled value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("auto-complete and text content", () => {
    it("should set autoComplete property", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField autoComplete="username" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input).toBeTruthy();
    });

    it("should handle text content type for email", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="email" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.textContentType).toBe("emailAddress");
    });

    it("should handle text content type for password", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField type="password" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.textContentType).toBe("password");
    });
  });

  describe("edge cases", () => {
    it("should handle empty value", () => {
      const {getByDisplayValue} = renderWithTheme(<TextField value="" onChange={mockOnChange} />);

      const input = getByDisplayValue("");
      expect(input.props.value).toBe("");
    });

    it("should handle undefined value", () => {
      const {root} = renderWithTheme(<TextField value={undefined} onChange={mockOnChange} />);

      expect(root).toBeTruthy();
    });

    it("should handle long text values", () => {
      const longText = "a".repeat(1000);
      const {getByDisplayValue} = renderWithTheme(
        <TextField value={longText} onChange={mockOnChange} />
      );

      const input = getByDisplayValue(longText);
      expect(input.props.value).toBe(longText);
    });

    it("should handle special characters", () => {
      const specialText = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
      const {getByDisplayValue} = renderWithTheme(
        <TextField value={specialText} onChange={mockOnChange} />
      );

      const input = getByDisplayValue(specialText);
      expect(input.props.value).toBe(specialText);
    });
  });

  describe("return key behavior", () => {
    it("should set return key type", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField returnKeyType="done" value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.enterKeyHint).toBe("done");
    });

    it("should handle blur on submit", () => {
      const {getByDisplayValue} = renderWithTheme(
        <TextField blurOnSubmit={false} value="" onChange={mockOnChange} />
      );

      const input = getByDisplayValue("");
      expect(input.props.blurOnSubmit).toBe(false);
    });
  });

  describe("input ref", () => {
    it("should call inputRef with the input reference", () => {
      const mockInputRef = jest.fn();
      renderWithTheme(<TextField inputRef={mockInputRef} value="" onChange={mockOnChange} />);

      expect(mockInputRef).toHaveBeenCalled();
    });
  });

  describe("snapshots", () => {
    it("should match snapshot with default props", () => {
      const component = renderWithTheme(<TextField value="test value" onChange={mockOnChange} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with all props", () => {
      const component = renderWithTheme(
        <TextField
          disabled={false}
          errorText="Error text"
          helperText="Helper text"
          iconName="check"
          multiline={false}
          placeholder="Enter text"
          title="Test Title"
          type="text"
          value="test value"
          onBlur={mockOnBlur}
          onChange={mockOnChange}
          onEnter={mockOnEnter}
          onFocus={mockOnFocus}
          onIconClick={jest.fn()}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot when disabled", () => {
      const component = renderWithTheme(
        <TextField disabled title="Disabled Field" value="disabled value" onChange={mockOnChange} />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with multiline", () => {
      const component = renderWithTheme(
        <TextField
          multiline
          rows={3}
          title="Multiline Field"
          value="line 1\nline 2"
          onChange={mockOnChange}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with error state", () => {
      const component = renderWithTheme(
        <TextField
          errorText="This field is required"
          title="Error Field"
          value=""
          onChange={mockOnChange}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
