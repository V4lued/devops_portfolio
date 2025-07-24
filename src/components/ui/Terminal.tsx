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

const Terminal: React.FC = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBackspacing, setIsBackspacing] = useState(false);

  useEffect(() => {
    const currentCommand = commands[currentCommandIndex];
    let i = 0;
    let typeTimer: ReturnType<typeof setInterval>;
    let backspaceTimer: ReturnType<typeof setInterval>;
    let nextCommandTimer: ReturnType<typeof setTimeout>;
    let backspaceDelay: ReturnType<typeof setTimeout>;
    
    // Reset state
    setDisplayedText('');
    setIsTyping(false);
    setIsBackspacing(false);

    // Small delay before starting to type
    const startDelay = setTimeout(() => {
      setIsTyping(true);
      
      typeTimer = setInterval(() => {
        if (i < currentCommand.length) {
          setDisplayedText(currentCommand.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
          
          // Wait 2 seconds before starting backspace
          backspaceDelay = setTimeout(() => {
            setIsBackspacing(true);
            let j = currentCommand.length;
            
            backspaceTimer = setInterval(() => {
              if (j > 0) {
                j--;
                setDisplayedText(currentCommand.slice(0, j));
              } else {
                clearInterval(backspaceTimer);
                setIsBackspacing(false);
                
                // Wait 300ms before switching to next command
                nextCommandTimer = setTimeout(() => {
                  setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
                }, 300);
              }
            }, 50); // Faster backspace speed
          }, 2000);
        }
      }, 75); // Smoother typing speed
    }, 500); // 500ms delay before starting

    return () => {
      clearTimeout(startDelay);
      clearInterval(typeTimer);
      clearInterval(backspaceTimer);
      clearTimeout(nextCommandTimer);
      clearTimeout(backspaceDelay);
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
        {(isTyping || isBackspacing) && (
          <motion.span 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ 
              repeat: Infinity, 
              duration: isBackspacing ? 0.6 : 0.8,
              ease: "easeInOut"
            }}
          >
            |
          </motion.span>
        )}
      </motion.div>
    </TerminalWindow>
  );
};

export default Terminal; 