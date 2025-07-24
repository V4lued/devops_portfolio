require('@testing-library/jest-dom');

// Polyfill ResizeObserver for ReactFlow and other components
// eslint-disable-next-line
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  // The following methods are intentionally empty for Jest testing environment
  // eslint-disable-next-line no-empty-function
  window.ResizeObserver = class {
    observe() {}      // Intentionally empty for test polyfill
    unobserve() {}    // Intentionally empty for test polyfill
    disconnect() {}   // Intentionally empty for test polyfill
  };
}

// Clear all timers after each test to prevent leaks
afterEach(() => {
  jest.clearAllTimers();
}); 