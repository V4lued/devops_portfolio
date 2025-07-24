import { render } from '@testing-library/react';
import PipelineVisualizer from './PipelineVisualizer';
 
describe('PipelineVisualizer', () => {
  it('renders without crashing', () => {
    render(<PipelineVisualizer />);
  });
}); 