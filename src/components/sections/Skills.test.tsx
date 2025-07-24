import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';

describe('Skills Section', () => {
  it('renders the Skills heading', () => {
    render(<Skills />);
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
  });

  it('renders a badge for at least one skill', () => {
    render(<Skills />);
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
  });
}); 