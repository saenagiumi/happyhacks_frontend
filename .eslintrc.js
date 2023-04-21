module.exports = {
  extends: [
    // "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:react-hooks/recommended",
    // "plugin:jsx-a11y/recommended",
  ],
  plugins: ["sort-keys-custom-order", "simple-import-sort"],
  rules: {
    "no-undef": "error",
    quotes: ["error", "double"],
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/prop-types": "off",
    semi: ["error", "always"],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys-custom-order/object-keys": [
      "error",
      { orderedKeys: ["id", "name", "title"] },
    ],
    // For TS types sorting
    "sort-keys-custom-order/type-keys": [
      "error",
      { orderedKeys: ["id", "name", "title"] },
    ],
  },
  settings: {},
};
