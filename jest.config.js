module.exports = {
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/main/**/*.ts",
    "!<rootDir>/src/infra/database/**/*.ts"
  ],
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1"
  },
  testMatch: ["**/*.test.ts"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "\\.ts$": "ts-jest"
  }
};
