import React from 'react';
import styled from 'styled-components';
import PipelineVisualizer from '../ui/PipelineVisualizer';
// Removed: import { motion } from 'framer-motion';

const HeroSection = styled.section`
  padding: 7rem 2rem 5.5rem 2rem;
  text-align: center;
  background: var(--light-surface);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5.5rem 1rem 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 0.5rem 2.5rem 0.5rem;
  }
`;

const ProfileWrapper = styled.div`
  width: 180px;
  height: 180px;
  padding: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pipeline-cyan) 60%, var(--light-surface) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  user-select: none;
  pointer-events: none;
  border: 2.5px solid var(--pipeline-cyan);

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    margin-bottom: 0.8rem;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 28px rgba(0,0,0,0.22);
  user-select: none;
  pointer-events: none;
`;

const Name = styled.h2`
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--white);
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  user-select: none;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-top: 0.6rem;
  }
`;

const Role = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--pipeline-cyan);
  margin-bottom: 1.2rem;
  user-select: none;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: var(--secondary-text);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 0.2rem;
  }
`;

const VisualizerWrapper = styled.div`
  /* Remove opacity: 0; */
  position: relative;
  z-index: 1;
  margin: 0 auto;
  height: 220px;
  width: 100%;
  @media (min-width: 900px) {
    height: 240px;
  }

  @media (max-width: 768px) {
    height: 180px;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    height: 160px;
    margin-top: 0.5rem;
  }
`;

const GlassCard = styled.div`
  background: rgba(35, 39, 42, 0.85);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
  border: 1px solid rgba(57, 204, 204, 0.2);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 340px;
  max-width: 440px;
  width: 100%;
  @media (min-width: 900px) {
    min-width: 400px;
    max-width: 520px;
    width: 420px;
  }

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 100%;
    width: 100%;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    padding: 1.5rem 1rem 1rem 1rem;
    margin-bottom: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    border-radius: 24px 24px 0 0;

    @media (max-width: 768px) {
      border-radius: 16px 16px 0 0;
    }
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);

    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
  }
`;

const HeroFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: stretch;
    gap: 4rem;
    justify-content: center;
    height: 100%;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TaglineBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  @media (min-width: 900px) {
    align-items: center;
    justify-content: center;
    min-width: 350px;
    height: auto;
    flex: 1;
    text-align: center;
  }

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero" style={{ position: 'relative' }}>
      <HeroFlex>
        <GlassCard>
          <ProfileWrapper>
            <ProfileImage src="/profile.jpg" alt="Profile" />
          </ProfileWrapper>
          <Name>Cyrus Severino</Name>
          <Role>Aspiring DevOps Engineer</Role>
        </GlassCard>
        <TaglineBlock>
          <Title>
            Automating the Future of Software Delivery
          </Title>
          <Subtitle>
            Explore my DevOps expertise through interactive pipelines and projects
          </Subtitle>
        </TaglineBlock>
      </HeroFlex>
      <VisualizerWrapper>
        <PipelineVisualizer />
      </VisualizerWrapper>
    </HeroSection>
  );
};

export default Hero; 