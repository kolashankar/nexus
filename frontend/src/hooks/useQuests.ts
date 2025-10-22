import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';

interface Quest {
  _id: string;
  title: string;
  description: string;
  quest_type: string;
  status: string;
  objectives: any[];
  rewards: any;
}

export const useQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchQuests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();
      
      // Separate quests by status
      const available = data.quests?.filter((q: Quest) => q.status === 'available') || [];
      const active = data.quests?.filter((q: Quest) => q.status === 'active') || [];
      const completed = data.quests?.filter((q: Quest) => q.status === 'completed') || [];

      setQuests(available);
      setActiveQuests(active);
      setCompletedQuests(completed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        title: 'Error',
        description: 'Failed to fetch quests',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const acceptQuest = useCallback(async (questId: string) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quest_id: questId })
      });

      if (!response.ok) {
        throw new Error('Failed to accept quest');
      }

      toast({
        title: 'Quest Accepted',
        description: 'The quest has been added to your quest log'
      });

      // Refresh quests
      await fetchQuests();
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to accept quest',
        variant: 'destructive'
      });
      return false;
    }
  }, [fetchQuests, toast]);

  const abandonQuest = useCallback(async (questId: string) => {
    try {
      const response = await fetch('/api/quests/abandon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quest_id: questId })
      });

      if (!response.ok) {
        throw new Error('Failed to abandon quest');
      }

      toast({
        title: 'Quest Abandoned',
        description: 'The quest has been removed from your quest log'
      });

      // Refresh quests
      await fetchQuests();
      return true;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to abandon quest',
        variant: 'destructive'
      });
      return false;
    }
  }, [fetchQuests, toast]);

  const getQuestById = useCallback((questId: string): Quest | undefined => {
    return [
      ...quests,
      ...activeQuests,
      ...completedQuests
    ].find(q => q._id === questId);
  }, [quests, activeQuests, completedQuests]);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  return {
    quests,
    activeQuests,
    completedQuests,
    loading,
    error,
    fetchQuests,
    acceptQuest,
    abandonQuest,
    getQuestById
  };
};
