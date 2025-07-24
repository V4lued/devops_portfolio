require('@testing-library/jest-dom');

// Polyfill ResizeObserver for ReactFlow and other components
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
} 