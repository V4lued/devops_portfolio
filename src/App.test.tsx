import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main sections', () => {
    render(<App />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Skills/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Featured Project/i)).toBeInTheDocument();
    expect(screen.getByText(/CI\/CD Pipeline Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });
}); 