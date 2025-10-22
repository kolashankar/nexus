import apiClient from '../api/client';
import { Guild, Territory, GuildWar, GuildRank } from '../../types/guilds';

class GuildsService {
  async createGuild(name: string, tag: string, description: string): Promise<{ success: boolean; guild: Guild }> {
    const response = await apiClient.post('/guilds', { name, tag, description });
    return response.data;
  }

  async listGuilds(skip: number = 0, limit: number = 20): Promise<Guild[]> {
    const response = await apiClient.get('/guilds', { params: { skip, limit } });
    return response.data;
  }

  async getGuild(guildId: string): Promise<Guild> {
    const response = await apiClient.get(`/guilds/${guildId}`);
    return response.data;
  }

  async joinGuild(guildId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/guilds/${guildId}/join`);
    return response.data;
  }

  async leaveGuild(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/guilds/leave');
    return response.data;
  }

  async getGuildMembers(guildId: string): Promise<any[]> {
    const response = await apiClient.get(`/guilds/${guildId}/members`);
    return response.data;
  }

  async kickMember(playerId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/guilds/management/kick', { player_id: playerId });
    return response.data;
  }

  async promoteMember(playerId: string, newRank: GuildRank): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/guilds/management/promote', {
      player_id: playerId,
      new_rank: newRank
    });
    return response.data;
  }

  async contributeToBank(credits: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/guilds/management/contribute', { credits });
    return response.data;
  }

  async getGuildBank(): Promise<{ credits: number; resources: Record<string, number> }> {
    const response = await apiClient.get('/guilds/management/bank');
    return response.data;
  }

  // Territories
  async getAllTerritories(): Promise<Territory[]> {
    const response = await apiClient.get('/guilds/territories');
    return response.data;
  }

  async getTerritory(territoryId: number): Promise<Territory> {
    const response = await apiClient.get(`/guilds/territories/${territoryId}`);
    return response.data;
  }

  async getMyGuildTerritories(): Promise<Territory[]> {
    const response = await apiClient.get('/guilds/territories/guild/my-territories');
    return response.data;
  }

  async attackTerritory(territoryId: number): Promise<any> {
    const response = await apiClient.post(`/guilds/territories/${territoryId}/attack`);
    return response.data;
  }

  async defendTerritory(territoryId: number): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/guilds/territories/${territoryId}/defend`);
    return response.data;
  }

  // Wars
  async declareWar(defenderGuildId: string, targetTerritory?: number): Promise<{ success: boolean; war: GuildWar }> {
    const response = await apiClient.post('/guilds/wars/declare', {
      defender_guild_id: defenderGuildId,
      target_territory: targetTerritory
    });
    return response.data;
  }

  async getMyGuildWars(): Promise<GuildWar[]> {
    const response = await apiClient.get('/guilds/wars/my-wars');
    return response.data;
  }

  async getWar(warId: string): Promise<GuildWar> {
    const response = await apiClient.get(`/guilds/wars/${warId}`);
    return response.data;
  }

  async offerPeace(warId: string, terms: any): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/guilds/wars/peace/offer', { war_id: warId, terms });
    return response.data;
  }

  async acceptPeace(warId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/guilds/wars/peace/${warId}/accept`);
    return response.data;
  }

  async rejectPeace(warId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/guilds/wars/peace/${warId}/reject`);
    return response.data;
  }
}

export default new GuildsService();
