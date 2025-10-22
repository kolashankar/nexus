import { useState, useEffect } from 'react';
import skillTreesService from '../services/skillTrees/skillTreesService';
import type { PlayerSkillTrees, SkillTree } from '../types/skillTrees';

export const useSkillTrees = () => {
  const [skillTrees, setSkillTrees] = useState<PlayerSkillTrees | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSkillTrees = async () => {
    try {
      setLoading(true);
      const data = await skillTreesService.getSkillTrees();
      setSkillTrees(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillTrees();
  }, []);

  const unlockNode = async (traitName: string, nodeId: number) => {
    try {
      await skillTreesService.unlockNode({ trait_name: traitName, node_id: nodeId });
      await fetchSkillTrees();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const chooseBranch = async (traitName: string, branch: 'A' | 'B') => {
    try {
      await skillTreesService.chooseBranch({ trait_name: traitName, branch });
      await fetchSkillTrees();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return {
    skillTrees,
    loading,
    error,
    refetch: fetchSkillTrees,
    unlockNode,
    chooseBranch,
  };
};
