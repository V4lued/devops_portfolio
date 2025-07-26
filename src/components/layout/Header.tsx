import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaBars, FaTimes } from 'react-icons/fa';
import { useViewCount } from '../../hooks/useViewCount';
// import ThemeToggle from '../ui/ThemeToggle';

const Logo = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--pipeline-cyan);
  letter-spacing: 1px;
  text-decoration: none;
  margin-right: 2.5rem;
  transition: color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BlinkingCursor = styled.span`
  color: var(--pipeline-cyan);
  animation: blink 1.2s infinite;
  
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }
`;

const ViewCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.75rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  
  @media (max-width: 768px) {
    margin-left: 0.5rem;
    font-size: 0.75rem;
  }
`;

const EyeIcon = styled(FaEye)`
  color: var(--pipeline-cyan);
  font-size: 0.9rem;
`;

const ViewNumber = styled.span`
  color: var(--pipeline-cyan);
  font-weight: 600;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--light-surface);
  padding: 0.7rem 2rem 0.7rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  z-index: 1000;
  border-bottom: 1.5px solid rgba(57,204,204,0.10);

  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
  }

  /* Subtle gradient accent */
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    opacity: 0.18;
    pointer-events: none;
  }
`;

const Nav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  gap: 2.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--light-surface);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    border-top: 1px solid rgba(57, 204, 204, 0.2);
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
    z-index: 999;
  }

  a {
    color: var(--primary-text);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.08rem;
    letter-spacing: 0.5px;
    position: relative;
    padding: 0.2rem 0;
    transition: color 0.2s;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(57, 204, 204, 0.1);
    }
  }

  a:hover {
    color: var(--pipeline-cyan);
  }

  a::after {
    content: '';
    display: block;
    position: absolute;
    left: 0; right: 0; bottom: -2px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 0.2s, transform 0.2s;

    @media (max-width: 768px) {
      display: none;
    }
  }

  a:hover::after {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--pipeline-cyan);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: var(--white);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const { viewCount, isLoading, error } = useViewCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollTop - headerHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      closeMobileMenu(); // Close mobile menu after navigation
    }
  };

  return (
    <HeaderStyled>
      <LeftSection>
        <Logo href="#hero" onClick={e => handleNavClick(e, '#hero')}>
          SevOps
          <BlinkingCursor>|</BlinkingCursor>
        </Logo>
        <ViewCounter>
          <EyeIcon />
          <ViewNumber>
            {isLoading ? '...' : viewCount.toLocaleString()}
            {error && <span style={{ fontSize: '0.7rem', opacity: 0.7 }}> (local)</span>}
          </ViewNumber>
        </ViewCounter>
      </LeftSection>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <Nav $isOpen={isMobileMenuOpen}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </Nav>
      {/* <ThemeToggle /> */}
    </HeaderStyled>
  );
};

export default Header; 