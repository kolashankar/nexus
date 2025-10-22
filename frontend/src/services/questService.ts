import { apiClient } from './api/client';

export interface Quest {
  _id: string;
  title: string;
  description: string;
  quest_type: string;
  status: string;
  objectives: QuestObjective[];
  rewards: QuestRewards;
  requirements?: QuestRequirements;
  lore?: string;
  difficulty: string;
  expires_at?: string;
}

export interface QuestObjective {
  description: string;
  type: string;
  target?: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestRewards {
  credits: number;
  xp: number;
  karma: number;
  items?: string[];
  trait_boosts?: Record<string, number>;
  special?: string;
}

export interface QuestRequirements {
  min_level?: number;
  min_karma?: number;
  required_traits?: Record<string, number>;
  required_items?: string[];
}

export interface Campaign {
  _id: string;
  title: string;
  description: string;
  lore: string;
  total_chapters: number;
  difficulty: string;
  category: string;
  current_chapter?: number;
  chapters_completed?: number;
  status?: string;
}

export interface CampaignChapter {
  chapter_number: number;
  title: string;
  description: string;
  story_text: string;
  objectives: string[];
  choices: CampaignChoice[];
  rewards?: any;
}

export interface CampaignChoice {
  id: string;
  text: string;
  description?: string;
  consequences: any;
  branching?: string;
}

class QuestService {
  async getAvailableQuests(questType?: string): Promise<Quest[]> {
    const params = questType ? { quest_type: questType } : {};
    const response = await apiClient.get('/api/quests/available', { params });
    return response.data.quests;
  }

  async getActiveQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/active');
    return response.data.quests;
  }

  async getCompletedQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/completed');
    return response.data.quests;
  }

  async acceptQuest(questId: string): Promise<any> {
    const response = await apiClient.post('/api/quests/accept', { quest_id: questId });
    return response.data;
  }

  async abandonQuest(questId: string): Promise<boolean> {
    const response = await apiClient.post('/api/quests/abandon', { quest_id: questId });
    return response.data.success;
  }

  async getQuestDetails(questId: string): Promise<Quest> {
    const response = await apiClient.get(`/api/quests/${questId}`);
    return response.data.quest;
  }

  async getDailyQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/daily');
    return response.data.quests;
  }

  async getWeeklyQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/weekly');
    return response.data.quests;
  }

  async getWorldQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/world');
    return response.data.quests;
  }

  async getGuildQuests(): Promise<{ available: Quest[]; active: Quest[] }> {
    const response = await apiClient.get('/api/quests/guild');
    return response.data;
  }

  async joinGuildQuest(questId: string): Promise<any> {
    const response = await apiClient.post(`/api/quests/guild/${questId}/join`);
    return response.data;
  }

  async getDiscoveredHiddenQuests(): Promise<Quest[]> {
    const response = await apiClient.get('/api/quests/hidden/discovered');
    return response.data.quests;
  }

  async getHiddenQuestHints(): Promise<any[]> {
    const response = await apiClient.get('/api/quests/hidden/hints');
    return response.data.hints;
  }

  async getCampaigns(status?: string): Promise<Campaign[]> {
    const params = status ? { status } : {};
    const response = await apiClient.get('/api/quests/campaigns', { params });
    return response.data.campaigns;
  }

  async startCampaign(campaignId: string): Promise<any> {
    const response = await apiClient.post('/api/quests/campaigns/start', { campaign_id: campaignId });
    return response.data;
  }

  async getCurrentChapter(campaignId: string): Promise<CampaignChapter> {
    const response = await apiClient.get(`/api/quests/campaigns/${campaignId}/current`);
    return response.data.chapter;
  }

  async makeCampaignChoice(campaignId: string, choiceId: string): Promise<any> {
    const response = await apiClient.post('/api/quests/campaigns/choice', {
      campaign_id: campaignId,
      choice_id: choiceId
    });
    return response.data;
  }

  async completeChapter(campaignId: string): Promise<any> {
    const response = await apiClient.post(`/api/quests/campaigns/${campaignId}/complete-chapter`);
    return response.data;
  }

  async getQuestStats(): Promise<any> {
    const response = await apiClient.get('/api/quests/stats');
    return response.data.stats;
  }
}

export const questService = new QuestService();
