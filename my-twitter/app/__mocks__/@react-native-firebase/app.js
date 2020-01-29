export default {
  app: jest.fn(() => ({
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    setCurrentScreen: jest.fn(),
    logEvent: jest.fn(),
  })),
};
