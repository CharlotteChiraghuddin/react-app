module.exports = {
    // Use the built-in jsdom environment for Jest 27
    testEnvironment: 'jsdom',
  
    // Specify paths to setup files
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
    // Automatically clear mocks between tests
    clearMocks: true,
  };
  