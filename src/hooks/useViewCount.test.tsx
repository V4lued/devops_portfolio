import { renderHook, waitFor } from '@testing-library/react';
import { useViewCount } from './useViewCount';

// Mock fetch
global.fetch = jest.fn();

describe('useViewCount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useViewCount());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.viewCount).toBe(0);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful API response', async () => {
    const mockResponse = { viewCount: 42 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useViewCount());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.viewCount).toBe(42);
    expect(result.current.error).toBe(null);
  });

  it('should fallback to localStorage when API fails', async () => {
    localStorage.setItem('portfolioViews', '15');
    
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useViewCount());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.viewCount).toBe(15);
    expect(result.current.error).toBe('Using local view count');
  });

  it('should handle API error response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useViewCount());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.viewCount).toBe(0);
    expect(result.current.error).toBe('Using local view count');
  });
}); 