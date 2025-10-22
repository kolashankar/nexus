import { useState, useEffect, useCallback } from 'react';
import { worldService } from '@/services/api/worldService';

interface Territory {
  territory_id: number;
  name: string;
  description: string;
  region: string;
  status: string;
  controlling_guild_id: string | null;
  controlling_guild_name: string | null;
  contested: boolean;
  [key: string]: any;
}

interface UseTerritoriesReturn {
  territories: Territory[];
  contested: Territory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getTerritoryById: (id: number) => Territory | undefined;
}

/**
 * Custom hook for managing territories
 */
export const useTerritories = (): UseTerritoriesReturn => {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [contested, setContested] = useState<Territory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTerritories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [allTerritories, contestedTerritories] = await Promise.all([
        worldService.getAllTerritories(),
        worldService.getContestedTerritories()
      ]);

      setTerritories(allTerritories.territories);
      setContested(contestedTerritories.territories);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch territories');
      console.error('Error fetching territories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTerritories();

    // Poll for updates every 2 minutes
    const interval = setInterval(fetchTerritories, 120000);

    return () => clearInterval(interval);
  }, [fetchTerritories]);

  const getTerritoryById = useCallback((id: number) => {
    return territories.find(t => t.territory_id === id);
  }, [territories]);

  return {
    territories,
    contested,
    loading,
    error,
    refetch: fetchTerritories,
    getTerritoryById
  };
};
