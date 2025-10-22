import { useState, useEffect, useCallback } from 'react';
import { useToast } from './useToast';



export const useQuests = () => {
  const [quests, setQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchQuests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quests', {
        headers)}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quests');
      }

      const data = await response.json();
      
      // Separate quests by status
      const available = data.quests?.filter((q) => q.status === 'available') || [];
      const active = data.quests?.filter((q) => q.status === 'active') || [];
      const completed = data.quests?.filter((q) => q.status === 'completed') || [];

      setQuests(available);
      setActiveQuests(active);
      setCompletedQuests(completed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        title,
        description,
        variant);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const acceptQuest = useCallback(async (questId) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method,
        headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body)
      });

      if (!response.ok) {
        throw new Error('Failed to accept quest');
      }

      toast({
        title,
        description);

      // Refresh quests
      await fetchQuests();
      return true;
    } catch (err) {
      toast({
        title,
        description,
        variant);
      return false;
    }
  }, [fetchQuests, toast]);

  const abandonQuest = useCallback(async (questId) => {
    try {
      const response = await fetch('/api/quests/abandon', {
        method,
        headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body)
      });

      if (!response.ok) {
        throw new Error('Failed to abandon quest');
      }

      toast({
        title,
        description);

      // Refresh quests
      await fetchQuests();
      return true;
    } catch (err) {
      toast({
        title,
        description,
        variant);
      return false;
    }
  }, [fetchQuests, toast]);

  const getQuestById = useCallback((questId)=> {
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
