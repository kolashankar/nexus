import { useState, useEffect, useCallback } from 'react';
import { worldService } from '@/services/api/worldService';

interface WorldEvent {
  event_id: string;
  event_type: string;
  name: string;
  description: string;
  severity: string;
  [key: string]: any;
}

interface UseWorldEventsReturn {
  activeEvent: WorldEvent | null;
  recentEvents: WorldEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing world events
 */
export const useWorldEvents = (): UseWorldEventsReturn => {
  const [activeEvent, setActiveEvent] = useState<WorldEvent | null>(null);
  const [recentEvents, setRecentEvents] = useState<WorldEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [active, recent] = await Promise.all([
        worldService.getActiveEvent(),
        worldService.getRecentEvents(10)
      ]);

      setActiveEvent(active);
      setRecentEvents(recent.events);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch world events');
      console.error('Error fetching world events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchEvents, 30000);

    return () => clearInterval(interval);
  }, [fetchEvents]);

  return {
    activeEvent,
    recentEvents,
    loading,
    error,
    refetch: fetchEvents
  };
};
