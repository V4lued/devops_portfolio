import { useEffect } from 'react';

export const useKeyboardNav = () => {
  useEffect(() => {
    const handleKeyDown = () => {
      // Keyboard shortcuts can be added here in the future if needed
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}; 