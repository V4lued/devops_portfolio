import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  background: var(--light-surface);
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const SocialLinks = styled.div`
  margin-top: 0.5rem;
  a {
    margin: 0 0.5rem;
    color: var(--pipeline-cyan);
    text-decoration: none;
  }
`;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <FooterStyled>
      <p>&copy; {year} Severino's DevOps Portfolio. All rights reserved.</p>
      <SocialLinks>
        <a href="mailto:cgdseverino@gmail.com">Email</a> | 
        <a href="https://github.com/V4lued" target="_blank" rel="noopener noreferrer"> GitHub</a> |  
        <a href="https://www.linkedin.com/in/cyrusseverino/" target="_blank" rel="noopener noreferrer">  LinkedIn</a>
      </SocialLinks>
    </FooterStyled>
  );
};

export default Footer; 