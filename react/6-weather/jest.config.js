// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/internals/jest/settings.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      compiler: "ttypescript"
    }
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    "/node_modules/(?!lodash-es).+\\.js$"
  ]
};
