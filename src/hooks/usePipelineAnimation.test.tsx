import React from 'react';
import { render } from '@testing-library/react';
import { usePipelineAnimation } from './usePipelineAnimation';

describe('usePipelineAnimation', () => {
  it('can be used in a component', () => {
    function TestComponent() {
      usePipelineAnimation();
      return <div>Test</div>;
    }
    render(<TestComponent />);
  });
}); 