import React from 'react';
import styled from 'styled-components';

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background: var(--light-surface);
  color: var(--pipeline-cyan);
  border-radius: 6px;
  padding: 8px 16px;
  margin: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: var(--pipeline-cyan);
    color: var(--dark-background);
  }
`;

interface SkillBadgeProps {
  skill: string;
  onClick: () => void;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, onClick }) => {
  return <Badge onClick={onClick}>{skill}</Badge>;
};

export default SkillBadge; 