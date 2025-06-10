process.env.TZ = "America/New_York";

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

jest.mock("./Icon", () => ({
  Icon: jest.fn().mockImplementation(() => null),
}));

// Mock DateTimeActionSheet
jest.mock("./DateTimeActionSheet", () => ({
  DateTimeActionSheet: jest.fn().mockImplementation(() => null),
}));

// Mock MediaQuery
jest.mock("./MediaQuery", () => ({
  isMobileDevice: jest.fn().mockReturnValue(false),
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
