process.env.TZ = "America/New_York";
process.env.EXPO_OS = "ios";

// Create mocks for libraries that cause issues with testing
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("react-native-signature-canvas", () => ({
  Signature: jest.fn().mockImplementation(() => null),
}));

// Mock components that cause testing issues.
jest.mock("./IconButton", () => ({
  IconButton: jest.fn().mockImplementation(() => null),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockImplementation(() => true),
  loadNativeFonts: jest.fn().mockImplementation(() => Promise.resolve()),
  loadAsync: jest.fn().mockImplementation(() => Promise.resolve()),
}));

// jest.mock("./Icon", () => ({
//   Icon: ({name}: {name: string}) => ({
//     props: {testID: name},
//     type: "View",
//   }),
// }));

// Mock DateTimeActionSheet
jest.mock("./DateTimeActionSheet", () => ({
  DateTimeActionSheet: jest.fn().mockImplementation(() => null),
}));

// Mock MediaQuery
jest.mock("./MediaQuery", () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
}));

// Mock @expo/vector-icons/FontAwesome6
// interface IconProps {
//   name: string;
//   [key: string]: unknown;
// }

// jest.mock("@expo/vector-icons/FontAwesome6", () => ({
//   __esModule: true,
//   default: jest.fn(({name, ...props}: IconProps) =>
//     React.createElement(View, {testID: name, ...props})
//   ),
// }));

// Mock expo-image-manipulator
jest.mock("expo-image-manipulator", () => ({
  ImageManipulator: {
    manipulateAsync: jest.fn(),
  },
  SaveFormat: {
    PNG: "png",
    JPEG: "jpeg",
  },
}));

// Mock expo-image-picker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: {
    Images: "images",
  },
}));

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock expo-clipboard
jest.mock("expo-clipboard", () => ({
  getStringAsync: jest.fn().mockResolvedValue(""),
  setStringAsync: jest.fn().mockResolvedValue(undefined),
  hasStringAsync: jest.fn().mockResolvedValue(false),
}));

// Make sure we can test date/time functionality
global.Date.now = jest.fn(() => new Date("2023-05-15T10:30:00.000Z").getTime());

// Mock expo-localization
jest.mock("expo-localization", () => ({
  getCalendars: jest.fn().mockReturnValue([
    {
      id: "gregorian",
      calendar: "gregorian",
      locale: "en-US",
      timeZone: "America/New_York",
    },
  ]),
  getLocales: jest.fn().mockReturnValue([
    {
      languageCode: "en",
      countryCode: "US",
      textDirection: "ltr",
      digitGroupingSeparator: ",",
      decimalSeparator: ".",
      measurementSystem: "US",
      uses24hourClock: false,
      usesMetricSystem: false,
      temperatureUnit: "F",
    },
  ]),
  timezone: "America/New_York",
  isRTL: false,
  locale: "en-US",
  locales: ["en-US"],
}));

export {};
