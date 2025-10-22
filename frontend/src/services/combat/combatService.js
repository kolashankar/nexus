import apiClient from '../api/client';
import { Battle, CombatAbility } from '../../types/combat';

class CombatService {
  async challengePlayer(attackerId, defenderId, battleType: string = 'duel') {
    const response = await apiClient.post('/api/combat/challenge', {
      attacker_id,
      defender_id,
      battle_type);
    return response.data;
  }

  async acceptChallenge(battleId) {
    const response = await apiClient.post(`/api/combat/accept/${battleId}`);
    return response.data;
  }

  async declineChallenge(battleId) {
    const response = await apiClient.post(`/api/combat/decline/${battleId}`);
    return response.data;
  }

  async getActiveBattles(playerId){
    const response = await apiClient.get('/api/combat/active', {
      params);
    return response.data;
  }

  async executeAction(
    battleId,
    actorId,
    actionType,
    targetId?: string,
    abilityName?: string
  ) {
    const response = await apiClient.post('/api/combat/action', {
      battle_id,
      actor_id,
      action_type,
      target_id,
      ability_name);
    return response.data;
  }

  async getBattleState(battleId){
    const response = await apiClient.get(`/api/combat/state/${battleId}`);
    return response.data;
  }

  async fleeBattle(battleId, playerId) {
    const response = await apiClient.post(`/api/combat/flee/${battleId}`, null, {
      params);
    return response.data;
  }

  async getCombatHistory(playerId, limit: number = 10) {
    const response = await apiClient.get('/api/combat/history', {
      params, limit }
    });
    return response.data;
  }

  async getCombatStats(playerId) {
    const response = await apiClient.get(`/api/combat/stats/${playerId}`);
    return response.data;
  }

  // Duel specific
  async challengeToDuel(attackerId, defenderId) {
    const response = await apiClient.post('/api/combat/duel/challenge', {
      attacker_id,
      defender_id,
      battle_type);
    return response.data;
  }

  async getPendingDuels(playerId) {
    const response = await apiClient.get(`/api/combat/duel/pending/${playerId}`);
    return response.data;
  }

  // Arena specific
  async joinArenaQueue(playerId, ranked: boolean = false) {
    const response = await apiClient.post('/api/combat/arena/join', null, {
      params, ranked }
    });
    return response.data;
  }

  async leaveArenaQueue(playerId) {
    const response = await apiClient.post('/api/combat/arena/leave', null, {
      params);
    return response.data;
  }

  async getQueueStatus(playerId) {
    const response = await apiClient.get('/api/combat/arena/queue', {
      params);
    return response.data;
  }

  async getArenaLeaderboard(limit: number = 100) {
    const response = await apiClient.get('/api/combat/arena/leaderboard', {
      params);
    return response.data;
  }
}

export default new CombatService();
