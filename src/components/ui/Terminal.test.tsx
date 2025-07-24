import { render } from '@testing-library/react';
import Terminal from './Terminal';
 
describe('Terminal', () => {
  it('renders without crashing', () => {
    render(<Terminal />);
  });
}); 