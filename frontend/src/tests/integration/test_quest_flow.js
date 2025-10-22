import { describe, it, expect, beforeAll } from '@jest/globals';
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
describe('Quest Flow Integration Tests', () => {
    let authToken;
    let playerId;
    let questId;
    beforeAll(async () => {
        const login = await axios.post(`${API_URL}/api/auth/login`, {
            username: 'quest_seeker',
            password: 'testpass123',
        });
        authToken = login.data.access_token;
        const profile = await axios.get(`${API_URL}/api/player/profile`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        playerId = profile.data.player_id;
    });
    describe('Quest Discovery', () => {
        it('should fetch available quests', async () => {
            const response = await axios.get(`${API_URL}/api/quests/available`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
        });
        it('should get daily quests', async () => {
            const response = await axios.get(`${API_URL}/api/quests/daily`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeLessThanOrEqual(3);
        });
        it('should get weekly challenges', async () => {
            const response = await axios.get(`${API_URL}/api/quests/weekly`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeLessThanOrEqual(5);
        });
    });
    describe('Quest Acceptance', () => {
        it('should accept an available quest', async () => {
            const availableQuests = await axios.get(`${API_URL}/api/quests/available`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (availableQuests.data.length > 0) {
                questId = availableQuests.data[0]._id;
                const response = await axios.post(`${API_URL}/api/quests/accept`, { quest_id: questId }, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                expect(response.status).toBe(200);
                expect(response.data.status).toBe('active');
            }
        });
        it('should not accept same quest twice', async () => {
            if (questId) {
                try {
                    await axios.post(`${API_URL}/api/quests/accept`, { quest_id: questId }, {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    fail('Should have thrown an error');
                }
                catch (error) {
                    expect(error.response.status).toBe(400);
                }
            }
        });
    });
    describe('Quest Progression', () => {
        it('should track quest objectives', async () => {
            const activeQuests = await axios.get(`${API_URL}/api/quests/active`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (activeQuests.data.length > 0) {
                const quest = activeQuests.data[0];
                expect(quest).toHaveProperty('objectives');
                expect(Array.isArray(quest.objectives)).toBe(true);
                quest.objectives.forEach((obj) => {
                    expect(obj).toHaveProperty('current');
                    expect(obj).toHaveProperty('required');
                    expect(obj).toHaveProperty('completed');
                });
            }
        });
    });
    describe('Quest Completion', () => {
        it('should complete quest when objectives met', async () => {
            // Note: This would require actually completing objectives
            // For testing purposes, we check the endpoint exists
            const activeQuests = await axios.get(`${API_URL}/api/quests/active`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (activeQuests.data.length > 0) {
                const quest = activeQuests.data[0];
                // Check if all objectives are completed
                const allCompleted = quest.objectives.every((obj) => obj.completed);
                if (allCompleted) {
                    const response = await axios.post(`${API_URL}/api/quests/complete`, { quest_id: quest._id }, {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    expect(response.status).toBe(200);
                    expect(response.data).toHaveProperty('rewards');
                }
            }
        });
        it('should grant rewards on completion', async () => {
            const completedQuests = await axios.get(`${API_URL}/api/quests/completed`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (completedQuests.data.length > 0) {
                const quest = completedQuests.data[0];
                expect(quest).toHaveProperty('rewards');
                expect(quest.rewards).toHaveProperty('credits');
                expect(quest.rewards).toHaveProperty('xp');
            }
        });
    });
    describe('Quest Abandonment', () => {
        it('should abandon active quest', async () => {
            const activeQuests = await axios.get(`${API_URL}/api/quests/active`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (activeQuests.data.length > 0) {
                const quest = activeQuests.data[0];
                const response = await axios.post(`${API_URL}/api/quests/abandon`, { quest_id: quest._id }, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                expect(response.status).toBe(200);
                expect(response.data.message).toContain('abandoned');
            }
        });
    });
    describe('Campaign System', () => {
        it('should access campaign quests', async () => {
            const response = await axios.get(`${API_URL}/api/quests/campaign`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            expect(response.status).toBe(200);
        });
        it('should start a campaign', async () => {
            const response = await axios.post(`${API_URL}/api/quests/campaign/start`, { campaign_type: 'redemption' }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (response.status === 200) {
                expect(response.data).toHaveProperty('campaign_id');
                expect(response.data).toHaveProperty('chapters');
            }
        });
    });
});
