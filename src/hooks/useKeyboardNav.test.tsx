import React from 'react';
import { render } from '@testing-library/react';
import { useKeyboardNav } from './useKeyboardNav';

describe('useKeyboardNav', () => {
  it('can be used in a component', () => {
    function TestComponent() {
      useKeyboardNav();
      return <div>Test</div>;
    }
    render(<TestComponent />);
  });
}); 