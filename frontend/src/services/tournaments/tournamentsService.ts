import apiClient from '../api/client';
import { Tournament } from '../../types/combat';

class TournamentsService {
  async getActiveTournaments(): Promise<Tournament[]> {
    const response = await apiClient.get('/api/tournaments/active');
    return response.data;
  }

  async registerForTournament(tournamentId: string, playerId: string) {
    const response = await apiClient.post('/api/tournaments/register', {
      tournament_id: tournamentId,
      player_id: playerId
    });
    return response.data;
  }

  async getTournament(tournamentId: string): Promise<Tournament> {
    const response = await apiClient.get(`/api/tournaments/${tournamentId}`);
    return response.data;
  }

  async getTournamentBracket(tournamentId: string) {
    const response = await apiClient.get(`/api/tournaments/${tournamentId}/bracket`);
    return response.data;
  }

  async getMyMatch(tournamentId: string, playerId: string) {
    const response = await apiClient.get(`/api/tournaments/${tournamentId}/my-match`, {
      params: { player_id: playerId }
    });
    return response.data;
  }

  async getTournamentHistory(playerId?: string, limit: number = 10) {
    const response = await apiClient.get('/api/tournaments/history', {
      params: { player_id: playerId, limit }
    });
    return response.data;
  }
}

export default new TournamentsService();
