import { apiClient } from '../api/client';

export const superpowersService = {
  async getSuperpowers() {
    const response = await apiClient.get('/api/player/superpowers');
    return response.data;
  },

  async getAvailableSuperpowers() {
    const response = await apiClient.get('/api/player/superpowers/available');
    return response.data;
  },

  async unlockSuperpower(powerName: string) {
    const response = await apiClient.post(`/api/player/superpowers/unlock/${powerName}`);
    return response.data;
  },

  async activateSuperpower(powerName: string) {
    const response = await apiClient.post(`/api/player/superpowers/activate/${powerName}`);
    return response.data;
  }
};
