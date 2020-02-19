const path = require('path');

const esModules = ['lodash-es'].join('|');

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFiles: [path.resolve(__dirname, 'node_modules/react-app-polyfill/jsdom.js'), '<rootDir>/config.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '.(ts|tsx)': 'ts-jest',
    '^.+\\.(js|jsx)$': path.resolve(__dirname, 'node_modules/react-scripts/config/jest/babelTransform.js'),
    '^.+\\.css$': path.resolve(__dirname, 'node_modules/react-scripts/config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': path.resolve(
      __dirname,
      'node_modules/react-scripts/config/jest/fileTransform.js',
    ),
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  modulePaths: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  clearMocks: true,
};
