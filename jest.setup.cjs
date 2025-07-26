require('@testing-library/jest-dom');

// Mock CSS imports
jest.mock('reactflow/dist/style.css', () => ({}));
jest.mock('./src/styles/globals.css', () => ({}));
jest.mock('./src/styles/variables.css', () => ({}));
jest.mock('./src/styles/pipeline.css', () => ({}));

// Mock ReactFlow CSS specifically
jest.mock('reactflow/dist/style.css', () => ({}), { virtual: true });

// Mock environment variables for tests
process.env.VITE_API_URL = 'http://localhost:3001';

// Suppress console warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
  // Suppress specific warnings that are expected in tests
  if (typeof args[0] === 'string' && (
    args[0].includes('Failed to increment view count on server') ||
    args[0].includes('You are trying to animate')
  )) {
    return;
  }
  originalWarn(...args);
};

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