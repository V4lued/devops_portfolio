import { renderHook, waitFor } from '@testing-library/react';
import { useViewCount } from './useViewCount';

// Mock fetch
(global.fetch as jest.Mock | undefined) = jest.fn();

// Increase timeout for this file
jest.setTimeout(15000);

type UseViewCountResult = ReturnType<typeof useViewCount>;

describe('useViewCount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // localStorage.clear(); // No longer needed
    (fetch as jest.Mock).mockReset();
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
      expect((result.current as UseViewCountResult).isLoading).toBe(false);
    }, { timeout: 10000 });

    expect((result.current as UseViewCountResult).viewCount).toBe(42);
    expect((result.current as UseViewCountResult).error).toBe(null);
  });

  it('should set error and viewCount=0 when API fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useViewCount());

    await waitFor(() => {
      expect((result.current as UseViewCountResult).isLoading).toBe(false);
    }, { timeout: 10000 });

    expect((result.current as UseViewCountResult).viewCount).toBe(0);
    expect((result.current as UseViewCountResult).error).toBe('Failed to increment view count');
  });

  it('should set error and viewCount=0 when API returns error response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useViewCount());

    await waitFor(() => {
      expect((result.current as UseViewCountResult).isLoading).toBe(false);
    }, { timeout: 10000 });

    expect((result.current as UseViewCountResult).viewCount).toBe(0);
    expect((result.current as UseViewCountResult).error).toBe('Failed to increment view count');
  });
}); 