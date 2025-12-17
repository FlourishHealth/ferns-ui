module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|expo-modules-core|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)",
  ],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/jestSetup.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  moduleNameMapper: {
    "^@expo/vector-icons$": "<rootDir>/__mocks__/vector-icons.js",
    "^expo-modules-core/src/Refs$": "<rootDir>/__mocks__/expo-modules-core/src/Refs.ts",
    "^expo-modules-core/src/web/index.web$":
      "<rootDir>/__mocks__/expo-modules-core/src/web/index.web.ts",
    "^expo-modules-core/src/uuid/uuid.web$":
      "<rootDir>/__mocks__/expo-modules-core/src/uuid/uuid.web.ts",
  },
};
