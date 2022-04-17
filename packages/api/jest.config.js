const esModules = ["@sentry"].join("|");

module.exports = {
  roots: ["<rootDir>/src"],
  verbose: true,
  maxWorkers: 8,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/jestSetupFile.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",

  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testPathIgnorePatterns: ["<rootDir>/web", "<rootDir>/dist"],
  // moduleNameMapper: {
  //   "firebase-admin": "<rootDir>/__mocks__/firebaseMock.ts",
  // },
};
