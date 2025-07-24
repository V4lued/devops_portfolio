import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact Section', () => {
  it('renders the contact section', () => {
    render(<Contact />);
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('renders the form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
  });
}); 