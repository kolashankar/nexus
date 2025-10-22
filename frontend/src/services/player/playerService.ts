import apiClient from '../api/client';

export interface PlayerProfile {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  prestige_level: number;
  economic_class: string;
  moral_class: string;
  currencies: {
    credits: number;
    karma_tokens: number;
    dark_matter: number;
    prestige_points: number;
    guild_coins: number;
    legacy_shards: number;
  };
  karma_points: number;
  traits: Record<string, number>;
  meta_traits: Record<string, number>;
  visibility: any;
  stats: any;
  online: boolean;
  last_login?: string;
}

export interface PlayerStats {
  id: string;
  username: string;
  level: number;
  xp: number;
  stats: any;
  total_karma: number;
  rank?: number;
}

class PlayerService {
  async getMyProfile(): Promise<PlayerProfile> {
    const response = await apiClient.get('/api/player/profile');
    return response.data;
  }

  async updateProfile(updates: Partial<PlayerProfile>): Promise<PlayerProfile> {
    const response = await apiClient.put('/api/player/profile', updates);
    return response.data;
  }

  async getPlayerProfile(playerId: string): Promise<any> {
    const response = await apiClient.get(`/api/player/profile/${playerId}`);
    return response.data;
  }

  async getPlayerStats(): Promise<PlayerStats> {
    const response = await apiClient.get('/api/player/stats');
    return response.data;
  }

  async getCurrencies(): Promise<any> {
    const response = await apiClient.get('/api/player/currencies');
    return response.data;
  }

  async getNearbyPlayers(limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/api/player/nearby?limit=${limit}`);
    return response.data;
  }
}

export default new PlayerService();