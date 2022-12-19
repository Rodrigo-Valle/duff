module.exports = {
  ...require("./jest.config.js"),
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/infra/database/**/*.ts"
  ]
};
