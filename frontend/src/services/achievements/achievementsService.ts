import apiClient from '../api/client';
import type {
  PlayerAchievements,
  AchievementDefinition,
  AchievementSummary,
  AchievementCategory,
  AchievementRarity,
} from '../../types/achievements';

class AchievementsService {
  /**
   * Get all achievements for the current player
   */
  async getAchievements(): Promise<PlayerAchievements> {
    const response = await apiClient.get('/achievements');
    return response.data;
  }

  /**
   * Get achievement summary
   */
  async getAchievementSummary(): Promise<AchievementSummary> {
    const response = await apiClient.get('/achievements/summary');
    return response.data;
  }

  /**
   * Get unlocked achievements
   */
  async getUnlockedAchievements(): Promise<any[]> {
    const response = await apiClient.get('/achievements/unlocked');
    return response.data.unlocked;
  }

  /**
   * Get achievement progress
   */
  async getAchievementProgress(): Promise<Record<string, any>> {
    const response = await apiClient.get('/achievements/progress');
    return response.data.progress;
  }

  /**
   * Get achievement definitions with optional filters
   */
  async getAchievementDefinitions(
    category?: AchievementCategory,
    rarity?: AchievementRarity
  ): Promise<AchievementDefinition[]> {
    let url = '/achievements/definitions';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (rarity) params.append('rarity', rarity);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await apiClient.get(url);
    return response.data.achievements;
  }

  /**
   * Get a specific achievement definition
   */
  async getAchievementDefinition(achievementId: string): Promise<AchievementDefinition> {
    const response = await apiClient.get(`/achievements/definitions/${achievementId}`);
    return response.data;
  }

  /**
   * Get achievements by category
   */
  async getAchievementsByCategory(category: AchievementCategory): Promise<any> {
    const response = await apiClient.get(`/achievements/category/${category}`);
    return response.data;
  }

  /**
   * Unlock an achievement (usually called by system)
   */
  async unlockAchievement(achievementId: string): Promise<any> {
    const response = await apiClient.post(`/achievements/unlock/${achievementId}`);
    return response.data;
  }

  /**
   * Update progress towards an achievement
   */
  async updateAchievementProgress(achievementId: string, progressAmount: number): Promise<any> {
    const response = await apiClient.post('/achievements/progress/update', {
      achievement_id: achievementId,
      progress_amount: progressAmount,
    });
    return response.data;
  }

  /**
   * Get recently unlocked achievements
   */
  async getRecentUnlocks(): Promise<any[]> {
    const response = await apiClient.get('/achievements/recent');
    return response.data.recent;
  }
}

export default new AchievementsService();
