import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Section', () => {
  it('renders the name', () => {
    render(<Hero />);
    expect(screen.getByText(/Cyrus Severino/i)).toBeInTheDocument();
  });

  it('renders the role', () => {
    render(<Hero />);
    expect(screen.getByText(/Aspiring DevOps Engineer/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Hero />);
    expect(screen.getByText(/Automating the Future of Software Delivery/i)).toBeInTheDocument();
  });
}); 