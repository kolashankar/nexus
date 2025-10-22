import apiClient from '../api/client';
import { Alliance, Marriage, Mentorship, MarriageProposal, MentorshipRequest } from '../../types/social';

class SocialService {
  // General social
  async getNearbyPlayers(limit: number = 20): Promise<any[]> {
    const response = await apiClient.get('/social/nearby', { params: { limit } });
    return response.data;
  }

  async getOnlinePlayers(skip: number = 0, limit: number = 20): Promise<any[]> {
    const response = await apiClient.get('/social/online', { params: { skip, limit } });
    return response.data;
  }

  async getMyRelationships(type?: string): Promise<any[]> {
    const response = await apiClient.get('/social/relationships', { params: { type } });
    return response.data;
  }

  async getPlayerProfile(playerId: string): Promise<any> {
    const response = await apiClient.get(`/social/players/${playerId}`);
    return response.data;
  }

  // Alliances
  async createAlliance(allianceName?: string): Promise<{ success: boolean; alliance: Alliance }> {
    const response = await apiClient.post('/social/alliances', { alliance_name: allianceName });
    return response.data;
  }

  async getMyAlliance(): Promise<Alliance> {
    const response = await apiClient.get('/social/alliances/my-alliance');
    return response.data;
  }

  async addAllianceMember(playerId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/social/alliances/add-member', { player_id: playerId });
    return response.data;
  }

  async leaveAlliance(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete('/social/alliances/leave');
    return response.data;
  }

  async disbandAlliance(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete('/social/alliances/disband');
    return response.data;
  }

  // Marriage
  async proposeMarriage(playerId: string): Promise<{ success: boolean; proposal: MarriageProposal }> {
    const response = await apiClient.post('/social/marriage/propose', { player_id: playerId });
    return response.data;
  }

  async getPendingProposals(): Promise<MarriageProposal[]> {
    const response = await apiClient.get('/social/marriage/proposals');
    return response.data;
  }

  async acceptProposal(proposalId: string): Promise<{ success: boolean; marriage: Marriage }> {
    const response = await apiClient.post(`/social/marriage/proposals/${proposalId}/accept`);
    return response.data;
  }

  async rejectProposal(proposalId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/social/marriage/proposals/${proposalId}/reject`);
    return response.data;
  }

  async getMyMarriage(): Promise<Marriage> {
    const response = await apiClient.get('/social/marriage/my-marriage');
    return response.data;
  }

  async divorce(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/social/marriage/divorce');
    return response.data;
  }

  // Mentorship
  async requestMentorship(mentorId: string): Promise<{ success: boolean; request: MentorshipRequest }> {
    const response = await apiClient.post('/social/mentorship/request', { mentor_id: mentorId });
    return response.data;
  }

  async getPendingMentorshipRequests(): Promise<MentorshipRequest[]> {
    const response = await apiClient.get('/social/mentorship/requests');
    return response.data;
  }

  async acceptMentorshipRequest(requestId: string): Promise<{ success: boolean; mentorship: Mentorship }> {
    const response = await apiClient.post(`/social/mentorship/requests/${requestId}/accept`);
    return response.data;
  }

  async rejectMentorshipRequest(requestId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`/social/mentorship/requests/${requestId}/reject`);
    return response.data;
  }

  async getMyMentorship(asMentor: boolean = false): Promise<Mentorship> {
    const response = await apiClient.get('/social/mentorship/my-mentorship', {
      params: { as_mentor: asMentor }
    });
    return response.data;
  }

  async graduateApprentice(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/social/mentorship/graduate');
    return response.data;
  }

  async completeLesson(): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post('/social/mentorship/lesson/complete');
    return response.data;
  }

  async listAvailableMentors(skip: number = 0, limit: number = 20): Promise<any[]> {
    const response = await apiClient.get('/social/mentorship/mentors', { params: { skip, limit } });
    return response.data;
  }
}

export default new SocialService();
