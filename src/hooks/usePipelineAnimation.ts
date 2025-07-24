import { useAnimation } from 'framer-motion';

export const usePipelineAnimation = () => {
  const controls = useAnimation();

  const startAnimation = async (status: 'success' | 'error' | 'warning') => {
    await controls.start({
      borderColor: status === 'success' ? '#2ECC40' : status === 'error' ? '#FF4136' : '#FFDC00',
      transition: { duration: 0.5 },
    });
  };

  return { controls, startAnimation };
}; 