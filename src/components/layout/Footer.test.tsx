import { render } from '@testing-library/react';
import Footer from './Footer';
 
describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });
}); 