import apiClient from '../api/client';
import type {
  PlayerLegacy,
  LegacySummary,
  LegacyPerk,
  LegacyTitle,
  HeirloomItem,
  NewCharacterBonuses,
} from '../../types/legacy';

class LegacyService {
  /**
   * Get legacy information for the current account
   */
  async getLegacy(): Promise<PlayerLegacy> {
    const response = await apiClient.get('/player/legacy');
    return response.data;
  }

  /**
   * Get legacy system summary
   */
  async getLegacySummary(): Promise<LegacySummary> {
    const response = await apiClient.get('/player/legacy/summary');
    return response.data;
  }

  /**
   * Get all available legacy perks
   */
  async getAvailablePerks(): Promise<LegacyPerk[]> {
    const response = await apiClient.get('/player/legacy/perks');
    return response.data.perks;
  }

  /**
   * Get unlocked perks
   */
  async getUnlockedPerks(): Promise<LegacyPerk[]> {
    const response = await apiClient.get('/player/legacy/perks/unlocked');
    return response.data.unlocked_perks;
  }

  /**
   * Get active perks
   */
  async getActivePerks(): Promise<string[]> {
    const response = await apiClient.get('/player/legacy/perks/active');
    return response.data.active_perks;
  }

  /**
   * Unlock a legacy perk
   */
  async unlockPerk(perkId: string): Promise<any> {
    const response = await apiClient.post('/player/legacy/perks/unlock', { perk_id: perkId });
    return response.data;
  }

  /**
   * Activate a legacy perk
   */
  async activatePerk(perkId: string): Promise<any> {
    const response = await apiClient.post('/player/legacy/perks/activate', { perk_id: perkId });
    return response.data;
  }

  /**
   * Deactivate a legacy perk
   */
  async deactivatePerk(perkId: string): Promise<any> {
    const response = await apiClient.post(`/player/legacy/perks/deactivate/${perkId}`);
    return response.data;
  }

  /**
   * Earn legacy points
   */
  async earnLegacyPoints(amount: number, source: string): Promise<any> {
    const response = await apiClient.post('/player/legacy/points/earn', { amount, source });
    return response.data;
  }

  /**
   * Get legacy titles
   */
  async getLegacyTitles(): Promise<LegacyTitle[]> {
    const response = await apiClient.get('/player/legacy/titles');
    return response.data.titles;
  }

  /**
   * Activate a legacy title
   */
  async activateTitle(titleId: string): Promise<any> {
    const response = await apiClient.post(`/player/legacy/titles/activate/${titleId}`);
    return response.data;
  }

  /**
   * Get heirloom items
   */
  async getHeirlooms(): Promise<HeirloomItem[]> {
    const response = await apiClient.get('/player/legacy/heirlooms');
    return response.data.heirlooms;
  }

  /**
   * Get mentorship statistics
   */
  async getMentorshipStats(): Promise<any> {
    const response = await apiClient.get('/player/legacy/mentorship');
    return response.data;
  }

  /**
   * Get bonuses that apply to new characters
   */
  async getNewCharacterBonuses(): Promise<NewCharacterBonuses> {
    const response = await apiClient.get('/player/legacy/new-character-bonuses');
    return response.data.bonuses;
  }
}

export default new LegacyService();
