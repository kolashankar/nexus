import { apiClient } from './client';

interface WorldEvent {
  event_id: string;
  event_type: string;
  name: string;
  description: string;
  lore: string;
  [key: string]: any;
}

interface EventListResponse {
  events: WorldEvent[];
  total: number;
}

interface WorldState {
  collective_karma: number;
  average_karma: number;
  karma_trend: string;
  total_players: number;
  online_players: number;
  [key: string]: any;
}

interface TerritoryListResponse {
  territories: any[];
  total: number;
}

class WorldService {
  /**
   * Get currently active global event
   */
  async getActiveEvent(): Promise<WorldEvent | null> {
    try {
      const response = await apiClient.get('/api/world/events/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active event:', error);
      return null;
    }
  }

  /**
   * Get recent world events
   */
  async getRecentEvents(limit: number = 10): Promise<EventListResponse> {
    const response = await apiClient.get(`/api/world/events/recent?limit=${limit}`);
    return response.data;
  }

  /**
   * Get event by ID
   */
  async getEventById(eventId: string): Promise<WorldEvent> {
    const response = await apiClient.get(`/api/world/events/${eventId}`);
    return response.data;
  }

  /**
   * Participate in an event
   */
  async participateInEvent(eventId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/api/world/events/participate', {
      event_id: eventId
    });
    return response.data;
  }

  /**
   * Get regional events for a territory
   */
  async getTerritoryEvents(territoryId: number): Promise<EventListResponse> {
    const response = await apiClient.get(`/api/world/events/territory/${territoryId}`);
    return response.data;
  }

  /**
   * Get current world state
   */
  async getWorldState(): Promise<WorldState> {
    const response = await apiClient.get('/api/world/state/current');
    return response.data;
  }

  /**
   * Get karma statistics
   */
  async getKarmaStatistics(): Promise<any> {
    const response = await apiClient.get('/api/world/state/karma');
    return response.data;
  }

  /**
   * Get top karma players
   */
  async getTopKarmaPlayers(limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/api/world/state/karma/top?limit=${limit}`);
    return response.data;
  }

  /**
   * Get bottom karma players
   */
  async getBottomKarmaPlayers(limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/api/world/state/karma/bottom?limit=${limit}`);
    return response.data;
  }

  /**
   * Get all territories
   */
  async getAllTerritories(): Promise<TerritoryListResponse> {
    const response = await apiClient.get('/api/world/territories/all');
    return response.data;
  }

  /**
   * Get contested territories
   */
  async getContestedTerritories(): Promise<TerritoryListResponse> {
    const response = await apiClient.get('/api/world/territories/contested');
    return response.data;
  }

  /**
   * Get territory by ID
   */
  async getTerritoryById(territoryId: number): Promise<any> {
    const response = await apiClient.get(`/api/world/territories/${territoryId}`);
    return response.data;
  }

  /**
   * Get territories controlled by a guild
   */
  async getGuildTerritories(guildId: string): Promise<TerritoryListResponse> {
    const response = await apiClient.get(`/api/world/territories/guild/${guildId}`);
    return response.data;
  }

  /**
   * Initialize territories (admin)
   */
  async initializeTerritories(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/api/world/territories/initialize');
    return response.data;
  }
}

export const worldService = new WorldService();
