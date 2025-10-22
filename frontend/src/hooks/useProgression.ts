import { useState, useEffect, useCallback } from 'react';
import { progressionService } from '@/services/progression/progressionService';

interface ProgressionData {
  level: number;
  xp: number;
  xpForNext: number;
  prestigeLevel: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  skillTreeProgress: Record<string, number>;
  superpowersUnlocked: number;
}

export const useProgression = () => {
  const [progression, setProgression] = useState<ProgressionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgression = useCallback(async () => {
    try {
      setLoading(true);
      const data = await progressionService.getProgressionData();
      setProgression(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progression');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgression();
  }, [fetchProgression]);

  const gainXP = useCallback(async (amount: number) => {
    try {
      const result = await progressionService.gainXP(amount);
      setProgression(prev => prev ? { ...prev, xp: result.newXP, level: result.newLevel } : null);
      return result;
    } catch (err) {
      throw err;
    }
  }, []);

  const unlockSkillNode = useCallback(async (trait: string, nodeId: number) => {
    try {
      await progressionService.unlockSkillNode(trait, nodeId);
      await fetchProgression();
    } catch (err) {
      throw err;
    }
  }, [fetchProgression]);

  const activateSuperpower = useCallback(async (powerId: string) => {
    try {
      const result = await progressionService.activateSuperpower(powerId);
      return result;
    } catch (err) {
      throw err;
    }
  }, []);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    try {
      const result = await progressionService.unlockAchievement(achievementId);
      setProgression(prev => prev ? { ...prev, achievementsUnlocked: prev.achievementsUnlocked + 1 } : null);
      return result;
    } catch (err) {
      throw err;
    }
  }, []);

  const prestige = useCallback(async () => {
    try {
      const result = await progressionService.prestige();
      await fetchProgression();
      return result;
    } catch (err) {
      throw err;
    }
  }, [fetchProgression]);

  return {
    progression,
    loading,
    error,
    gainXP,
    unlockSkillNode,
    activateSuperpower,
    unlockAchievement,
    prestige,
    refetch: fetchProgression
  };
};
