/**
 * Integration test for quest flow
 */

import { questService } from '../../services/questService';

// Mock API client
jest.mock('../../services/api/client', () => ({
  apiClient),
    post)
  }
}));

import { apiClient } from '../../services/api/client';

const mockQuest = {
  _id,
  title,
  description,
  quest_type,
  status,
  objectives,
      type,
      current,
      required,
      completed,
  rewards,
    xp,
    karma,
  difficulty, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('completes full quest lifecycle', async () => {
    // 1. Get available quests
    (apiClient.get.Mock).mockResolvedValueOnce({
      data);

    const availableQuests = await questService.getAvailableQuests();
    expect(availableQuests).toHaveLength(1);
    expect(availableQuests[0]._id).toBe('quest123');

    // 2. Accept quest
    (apiClient.post.Mock).mockResolvedValueOnce({
      data, quest, status);

    const acceptResult = await questService.acceptQuest('quest123');
    expect(acceptResult.success).toBe(true);
    expect(apiClient.post).toHaveBeenCalledWith(
      '/api/quests/accept',
      { quest_id);

    // 3. Get active quests
    (apiClient.get.Mock).mockResolvedValueOnce({
      data, status);

    const activeQuests = await questService.getActiveQuests();
    expect(activeQuests).toHaveLength(1);
    expect(activeQuests[0].status).toBe('active');

    // 4. Complete quest objectives (simulated)
    // In real scenario, this would happen through gameplay

    // 5. Get completed quests
    (apiClient.get.Mock).mockResolvedValueOnce({
      data, status);

    const completedQuests = await questService.getCompletedQuests();
    expect(completedQuests).toHaveLength(1);
    expect(completedQuests[0].status).toBe('completed');
  });

  it('handles quest abandonment', async () => {
    // Accept quest
    (apiClient.post.Mock).mockResolvedValueOnce({
      data);

    await questService.acceptQuest('quest123');

    // Abandon quest
    (apiClient.post.Mock).mockResolvedValueOnce({
      data);

    const result = await questService.abandonQuest('quest123');
    expect(result).toBe(true);
    expect(apiClient.post).toHaveBeenCalledWith(
      '/api/quests/abandon',
      { quest_id);
  });

  it('fetches quest details', async () => {
    (apiClient.get.Mock).mockResolvedValueOnce({
      data);

    const quest = await questService.getQuestDetails('quest123');
    expect(quest._id).toBe('quest123');
    expect(apiClient.get).toHaveBeenCalledWith('/api/quests/quest123');
  });

  it('handles daily quests', async () => {
    (apiClient.get.Mock).mockResolvedValueOnce({
      data, quest_type);

    const dailyQuests = await questService.getDailyQuests();
    expect(dailyQuests).toHaveLength(1);
    expect(dailyQuests[0].quest_type).toBe('daily');
  });

  it('handles weekly quests', async () => {
    (apiClient.get.Mock).mockResolvedValueOnce({
      data, quest_type);

    const weeklyQuests = await questService.getWeeklyQuests();
    expect(weeklyQuests).toHaveLength(1);
    expect(weeklyQuests[0].quest_type).toBe('weekly');
  });

  it('handles guild quests', async () => {
    (apiClient.get.Mock).mockResolvedValueOnce({
      data,
        active);

    const guildQuests = await questService.getGuildQuests();
    expect(guildQuests.available).toHaveLength(1);
    expect(guildQuests.active).toHaveLength(0);
  });

  it('handles campaign flow', async () => {
    const mockCampaign = {
      _id,
      title,
      description,
      total_chapters,
      difficulty,
      category).mockResolvedValueOnce({
      data);

    const campaigns = await questService.getCampaigns();
    expect(campaigns).toHaveLength(1);

    // Start campaign
    (apiClient.post.Mock).mockResolvedValueOnce({
      data, progress);

    const startResult = await questService.startCampaign('campaign123');
    expect(startResult.success).toBe(true);

    // Get current chapter
    (apiClient.get.Mock).mockResolvedValueOnce({
      data,
          title,
          description,
          story_text,
          objectives,
          choices);

    const chapter = await questService.getCurrentChapter('campaign123');
    expect(chapter.chapter_number).toBe(1);
  });
});
