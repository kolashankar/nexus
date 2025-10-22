import { useState, useEffect, useCallback } from 'react';
import { worldService } from '@/services/api/worldService';

interface WorldState {
  collective_karma: number;
  average_karma: number;
  karma_trend: string;
  total_players: number;
  online_players: number;
  total_actions_24h?: number;
  positive_actions_24h?: number;
  negative_actions_24h?: number;
  [key: string]: any;
}

interface UseWorldStateReturn {
  worldState: WorldState | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing world state
 */
export const useWorldState = (): UseWorldStateReturn => {
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorldState = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const state = await worldService.getWorldState();
      setWorldState(state);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch world state');
      console.error('Error fetching world state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorldState();

    // Poll for updates every 60 seconds
    const interval = setInterval(fetchWorldState, 60000);

    return () => clearInterval(interval);
  }, [fetchWorldState]);

  return {
    worldState,
    loading,
    error,
    refetch: fetchWorldState
  };
};
