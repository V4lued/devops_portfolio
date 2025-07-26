import { useState, useEffect } from 'react';

interface ViewCountResponse {
  viewCount: number;
}

const API_BASE_URL = 'http://localhost:3001'; // Simplified for testing, originally used import.meta.env

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
      setError('Failed to fetch view count');
      setViewCount(0);
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
      setError('Failed to increment view count');
      setViewCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if this is a new visit and increment if needed
  const checkAndIncrementView = async () => {
    await incrementViewCount();
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