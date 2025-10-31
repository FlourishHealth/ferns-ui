module.exports = {
  extends: [
    "plugin:ferns/recommended",
    "plugin:react-native-a11y/all"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "ban"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react-native-a11y/has-valid-accessibility-descriptors": "off",
    "@typescript-eslint/consistent-type-definitions": [
      "error",
      "interface"
    ],
    "ban/ban": [
      "error",
      {
        name: [
          "dayjs",
          "*"
        ],
        message: "Use Luxon."
      },
      {
        name: [
          "moment",
          "*"
        ],
        message: "Use Luxon"
      },
      {
        name: [
          "React",
          "FC"
        ],
        message: "Use FC imported directly from React instead of React.FC"
      }
    ]
  }
};

