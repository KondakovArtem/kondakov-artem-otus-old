/* craco.config.js */
const jestConfig = require('./jest.config');

module.exports = {
  jest: {
    configure: () => {
      return jestConfig;
    },
  },
};
