import apiClient from '../api/client';
import type {
  PlayerSuperpowers,
  SuperpowerDefinition,
  AvailablePower,
} from '../../types/superpowers';

class SuperpowersService {
  /**
   * Get all superpowers for the current player
   */
  async getSuperpowers(): Promise<PlayerSuperpowers> {
    const response = await apiClient.get('/player/superpowers');
    return response.data;
  }

  /**
   * Get list of powers player can unlock
   */
  async getAvailablePowers(): Promise<AvailablePower[]> {
    const response = await apiClient.get('/player/superpowers/available');
    return response.data.available_powers;
  }

  /**
   * Get all superpower definitions
   */
  async getPowerDefinitions(): Promise<SuperpowerDefinition[]> {
    const response = await apiClient.get('/player/superpowers/definitions');
    return response.data.powers;
  }

  /**
   * Get a specific superpower definition
   */
  async getPowerDefinition(powerId: string): Promise<SuperpowerDefinition> {
    const response = await apiClient.get(`/player/superpowers/definitions/${powerId}`);
    return response.data;
  }

  /**
   * Unlock a superpower
   */
  async unlockPower(powerId: string): Promise<any> {
    const response = await apiClient.post('/player/superpowers/unlock', { power_id: powerId });
    return response.data;
  }

  /**
   * Equip a superpower
   */
  async equipPower(powerId: string): Promise<any> {
    const response = await apiClient.post('/player/superpowers/equip', { power_id: powerId });
    return response.data;
  }

  /**
   * Unequip a superpower
   */
  async unequipPower(powerId: string): Promise<any> {
    const response = await apiClient.post(`/player/superpowers/unequip/${powerId}`);
    return response.data;
  }

  /**
   * Use a superpower
   */
  async usePower(powerId: string): Promise<any> {
    const response = await apiClient.post('/player/superpowers/use', { power_id: powerId });
    return response.data;
  }
}

export default new SuperpowersService();
