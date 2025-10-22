import apiClient from '../api/client';
import type {
  PlayerPrestige,
  PrestigeEligibility,
  PrestigeReward,
} from '../../types/prestige';

class PrestigeService {
  /**
   * Get prestige information for the current player
   */
  async getPrestige(): Promise<PlayerPrestige> {
    const response = await apiClient.get('/player/prestige');
    return response.data;
  }

  /**
   * Get current prestige benefits
   */
  async getPrestigeBenefits(): Promise<any> {
    const response = await apiClient.get('/player/prestige/benefits');
    return response.data;
  }

  /**
   * Check if player can prestige
   */
  async checkPrestigeEligibility(): Promise<PrestigeEligibility> {
    const response = await apiClient.get('/player/prestige/eligibility');
    return response.data;
  }

  /**
   * Perform prestige reset
   */
  async performPrestige(): Promise<any> {
    const response = await apiClient.post('/player/prestige/perform');
    return response.data;
  }

  /**
   * Get all prestige rewards
   */
  async getPrestigeRewards(): Promise<Record<number, PrestigeReward>> {
    const response = await apiClient.get('/player/prestige/rewards');
    return response.data.rewards;
  }

  /**
   * Get rewards for a specific prestige level
   */
  async getPrestigeReward(level: number): Promise<PrestigeReward> {
    const response = await apiClient.get(`/player/prestige/rewards/${level}`);
    return response.data;
  }

  /**
   * Get prestige history
   */
  async getPrestigeHistory(): Promise<any> {
    const response = await apiClient.get('/player/prestige/history');
    return response.data;
  }
}

export default new PrestigeService();
