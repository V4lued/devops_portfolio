import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Section', () => {
  it('renders the About Me heading', () => {
    render(<About />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  it('renders DevOps description', () => {
    render(<About />);
    expect(screen.getByText(/A passionate DevOps engineer/i)).toBeInTheDocument();
  });

  it('renders timeline items', () => {
    render(<About />);
    expect(screen.getByText(/2023 - DevOps Practice Mastery/i)).toBeInTheDocument();
    expect(screen.getByText(/Current - Education/i)).toBeInTheDocument();
  });
}); 