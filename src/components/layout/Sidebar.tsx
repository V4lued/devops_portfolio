import React from 'react';
import styled from 'styled-components';

const SidebarStyled = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background: var(--light-surface);
  padding: 1rem;
  display: none; /* Show on mobile or as needed */
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarStyled>
      <nav>
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        {/* Similar links */}
      </nav>
    </SidebarStyled>
  );
};

export default Sidebar; 