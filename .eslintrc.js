module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/no-deprecated-filter": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    sourceType: "module",
  },

  env: {
    es6: true,
  },
  parser: "babel-eslint",
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
