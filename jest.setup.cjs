require('@testing-library/jest-dom');

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