module.exports = {
  ...require("./jest.config.js"),
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/main/**/*.ts",
    "<rootDir>/src/infra/gateways/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/infra/database/**/*.ts"
  ]
};
