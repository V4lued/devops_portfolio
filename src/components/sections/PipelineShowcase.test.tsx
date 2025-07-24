import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PipelineShowcase from './PipelineShowcase';

describe('PipelineShowcase', () => {
  it('renders the CI/CD Pipeline Showcase title', () => {
    render(<PipelineShowcase />);
    expect(screen.getByText(/CI\/CD Pipeline Showcase/i)).toBeInTheDocument();
  });

  it('renders all pipeline stages', () => {
    render(<PipelineShowcase />);
    const stages = [
      'Source Control',
      'Build',
      'Test',
      'Security Scan',
      'Artifact Store',
      'Deploy Staging',
      'E2E Tests',
      'Deploy Production',
      'Monitor',
    ];
    stages.forEach(stage => {
      expect(screen.getByText(stage)).toBeInTheDocument();
    });
  });

  it('simulates pipeline run and shows running status', async () => {
    render(<PipelineShowcase />);
    const button = screen.getByRole('button', { name: /simulate pipeline/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/Running:/i)).toBeInTheDocument();
    });
  });
}); 