/* craco.config.js */
const jestConfig = require('./jest.config');

module.exports = {
  jest: {
    configure: () => {
      // console.log(jestConfig);
      return jestConfig;
    },
  },
};
