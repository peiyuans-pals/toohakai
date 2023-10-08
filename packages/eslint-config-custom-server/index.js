module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "turbo",
    "prettier"
  ],
  env: {
    node: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    //   ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    // forbid usage of unused variables (marked with an _)
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["parameter", "variable"],
        leadingUnderscore: "forbid",
        format: null
      },
      {
        selector: "parameter",
        leadingUnderscore: "require",
        format: null,
        modifiers: ["unused"]
      }
    ],
    "@typescript-eslint/no-explicit-any": 1
  }
};
