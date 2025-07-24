import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SkillBadge from './SkillBadge';

describe('SkillBadge', () => {
  it('renders the skill label', () => {
    render(<SkillBadge skill="Docker" onClick={() => {}} />);
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
  });
}); 