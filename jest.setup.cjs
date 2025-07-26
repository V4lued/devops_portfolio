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

// Global fetch mock for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ value: 0 }),
  })
);

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

// Suppress console errors from useViewCount hook in tests
const originalError = console.error;
console.error = (...args) => {
  // Suppress useViewCount error messages in tests
  if (args.length > 0 && typeof args[0] === 'string' && 
      (args[0].includes('Error incrementing view count') || 
       args[0].includes('Error fetching view count') ||
       args[0].includes('Error in checkAndIncrementView'))) {
    return;
  }
  // Suppress React act() warnings
  if (args.length > 0 && typeof args[0] === 'string' && 
      args[0].includes('Warning: An update to TestComponent inside a test was not wrapped in act(...)')) {
    return;
  }
  originalError(...args);
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