import { useState, useEffect } from 'react';
import { questService, Quest } from '../services/questService';

export const useQuests = () => {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const [active, available] = await Promise.all([
        questService.getActiveQuests(),
        questService.getAvailableQuests()
      ]);
      setActiveQuests(active);
      setAvailableQuests(available);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const acceptQuest = async (questId: string) => {
    try {
      await questService.acceptQuest(questId);
      await fetchQuests();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to accept quest' };
    }
  };

  const completeQuest = async (questId: string) => {
    try {
      const result = await questService.completeQuest(questId);
      await fetchQuests();
      return { success: true, rewards: result.rewards };
    } catch (err) {
      return { success: false, error: 'Failed to complete quest' };
    }
  };

  const abandonQuest = async (questId: string) => {
    try {
      await questService.abandonQuest(questId);
      await fetchQuests();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to abandon quest' };
    }
  };

  return {
    activeQuests,
    availableQuests,
    loading,
    error,
    acceptQuest,
    completeQuest,
    abandonQuest,
    refreshQuests: fetchQuests
  };
};
