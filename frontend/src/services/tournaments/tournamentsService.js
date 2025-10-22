import apiClient from '../api/client';
import { Tournament } from '../../types/combat';

class TournamentsService {
  async getActiveTournaments(){
    const response = await apiClient.get('/api/tournaments/active');
    return response.data;
  }

  async registerForTournament(tournamentId, playerId) {
    const response = await apiClient.post('/api/tournaments/register', {
      tournament_id,
      player_id);
    return response.data;
  }

  async getTournament(tournamentId){
    const response = await apiClient.get(`/api/tournaments/${tournamentId}`);
    return response.data;
  }

  async getTournamentBracket(tournamentId) {
    const response = await apiClient.get(`/api/tournaments/${tournamentId}/bracket`);
    return response.data;
  }

  async getMyMatch(tournamentId, playerId) {
    const response = await apiClient.get(`/api/tournaments/${tournamentId}/my-match`, {
      params);
    return response.data;
  }

  async getTournamentHistory(playerId?: string, limit: number = 10) {
    const response = await apiClient.get('/api/tournaments/history', {
      params, limit }
    });
    return response.data;
  }
}

export default new TournamentsService();
