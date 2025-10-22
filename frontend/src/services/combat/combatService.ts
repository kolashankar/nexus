import apiClient from '../api/client';
import { Battle, CombatAbility } from '../../types/combat';

class CombatService {
  async challengePlayer(attackerId: string, defenderId: string, battleType: string = 'duel') {
    const response = await apiClient.post('/api/combat/challenge', {
      attacker_id: attackerId,
      defender_id: defenderId,
      battle_type: battleType
    });
    return response.data;
  }

  async acceptChallenge(battleId: string) {
    const response = await apiClient.post(`/api/combat/accept/${battleId}`);
    return response.data;
  }

  async declineChallenge(battleId: string) {
    const response = await apiClient.post(`/api/combat/decline/${battleId}`);
    return response.data;
  }

  async getActiveBattles(playerId: string): Promise<{ battles: Battle[] }> {
    const response = await apiClient.get('/api/combat/active', {
      params: { player_id: playerId }
    });
    return response.data;
  }

  async executeAction(
    battleId: string,
    actorId: string,
    actionType: string,
    targetId?: string,
    abilityName?: string
  ) {
    const response = await apiClient.post('/api/combat/action', {
      battle_id: battleId,
      actor_id: actorId,
      action_type: actionType,
      target_id: targetId,
      ability_name: abilityName
    });
    return response.data;
  }

  async getBattleState(battleId: string): Promise<Battle> {
    const response = await apiClient.get(`/api/combat/state/${battleId}`);
    return response.data;
  }

  async fleeBattle(battleId: string, playerId: string) {
    const response = await apiClient.post(`/api/combat/flee/${battleId}`, null, {
      params: { player_id: playerId }
    });
    return response.data;
  }

  async getCombatHistory(playerId: string, limit: number = 10) {
    const response = await apiClient.get('/api/combat/history', {
      params: { player_id: playerId, limit }
    });
    return response.data;
  }

  async getCombatStats(playerId: string) {
    const response = await apiClient.get(`/api/combat/stats/${playerId}`);
    return response.data;
  }

  // Duel specific
  async challengeToDuel(attackerId: string, defenderId: string) {
    const response = await apiClient.post('/api/combat/duel/challenge', {
      attacker_id: attackerId,
      defender_id: defenderId,
      battle_type: 'duel'
    });
    return response.data;
  }

  async getPendingDuels(playerId: string) {
    const response = await apiClient.get(`/api/combat/duel/pending/${playerId}`);
    return response.data;
  }

  // Arena specific
  async joinArenaQueue(playerId: string, ranked: boolean = false) {
    const response = await apiClient.post('/api/combat/arena/join', null, {
      params: { player_id: playerId, ranked }
    });
    return response.data;
  }

  async leaveArenaQueue(playerId: string) {
    const response = await apiClient.post('/api/combat/arena/leave', null, {
      params: { player_id: playerId }
    });
    return response.data;
  }

  async getQueueStatus(playerId: string) {
    const response = await apiClient.get('/api/combat/arena/queue', {
      params: { player_id: playerId }
    });
    return response.data;
  }

  async getArenaLeaderboard(limit: number = 100) {
    const response = await apiClient.get('/api/combat/arena/leaderboard', {
      params: { limit }
    });
    return response.data;
  }
}

export default new CombatService();
