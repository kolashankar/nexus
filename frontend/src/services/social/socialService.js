import apiClient from '../api/client';
import { Alliance, Marriage, Mentorship, MarriageProposal, MentorshipRequest } from '../../types/social';

class SocialService {
  // General social
  async getNearbyPlayers(limit= 20){
    const response = await apiClient.get('/social/nearby', { params);
    return response.data;
  }

  async getOnlinePlayers(skip= 0, limit= 20){
    const response = await apiClient.get('/social/online', { params, limit } });
    return response.data;
  }

  async getMyRelationships(type?: string){
    const response = await apiClient.get('/social/relationships', { params);
    return response.data;
  }

  async getPlayerProfile(playerId){
    const response = await apiClient.get(`/social/players/${playerId}`);
    return response.data;
  }

  // Alliances
  async createAlliance(allianceName?: string){
    const response = await apiClient.post('/social/alliances', { alliance_name);
    return response.data;
  }

  async getMyAlliance(){
    const response = await apiClient.get('/social/alliances/my-alliance');
    return response.data;
  }

  async addAllianceMember(playerId){
    const response = await apiClient.post('/social/alliances/add-member', { player_id);
    return response.data;
  }

  async leaveAlliance(){
    const response = await apiClient.delete('/social/alliances/leave');
    return response.data;
  }

  async disbandAlliance(){
    const response = await apiClient.delete('/social/alliances/disband');
    return response.data;
  }

  // Marriage
  async proposeMarriage(playerId){
    const response = await apiClient.post('/social/marriage/propose', { player_id);
    return response.data;
  }

  async getPendingProposals(){
    const response = await apiClient.get('/social/marriage/proposals');
    return response.data;
  }

  async acceptProposal(proposalId){
    const response = await apiClient.post(`/social/marriage/proposals/${proposalId}/accept`);
    return response.data;
  }

  async rejectProposal(proposalId){
    const response = await apiClient.post(`/social/marriage/proposals/${proposalId}/reject`);
    return response.data;
  }

  async getMyMarriage(){
    const response = await apiClient.get('/social/marriage/my-marriage');
    return response.data;
  }

  async divorce(){
    const response = await apiClient.post('/social/marriage/divorce');
    return response.data;
  }

  // Mentorship
  async requestMentorship(mentorId){
    const response = await apiClient.post('/social/mentorship/request', { mentor_id);
    return response.data;
  }

  async getPendingMentorshipRequests(){
    const response = await apiClient.get('/social/mentorship/requests');
    return response.data;
  }

  async acceptMentorshipRequest(requestId){
    const response = await apiClient.post(`/social/mentorship/requests/${requestId}/accept`);
    return response.data;
  }

  async rejectMentorshipRequest(requestId){
    const response = await apiClient.post(`/social/mentorship/requests/${requestId}/reject`);
    return response.data;
  }

  async getMyMentorship(asMentor= false){
    const response = await apiClient.get('/social/mentorship/my-mentorship', {
      params);
    return response.data;
  }

  async graduateApprentice(){
    const response = await apiClient.post('/social/mentorship/graduate');
    return response.data;
  }

  async completeLesson(){
    const response = await apiClient.post('/social/mentorship/lesson/complete');
    return response.data;
  }

  async listAvailableMentors(skip= 0, limit= 20){
    const response = await apiClient.get('/social/mentorship/mentors', { params, limit } });
    return response.data;
  }
}

export default new SocialService();
