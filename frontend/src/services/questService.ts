import { apiClient } from './api/client';

export interface Quest {
  id: string;
  title: string;
  description: string;
  quest_type: string;
  difficulty: string;
  objectives: any[];
  rewards: any;
  status: string;
  expires_at?: string;
}

export const questService = {
  async getAvailableQuests(questType?: string): Promise<Quest[]> {
    const params = questType ? { quest_type: questType } : {};
    const response = await apiClient.get('/quests/available', { params });
    return response.data.quests;
  },

  async getActiveQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/quests/active');
    return response.data.quests;
  },

  async getCompletedQuests(limit: number = 50): Promise<Quest[]> {
    const response = await apiClient.get('/quests/completed', { params: { limit } });
    return response.data.quests;
  },

  async getQuestDetails(questId: string): Promise<Quest> {
    const response = await apiClient.get(`/quests/${questId}`);
    return response.data;
  },

  async acceptQuest(questId: string): Promise<any> {
    const response = await apiClient.post('/quests/accept', { quest_id: questId });
    return response.data;
  },

  async abandonQuest(questId: string): Promise<any> {
    const response = await apiClient.post(`/quests/abandon/${questId}`);
    return response.data;
  },

  async completeQuest(questId: string): Promise<any> {
    const response = await apiClient.post('/quests/complete', { quest_id: questId });
    return response.data;
  },

  async getQuestProgress(questId: string): Promise<any> {
    const response = await apiClient.get(`/quests/progress/${questId}`);
    return response.data;
  },

  async generatePersonalQuest(questType: string = 'personal'): Promise<any> {
    const response = await apiClient.post('/quests/generate', null, {
      params: { quest_type: questType }
    });
    return response.data;
  },

  async getDailyQuests(): Promise<any> {
    const response = await apiClient.get('/quests/daily');
    return response.data;
  },

  async getWeeklyQuests(): Promise<any> {
    const response = await apiClient.get('/quests/weekly');
    return response.data;
  },

  async getWorldQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/quests/world');
    return response.data.quests;
  },

  async participateInWorldQuest(questId: string): Promise<any> {
    const response = await apiClient.get(`/quests/world/participate/${questId}`);
    return response.data;
  },

  // Campaign methods
  async getAvailableCampaigns(): Promise<any> {
    const response = await apiClient.get('/quests/campaigns/available');
    return response.data.campaigns;
  },

  async getActiveCampaign(): Promise<any> {
    const response = await apiClient.get('/quests/campaigns/active');
    return response.data;
  },

  async startCampaign(campaignType: string): Promise<any> {
    const response = await apiClient.post('/quests/campaigns/start', {
      campaign_type: campaignType
    });
    return response.data;
  },

  async getCampaignProgress(): Promise<any> {
    const response = await apiClient.get('/quests/campaigns/progress');
    return response.data;
  },

  async makeCampaignChoice(chapterNumber: number, choice: string): Promise<any> {
    const response = await apiClient.post('/quests/campaigns/choice', {
      chapter_number: chapterNumber,
      choice
    });
    return response.data;
  }
};
