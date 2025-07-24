import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from './Projects';

describe('Projects Section', () => {
  it('renders the Featured Project heading', () => {
    render(<Projects />);
    expect(screen.getByText(/Featured Project/i)).toBeInTheDocument();
  });

  it('renders the Technology Stack', () => {
    render(<Projects />);
    expect(screen.getByText(/Technology Stack/i)).toBeInTheDocument();
  });
}); 