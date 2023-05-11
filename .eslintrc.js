/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: true }],
    curly: [2, "all"],
    "eol-last": ["error", "always"],
    "id-length": "off",
    "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "block-like" },
      { blankLine: "always", prev: "block-like", next: "*" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "never", prev: ["case", "default"], next: "*" },
      { blankLine: "always", prev: "block-like", next: ["case", "default"] },
      { blankLine: "always", prev: "*", next: "return" },
      {
        blankLine: "always",
        prev: "*",
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "require-await": "error",
    "security/detect-object-injection": "off",
    "sort-keys": "off",
    "no-shadow": "off",

    "react/no-multi-comp": "warn",
    "react-hooks/rules-of-hooks": "error",

    "no-unused-expressions": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsForRegex: ["^ref"],
      },
    ],
    // TS makes this rule obsolete
    "jest/prefer-expect-assertions": "off",
    // Switch off old and renamed rules (prev to version 25 of eslint-plugin-jest)
    // Avoids eslint complaints
    // TODO: review when updated to version 25
    "jest/lowercase-name": "off",
    "jest/no-truthy-falsy": "off",
    "jest/no-try-expect": "off",
    "jest/prefer-to-be-null": "off",
    "jest/prefer-to-be-undefined": "off",
    "jest/valid-describe": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module",
  },
};
