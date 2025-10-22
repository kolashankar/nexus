import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface LeaderboardEntry {
  rank: number;
  player_id: string;
  username: string;
  value: number;
  level?: number;
  guild_name?: string;
  title?: string;
  change_24h?: number;
}

interface Leaderboard {
  leaderboard_type: string;
  entries: LeaderboardEntry[];
  total_entries: number;
  last_updated?: string;
  season_id?: string;
}

interface PlayerRank {
  player_id: string;
  username: string;
  leaderboard_type: string;
  rank: number;
  value: number;
  percentile: number;
  total_players: number;
  change_24h?: number;
}

interface UseLeaderboardsReturn {
  leaderboards: Record<string, Leaderboard>;
  myRanks: Record<string, PlayerRank>;
  loading: boolean;
  error: string | null;
  fetchLeaderboard: (type: string, limit?: number) => Promise<void>;
  fetchMyRank: (type: string) => Promise<void>;
}

export const useLeaderboards = (): UseLeaderboardsReturn => {
  const [leaderboards, setLeaderboards] = useState<Record<string, Leaderboard>>({});
  const [myRanks, setMyRanks] = useState<Record<string, PlayerRank>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async (type: string, limit: number = 50) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/leaderboards/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { limit }
      });
      
      setLeaderboards(prev => ({
        ...prev,
        [type]: response.data
      }));
    } catch (err: any) {
      console.error(`Error fetching ${type} leaderboard:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRank = async (type: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/leaderboards/my-rank/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setMyRanks(prev => ({
        ...prev,
        [type]: response.data
      }));
    } catch (err: any) {
      console.error(`Error fetching my rank for ${type}:`, err);
      // Don't set error here as it's not critical
    }
  };

  return {
    leaderboards,
    myRanks,
    loading,
    error,
    fetchLeaderboard,
    fetchMyRank
  };
};
