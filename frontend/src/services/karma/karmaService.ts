import { apiClient } from '../api/client';

export const karmaService = {
  async getKarmaScore() {
    const response = await apiClient.get('/api/karma/score');
    return response.data;
  },

  async getKarmaHistory(limit: number = 50) {
    const response = await apiClient.get(`/api/karma/history?limit=${limit}`);
    return response.data;
  },

  async getKarmaEvents() {
    const response = await apiClient.get('/api/karma/events');
    return response.data;
  },

  async getWorldState() {
    const response = await apiClient.get('/api/karma/world-state');
    return response.data;
  },

  async getCollectiveKarma() {
    const response = await apiClient.get('/api/karma/collective');
    return response.data;
  }
};
