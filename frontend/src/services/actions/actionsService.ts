import { apiClient } from '../api/client';

export const actionsService = {
  async hack(targetId: string) {
    const response = await apiClient.post('/api/actions/hack', { target_id: targetId });
    return response.data;
  },

  async help(targetId: string) {
    const response = await apiClient.post('/api/actions/help', { target_id: targetId });
    return response.data;
  },

  async steal(targetId: string) {
    const response = await apiClient.post('/api/actions/steal', { target_id: targetId });
    return response.data;
  },

  async donate(targetId: string, amount: number) {
    const response = await apiClient.post('/api/actions/donate', {
      target_id: targetId,
      amount
    });
    return response.data;
  },

  async trade(targetId: string, offer: any, request: any) {
    const response = await apiClient.post('/api/actions/trade', {
      target_id: targetId,
      offer,
      request
    });
    return response.data;
  },

  async getHistory() {
    const response = await apiClient.get('/api/actions/history');
    return response.data;
  },

  async getRecent() {
    const response = await apiClient.get('/api/actions/recent');
    return response.data;
  }
};
