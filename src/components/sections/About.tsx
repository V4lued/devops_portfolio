import React from 'react';
import styled from 'styled-components';
import Terminal from '../ui/Terminal';

const AboutSection = styled.section`
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.5rem;
  }
  
  p {
    text-align: justify;

    @media (max-width: 768px) {
      text-align: justify;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
  }
`;

const TimelineItem = styled.li`
  margin-bottom: 2rem;
  position: relative;
  padding-left: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    padding-left: 1.2rem;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: var(--pipeline-cyan);

    @media (max-width: 768px) {
      width: 0.8rem;
      height: 0.8rem;
      top: 0.4rem;
    }

    @media (max-width: 480px) {
      width: 0.6rem;
      height: 0.6rem;
      top: 0.3rem;
    }
  }

  h3 {
    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }
  }

  p {
    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

const About: React.FC = () => {
  return (
    <AboutSection id="about">
      <h2 style={{ color: 'var(--pipeline-cyan)', textAlign: 'center' }}>About Me</h2>
      <p>A passionate DevOps engineer and student from Polytechnic University of the Philippines who loves making software development faster and more reliable. I'm focused on learning how to automate repetitive tasks and build systems that catch problems early. My goal is to create workflows where developers can ship code quickly and confidently, knowing that everything will work properly in production. I specialize in setting up automated testing, deployment pipelines, and monitoring tools that make development processes more efficient.</p>
      <Terminal />
      <Timeline>
        <TimelineItem>
          <h3>2023 - DevOps Practice Mastery</h3>
          <p>Immersed myself deeply into DevOps methodologies and practices, mastering essential tools including Jenkins for continuous integration, Docker for containerization, Kubernetes for orchestration, Terraform for infrastructure as code, and comprehensive monitoring solutions. Developed expertise in creating automated deployment pipelines and implementing best practices for secure, scalable software delivery.</p>
        </TimelineItem>
        <TimelineItem>
          <h3>Current - Education</h3>
          <p>Student at Polytechnic University of the Philippines, combining academic knowledge with hands-on DevOps practice. Bridging theoretical computer science concepts with real-world automation and infrastructure management skills.</p>
        </TimelineItem>
      </Timeline>
    </AboutSection>
  );
};

export default About; 