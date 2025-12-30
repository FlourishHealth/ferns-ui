import {act, fireEvent} from "@testing-library/react-native";
// import {ImageManipulator} from "expo-image-manipulator";
// Import the actual implementation for SaveFormat
import * as ImageManipulator from "expo-image-manipulator";
import React from "react";

import {Avatar} from "./Avatar";
import {renderWithTheme} from "./test-utils";

// Mock expo-image-picker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));

// Mock expo-image-manipulator
const mockResize = jest.fn();
const mockRenderAsync = jest.fn();
const mockSaveAsync = jest.fn();

jest.mock("expo-image-manipulator", () => {
  return {
    ImageManipulator: {
      manipulate: jest.fn().mockImplementation(() => ({
        resize: mockResize.mockImplementation(() => ({
          renderAsync: mockRenderAsync.mockResolvedValue({
            saveAsync: mockSaveAsync.mockResolvedValue({
              uri: "test-uri",
              base64: "test-base64",
            }),
          }),
        })),
      })),
    },
    SaveFormat: {
      PNG: "png",
      JPEG: "jpeg",
    },
  };
});

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [
      {
        uri: "test-uri",
        width: 100,
        height: 100,
      },
    ],
  }),
}));

// Mock the LinearGradient component
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

describe("Avatar", () => {
  const defaultProps = {
    name: "John Doe",
    src: "https://example.com/avatar.jpg",
    testID: "avatar",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const {toJSON} = renderWithTheme(<Avatar {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders initials when no image is provided", () => {
    const {getByText} = renderWithTheme(<Avatar name="John Doe" testID="avatar" />);
    expect(getByText("JD")).toBeTruthy();
  });

  it("renders image when src is provided", () => {
    const {getByTestId} = renderWithTheme(<Avatar {...defaultProps} />);
    const image = getByTestId("avatar-image");
    expect(image).toBeTruthy();
  });

  it("shows initials when image fails to load", () => {
    const {getByText, getByTestId} = renderWithTheme(<Avatar {...defaultProps} name="John Doe" />);

    // Simulate image load error
    fireEvent(getByTestId("avatar-image"), "onError");

    expect(getByText("JD")).toBeTruthy();
  });

  it("applies correct size class", () => {
    const size = "lg";
    const {getByTestId} = renderWithTheme(<Avatar {...defaultProps} size={size} />);
    const avatar = getByTestId("avatar-image");
    // Check if the style contains the expected size
    expect(avatar.props.style).toMatchObject({
      height: 72, // lg size from the sizes object
    });
  });

  it("shows status indicator when status is provided", () => {
    const {getByTestId} = renderWithTheme(<Avatar {...defaultProps} status="online" />);
    expect(getByTestId("status-indicator")).toBeTruthy();
  });

  it("shows edit icon when status is imagePicker and size is xl", () => {
    const {getByText} = renderWithTheme(
      <Avatar {...defaultProps} size="xl" status="imagePicker" />
    );
    expect(getByText("Upload Image")).toBeTruthy();
  });

  it("calls onChange when edit icon is pressed", async () => {
    const mockOnChange = jest.fn();
    const {getByText} = renderWithTheme(
      <Avatar {...defaultProps} size="xl" status="imagePicker" onChange={mockOnChange} />
    );

    await act(async () => {
      fireEvent.press(getByText("Upload Image"));
    });

    // The onChange should be called with the processed image
    expect(mockOnChange).toHaveBeenCalledWith({
      avatarImageFormat: "png",
      uri: "data:image/png;base64,test-base64",
      base64: "test-base64",
    });
    expect(ImageManipulator.ImageManipulator.manipulate).toHaveBeenCalled();
    expect(mockResize).toHaveBeenCalled();
    expect(mockRenderAsync).toHaveBeenCalled();
    expect(mockSaveAsync).toHaveBeenCalledWith({
      format: "png",
      base64: true,
    });
  });

  it("applies border when hasBorder is true", () => {
    const {getByTestId} = renderWithTheme(<Avatar {...defaultProps} hasBorder />);
    const avatar = getByTestId("avatar-image");
    // Check if the style contains border properties
    expect(avatar.props.style).toMatchObject({
      borderWidth: expect.any(Number),
      borderColor: expect.any(String),
    });
  });

  it("shows warning when imagePicker status is used with non-xl size", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    renderWithTheme(<Avatar {...defaultProps} size="lg" status="imagePicker" />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Avatars with the status of 'imagePicker' should also have an onChange property."
    );
    consoleWarnSpy.mockRestore();
  });
});
