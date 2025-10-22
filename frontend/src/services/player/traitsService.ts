import apiClient from '../api/client';

export interface TraitsResponse {
  traits: Record<string, number>;
  meta_traits: Record<string, number>;
  total_traits: number;
}

export interface TraitDetails {
  trait_name: string;
  current_value: number;
  category: string;
  description: string;
  affects: string[];
}

class TraitsService {
  async getAllTraits(): Promise<TraitsResponse> {
    const response = await apiClient.get('/api/player/traits/');
    return response.data;
  }

  async getBaseTraits(): Promise<Record<string, number>> {
    const response = await apiClient.get('/api/player/traits/base');
    return response.data;
  }

  async getMetaTraits(): Promise<Record<string, number>> {
    const response = await apiClient.get('/api/player/traits/meta');
    return response.data;
  }

  async getTopTraits(limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/api/player/traits/top?limit=${limit}`);
    return response.data;
  }

  async getBottomTraits(limit: number = 10): Promise<any> {
    const response = await apiClient.get(`/api/player/traits/bottom?limit=${limit}`);
    return response.data;
  }

  async getTraitDetails(traitName: string): Promise<TraitDetails> {
    const response = await apiClient.get(`/api/player/traits/${traitName}`);
    return response.data;
  }

  async allocateTraitPoints(traitName: string, points: number): Promise<any> {
    const response = await apiClient.put('/api/player/traits/allocate', {
      trait_name: traitName,
      points
    });
    return response.data;
  }
}

export default new TraitsService();