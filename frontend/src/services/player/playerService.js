import apiClient from '../api/client';

class PlayerService {
  async getProfile() {
    const response = await apiClient.get('/player/profile');
    return response.data;
  }

  async getTraits() {
    const response = await apiClient.get('/player/traits');
    return response.data;
  }

  async updateProfile(data) {
    const response = await apiClient.put('/player/profile', data);
    return response.data;
  }

  async getStats() {
    const response = await apiClient.get('/player/stats');
    return response.data;
  }
}

export default new PlayerService();
