import { useState, useEffect, useCallback } from 'react';
import tournamentsService from '../services/tournaments/tournamentsService';
import { Tournament } from '../types/combat';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTournaments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await tournamentsService.getActiveTournaments();
      setTournaments(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load tournaments');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForTournament = useCallback(async (tournamentId: string, playerId: string) => {
    try {
      await tournamentsService.registerForTournament(tournamentId, playerId);
      await loadTournaments();
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      throw err;
    }
  }, [loadTournaments]);

  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);

  return {
    tournaments,
    loading,
    error,
    registerForTournament,
    reload: loadTournaments
  };
};
