import { apiClient } from '../api/client';

export const skillTreesService = {
  async getSkillTrees() {
    const response = await apiClient.get('/api/player/skill-trees');
    return response.data;
  },

  async getTraitSkillTree(traitName: string) {
    const response = await apiClient.get(`/api/player/skill-trees/${traitName}`);
    return response.data;
  },

  async unlockNode(traitName: string, nodeId: number) {
    const response = await apiClient.post('/api/player/skill-trees/unlock', {
      trait_name: traitName,
      node_id: nodeId
    });
    return response.data;
  }
};
