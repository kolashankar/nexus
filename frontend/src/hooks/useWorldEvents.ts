import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface WorldEvent {
  event_id: string;
  event_type: string;
  name: string;
  description: string;
  started_at: string;
  ends_at: string;
  effects: Record<string, any>;
  participants: number;
  is_active: boolean;
}

interface WorldState {
  collective_karma: number;
  karma_trend: 'rising' | 'falling' | 'stable';
  active_event: WorldEvent | null;
  online_players: number;
  total_players: number;
  current_season: number;
  season_start: string;
  season_end: string;
}

interface UseWorldEventsReturn {
  worldState: WorldState | null;
  activeEvents: WorldEvent[];
  loading: boolean;
  error: string | null;
  refreshWorldState: () => Promise<void>;
  refreshActiveEvents: () => Promise<void>;
}

export const useWorldEvents = (): UseWorldEventsReturn => {
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [activeEvents, setActiveEvents] = useState<WorldEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorldState = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/world/state`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorldState(response.data);
    } catch (err: any) {
      console.error('Error fetching world state:', err);
      setError(err.message);
    }
  };

  const fetchActiveEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/world/events`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setActiveEvents(response.data);
    } catch (err: any) {
      console.error('Error fetching active events:', err);
      setError(err.message);
    }
  };

  const refreshWorldState = async () => {
    setLoading(true);
    await fetchWorldState();
    setLoading(false);
  };

  const refreshActiveEvents = async () => {
    await fetchActiveEvents();
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchWorldState(),
        fetchActiveEvents()
      ]);
      setLoading(false);
    };

    loadData();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchWorldState();
      fetchActiveEvents();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    worldState,
    activeEvents,
    loading,
    error,
    refreshWorldState,
    refreshActiveEvents
  };
};
