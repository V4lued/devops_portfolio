import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TerminalWindow = styled.div`
  background: var(--dark-background);
  color: var(--pipeline-cyan);;
  font-family: 'JetBrains Mono', monospace;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  max-width: 600px;
  margin: 2rem auto;
`;

const commands = [
  'kubectl get pods',
  'docker ps -a',
  'terraform plan',
  'ansible-playbook deploy.yml',
  'git status',
  'jenkins build --job pipeline',
  'helm list',
  'docker build -t app:latest .',
  'terraform apply',
  'kubectl describe deployment'
];

// Cursor component for blinking effect
function BlinkingCursor({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  return (
    <motion.span 
      animate={{ opacity: [0, 1, 0] }} 
      transition={{ 
        repeat: Infinity, 
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      |
    </motion.span>
  );
}

// Typing effect logic
function startTyping({
  currentCommand,
  setDisplayedText,
  setIsTyping,
  setIsBackspacing,
  setCurrentCommandIndex,
  commands
}: any) {
  let i = 0;
  setIsTyping(true);
  const typeTimer = setInterval(() => {
    if (i < currentCommand.length) {
      setDisplayedText(currentCommand.slice(0, i + 1));
      i++;
    } else {
      clearInterval(typeTimer);
      setIsTyping(false);
      startBackspacing({
        currentCommand,
        setDisplayedText,
        setIsBackspacing,
        setCurrentCommandIndex,
        commands
      });
    }
  }, 75);
  return typeTimer;
}

function startBackspacing({
  currentCommand,
  setDisplayedText,
  setIsBackspacing,
  setCurrentCommandIndex,
  commands
}: any) {
  setTimeout(() => {
    setIsBackspacing(true);
    let j = currentCommand.length;
    const backspaceTimer = setInterval(() => {
      if (j > 0) {
        j--;
        setDisplayedText(currentCommand.slice(0, j));
      } else {
        clearInterval(backspaceTimer);
        setIsBackspacing(false);
        setTimeout(() => {
          setCurrentCommandIndex((prev: number) => (prev + 1) % commands.length);
        }, 300);
      }
    }, 50);
  }, 2000);
}

const Terminal: React.FC = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBackspacing, setIsBackspacing] = useState(false);

  useEffect(() => {
    const currentCommand = commands[currentCommandIndex];
    setDisplayedText('');
    setIsTyping(false);
    setIsBackspacing(false);
    const startDelay = setTimeout(() => {
      startTyping({
        currentCommand,
        setDisplayedText,
        setIsTyping,
        setIsBackspacing,
        setCurrentCommandIndex,
        commands
      });
    }, 500);
    return () => {
      clearTimeout(startDelay);
    };
  }, [currentCommandIndex]);

  return (
    <TerminalWindow>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        $ {displayedText}
        <BlinkingCursor isActive={isTyping || isBackspacing} />
      </motion.div>
    </TerminalWindow>
  );
};

export default Terminal; 