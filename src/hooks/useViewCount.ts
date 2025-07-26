import { useState, useEffect } from 'react';

interface ViewCountResponse {
  viewCount: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useViewCount = () => {
  const [viewCount, setViewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current view count from server
  const fetchViewCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/viewCount`);
      if (!response.ok) {
        throw new Error('Failed to fetch view count');
      }
      const data: ViewCountResponse = await response.json();
      setViewCount(data.viewCount);
      setError(null);
    } catch {
      console.warn('Failed to fetch view count from server, using localStorage fallback');
      setError('Using local view count');
      // Fallback to localStorage
      const localCount = parseInt(localStorage.getItem('portfolioViews') || '0', 10);
      setViewCount(localCount);
    } finally {
      setIsLoading(false);
    }
  };

  // Increment view count on server
  const incrementViewCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/viewCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }
      
      const data: ViewCountResponse = await response.json();
      setViewCount(data.viewCount);
      setError(null);
    } catch {
      console.warn('Failed to increment view count on server, using localStorage fallback');
      setError('Using local view count');
      // Fallback to localStorage logic
      const lastVisit = localStorage.getItem('portfolioLastVisit');
      const currentTime = Date.now();
      const visitThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
      
      const currentViews = parseInt(localStorage.getItem('portfolioViews') || '0', 10);
      
      if (!lastVisit || (currentTime - parseInt(lastVisit, 10)) > visitThreshold) {
        const newViewCount = currentViews + 1;
        localStorage.setItem('portfolioViews', newViewCount.toString());
        localStorage.setItem('portfolioLastVisit', currentTime.toString());
        setViewCount(newViewCount);
      }
    }
  };

  // Check if this is a new visit and increment if needed
  const checkAndIncrementView = async () => {
    const lastVisit = localStorage.getItem('portfolioLastVisit');
    const currentTime = Date.now();
    const visitThreshold = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // Check if it's a new visit (no previous visit or last visit was more than 1 hour ago)
    if (!lastVisit || (currentTime - parseInt(lastVisit, 10)) > visitThreshold) {
      await incrementViewCount();
    } else {
      // Just fetch the current count
      await fetchViewCount();
    }
  };

  useEffect(() => {
    checkAndIncrementView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    viewCount,
    isLoading,
    error,
    refetch: fetchViewCount,
  };
}; 