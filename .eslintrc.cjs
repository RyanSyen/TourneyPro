module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "simple-import-sort", "jsx-a11y"],
  rules: {
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    // increase the severity of rules so they are auto-fixable
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/jsx-pascal-case": [
      "error",
      {
        allowAllCaps: false,
        allowNamespace: false,
        allowLeadingUnderscore: false,
      },
    ],
    "react/jsx-closing-bracket-location": [
      "error",
      {
        nonEmpty: "tag-aligned",
        selfClosing: "tag-aligned",
      },
    ],
    "react/jsx-closing-tag-location": ["error"],
    "no-multi-spaces": "error",
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "allow",
      },
    ],
    "react/jsx-curly-spacing": ["error", "never"], // Enforce no spaces inside curly braces
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/img-redundant-alt": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/no-access-key": "error",
    "react/no-array-index-key": "error",
    "react/jsx-wrap-multilines": "error",
    "react/self-closing-comp": "error",
    // "react/jsx-no-bind": "error", // enable when performance becomes an issue
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
  },
};
