const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  testMatch: ['**/__tests__/**/?(*.)+(e2e).[jt]s?(x)'],
};
