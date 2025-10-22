import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface Tournament {
  tournament_id: string;
  name: string;
  description: string;
  tournament_type: string;
  status: string;
  registration_start: string;
  registration_end: string;
  start_time: string;
  end_time?: string;
  max_participants: number;
  min_participants: number;
  min_level?: number;
  min_karma?: number;
  entry_fee: number;
  total_registered: number;
  prize_pool: number;
  current_round: number;
  total_rounds: number;
}

interface UseTournamentsReturn {
  tournaments: Tournament[];
  loading: boolean;
  error: string | null;
  fetchActiveTournaments: () => Promise<void>;
  fetchTournament: (id: string) => Promise<Tournament | null>;
  registerForTournament: (id: string) => Promise<any>;
  getMyTournaments: () => Promise<Tournament[]>;
}

export const useTournaments = (): UseTournamentsReturn => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveTournaments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/tournaments/active`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTournaments(response.data);
    } catch (err: any) {
      console.error('Error fetching tournaments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTournament = async (id: string): Promise<Tournament | null> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/tournaments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err: any) {
      console.error('Error fetching tournament:', err);
      return null;
    }
  };

  const registerForTournament = async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/tournaments/register`,
      { tournament_id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  const getMyTournaments = async (): Promise<Tournament[]> => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/tournaments/my/tournaments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err: any) {
      console.error('Error fetching my tournaments:', err);
      return [];
    }
  };

  return {
    tournaments,
    loading,
    error,
    fetchActiveTournaments,
    fetchTournament,
    registerForTournament,
    getMyTournaments
  };
};
