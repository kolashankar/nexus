import apiClient from '../api/client';
import type {
  PlayerSkillTrees,
  SkillTree,
  SkillTreeSummary,
  UnlockNodeRequest,
  ChooseBranchRequest,
} from '../../types/skillTrees';

class SkillTreesService {
  /**
   * Get all skill trees for the current player
   */
  async getSkillTrees(): Promise<PlayerSkillTrees> {
    const response = await apiClient.get('/player/skill-trees');
    return response.data;
  }

  /**
   * Get skill tree summary
   */
  async getSkillTreeSummary(): Promise<SkillTreeSummary> {
    const response = await apiClient.get('/player/skill-trees/summary');
    return response.data;
  }

  /**
   * Get a specific skill tree
   */
  async getSkillTree(traitName: string): Promise<SkillTree> {
    const response = await apiClient.get(`/player/skill-trees/${traitName}`);
    return response.data;
  }

  /**
   * Unlock a skill node
   */
  async unlockNode(request: UnlockNodeRequest): Promise<any> {
    const response = await apiClient.post('/player/skill-trees/unlock-node', request);
    return response.data;
  }

  /**
   * Choose a branch path (A or B)
   */
  async chooseBranch(request: ChooseBranchRequest): Promise<any> {
    const response = await apiClient.post('/player/skill-trees/choose-branch', request);
    return response.data;
  }

  /**
   * Calculate synergy bonuses
   */
  async calculateSynergies(): Promise<Record<string, number>> {
    const response = await apiClient.get('/player/skill-trees/synergies/calculate');
    return response.data.synergies;
  }
}

export default new SkillTreesService();
