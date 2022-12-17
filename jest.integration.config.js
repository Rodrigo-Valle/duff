module.exports = {
  ...require("./jest.config.js"),
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/main/**/*.ts",
    "!<rootDir>/src/main/**/index.ts",
    "!<rootDir>/src/infra/database/**/*.ts"
  ]
};
