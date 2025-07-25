import React, { useState, useEffect, useMemo } from 'react';
import './styles/globals.css';
import './styles/variables.css';
import './styles/pipeline.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import PipelineShowcase from './components/sections/PipelineShowcase';
import Contact from './components/sections/Contact';
// import { useDarkMode } from './hooks/useDarkMode';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { FaGit, FaCogs, FaVial, FaRocket, FaChartBar } from 'react-icons/fa';

const BackgroundWrapper = styled(motion.svg)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.25;
  z-index: -1;
  pointer-events: none;
`;

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

const Preloader = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PipelineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const PipelineStage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
  
  @media (max-width: 768px) {
    min-width: 80px;
  }
`;

const StageIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 3px solid var(--disabled-meta);
  background: var(--light-surface);
  color: var(--disabled-meta);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const StageLabel = styled(motion.span)`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PipelineConnector = styled(motion.div)`
  width: 40px;
  height: 4px;
  background: var(--disabled-meta);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoadingMessage = styled(motion.div)`
  font-size: 1.5rem;
  color: var(--pipeline-cyan);
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader if not shown in this session
    return sessionStorage.getItem('preloaderShown') !== 'true';
  });
  const [currentStage, setCurrentStage] = useState(0);
  const [message, setMessage] = useState('Initializing DevOps Environment...');

  const stages = useMemo(() => [
    { icon: FaGit, label: 'Source', message: 'Connecting to repository...' },
    { icon: FaCogs, label: 'Build', message: 'Compiling application...' },
    { icon: FaVial, label: 'Test', message: 'Running test suites...' },
    { icon: FaRocket, label: 'Deploy', message: 'Deploying to staging...' },
    { icon: FaChartBar, label: 'Monitor', message: 'Setting up monitoring...' }
  ], []);

  useEffect(() => {
    if (!isLoading) return;
    const stageTimer: ReturnType<typeof setInterval> = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < stages.length - 1) {
          setMessage(stages[prev + 1].message);
          return prev + 1;
        } else {
          setMessage('Pipeline ready! 🚀');
          const finishTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('preloaderShown', 'true');
          }, 1000);
          if (typeof finishTimeout === 'object' && finishTimeout !== null && 'unref' in finishTimeout && typeof finishTimeout.unref === 'function') {
            finishTimeout.unref();
          }
          clearInterval(stageTimer);
          return prev;
        }
      });
    }, 800);
    if (typeof stageTimer === 'object' && stageTimer !== null && 'unref' in stageTimer && typeof stageTimer.unref === 'function') {
      stageTimer.unref();
    }
    return () => clearInterval(stageTimer);
  }, [isLoading, stages]);

  // useDarkMode();
  useKeyboardNav();

  return (
    <>
      <BackgroundWrapper viewBox="0 0 1920 1080" preserveAspectRatio="none">
        {/* Top pipelines and clouds (centered below header) */}
        <motion.path 
          d="M0 260 H1920" 
          stroke="var(--pipeline-cyan)" 
          strokeWidth="5" 
          fill="none" 
          strokeDasharray="10 10" 
        />
        <motion.g animate={{ x: [-200, 2020] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}>
          <ellipse cy="260" cx="0" rx="22" ry="18" fill="var(--pipeline-cyan)" />
          <ellipse cy="260" cx="20" rx="14" ry="12" fill="var(--pipeline-cyan)" />
          <ellipse cy="260" cx="-20" rx="14" ry="12" fill="var(--pipeline-cyan)" />
          <ellipse cy="260" cx="10" rx="8" ry="7" fill="var(--pipeline-cyan)" />
          <ellipse cy="260" cx="-10" rx="8" ry="7" fill="var(--pipeline-cyan)" />
        </motion.g>
        <motion.path 
          d="M0 320 H1920" 
          stroke="var(--success-green)" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray="30 10" 
        />
        <motion.g animate={{ x: [2020, -200] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <ellipse cy="320" cx="0" rx="22" ry="18" fill="var(--success-green)" />
          <ellipse cy="320" cx="20" rx="14" ry="12" fill="var(--success-green)" />
          <ellipse cy="320" cx="-20" rx="14" ry="12" fill="var(--success-green)" />
          <ellipse cy="320" cx="10" rx="8" ry="7" fill="var(--success-green)" />
          <ellipse cy="320" cx="-10" rx="8" ry="7" fill="var(--success-green)" />
        </motion.g>
        {/* Middle pipelines and clouds */}
        <motion.path 
          d="M0 580 H1920" 
          stroke="var(--warning-yellow)" 
          strokeWidth="5" 
          fill="none" 
          strokeDasharray="60 20" 
        />
        <motion.g animate={{ x: [-200, 2020] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
          <ellipse cy="580" cx="0" rx="22" ry="18" fill="var(--warning-yellow)" />
          <ellipse cy="580" cx="20" rx="14" ry="12" fill="var(--warning-yellow)" />
          <ellipse cy="580" cx="-20" rx="14" ry="12" fill="var(--warning-yellow)" />
          <ellipse cy="580" cx="10" rx="8" ry="7" fill="var(--warning-yellow)" />
          <ellipse cy="580" cx="-10" rx="8" ry="7" fill="var(--warning-yellow)" />
        </motion.g>
        <motion.path 
          d="M0 640 H1920" 
          stroke="var(--error-red)" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray="15 30" 
        />
        <motion.g animate={{ x: [2020, -200] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 4 }}>
          <ellipse cy="640" cx="0" rx="22" ry="18" fill="var(--error-red)" />
          <ellipse cy="640" cx="20" rx="14" ry="12" fill="var(--error-red)" />
          <ellipse cy="640" cx="-20" rx="14" ry="12" fill="var(--error-red)" />
          <ellipse cy="640" cx="10" rx="8" ry="7" fill="var(--error-red)" />
          <ellipse cy="640" cx="-10" rx="8" ry="7" fill="var(--error-red)" />
        </motion.g>
        {/* Bottom pipelines and clouds (matching top lines for neatness) */}
        <motion.path 
          d="M0 900 H1920" 
          stroke="var(--pipeline-cyan)" 
          strokeWidth="5" 
          fill="none" 
          strokeDasharray="10 10" 
        />
        <motion.g animate={{ x: [-200, 2020] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
          <ellipse cy="900" cx="0" rx="22" ry="18" fill="var(--pipeline-cyan)" />
          <ellipse cy="900" cx="20" rx="14" ry="12" fill="var(--pipeline-cyan)" />
          <ellipse cy="900" cx="-20" rx="14" ry="12" fill="var(--pipeline-cyan)" />
          <ellipse cy="900" cx="10" rx="8" ry="7" fill="var(--pipeline-cyan)" />
          <ellipse cy="900" cx="-10" rx="8" ry="7" fill="var(--pipeline-cyan)" />
        </motion.g>
        <motion.path 
          d="M0 960 H1920" 
          stroke="var(--success-green)" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray="30 10" 
        />
        <motion.g animate={{ x: [2020, -200] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
          <ellipse cy="960" cx="0" rx="22" ry="18" fill="var(--success-green)" />
          <ellipse cy="960" cx="20" rx="14" ry="12" fill="var(--success-green)" />
          <ellipse cy="960" cx="-20" rx="14" ry="12" fill="var(--success-green)" />
          <ellipse cy="960" cx="10" rx="8" ry="7" fill="var(--success-green)" />
          <ellipse cy="960" cx="-10" rx="8" ry="7" fill="var(--success-green)" />
        </motion.g>
      </BackgroundWrapper>
      <AnimatePresence>
        {isLoading && (
          <Preloader
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingMessage>
              {message}
            </LoadingMessage>
            
            <PipelineContainer>
              {stages.map((stage, index) => (
                <React.Fragment key={stage.label}>
                  <PipelineStage>
                    <StageIcon
                      animate={{
                        borderColor: index <= currentStage ? 'var(--success-green)' : 'var(--disabled-meta)',
                        background: index <= currentStage ? 'var(--success-green)' : 'var(--light-surface)',
                        color: index <= currentStage ? 'var(--white)' : 'var(--disabled-meta)',
                        scale: index === currentStage ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: index === currentStage ? 0.5 : 0.3,
                        repeat: index === currentStage ? Infinity : 0,
                        repeatType: 'reverse'
                      }}
                    >
                      <stage.icon />
                    </StageIcon>
                    <StageLabel
                      animate={{
                        color: index <= currentStage ? 'var(--success-green)' : 'var(--text-secondary)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stage.label}
                    </StageLabel>
                  </PipelineStage>
                  
                  {index < stages.length - 1 && (
                    <PipelineConnector
                      animate={{
                        background: index < currentStage ? 'var(--success-green)' : 'var(--disabled-meta)'
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </PipelineContainer>
          </Preloader>
        )}
      </AnimatePresence>
      <Header />
      <MainContainer className="container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <PipelineShowcase />
        <Contact />
      </MainContainer>
      <Footer />
    </>
  );
};

export default App;