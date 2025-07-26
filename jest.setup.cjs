require('@testing-library/jest-dom');

// Mock CSS imports
jest.mock('reactflow/dist/style.css', () => ({}));
jest.mock('./src/styles/globals.css', () => ({}));
jest.mock('./src/styles/variables.css', () => ({}));
jest.mock('./src/styles/pipeline.css', () => ({}));

// Mock environment variables for tests
process.env.VITE_API_URL = 'http://localhost:3001';

// Polyfill ResizeObserver for test environment
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

afterEach(() => {
  jest.clearAllTimers();
}); 