import { apiClient } from '../api/client';

export const privacyService = {
  async getPrivacySettings() {
    const response = await apiClient.get('/api/player/privacy/settings');
    return response.data;
  },

  async updatePrivacySettings(settings: any) {
    const response = await apiClient.put('/api/player/privacy/settings', settings);
    return response.data;
  },

  async changePrivacyTier(tier: string) {
    const response = await apiClient.post('/api/player/privacy/tier', { tier });
    return response.data;
  }
};
