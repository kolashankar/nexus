import { describe, it, expect, beforeAll } from '@jest/globals';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http, () => {
  let authToken1) => {
    // Login two users
    const login1 = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    authToken1 = login1.data.access_token;

    const login2 = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    authToken2 = login2.data.access_token;

    const profile1 = await axios.get(`${API_URL}/api/player/profile`, {
      headers,
    });
    playerId1 = profile1.data.player_id;

    const profile2 = await axios.get(`${API_URL}/api/player/profile`, {
      headers,
    });
    playerId2 = profile2.data.player_id;
  });

  describe('Player Discovery', () => {
    it('should get nearby players', async () => {
      const response = await axios.get(`${API_URL}/api/social/nearby`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it('should get online players', async () => {
      const response = await axios.get(`${API_URL}/api/social/online`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Messaging', () => {
    it('should send direct message', async () => {
      const response = await axios.post(
        `${API_URL}/api/social/message`,
        {
          recipient_id,
          message,
        },
        {
          headers,
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.message).toContain('sent');
    });

    it('should retrieve messages', async () => {
      const response = await axios.get(`${API_URL}/api/social/messages`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Alliance System', () => {
    it('should propose alliance', async () => {
      const response = await axios.post(
        `${API_URL}/api/social/alliance`,
        {
          target_player_id,
        },
        {
          headers,
        }
      );

      if (response.status === 200) {
        expect(response.data.status).toBe('pending');
      }
    });

    it('should accept alliance', async () => {
      // First check if there's a pending alliance
      const alliances = await axios.get(`${API_URL}/api/social/alliances`, {
        headers,
      });

      if (alliances.data.pending && alliances.data.pending.length > 0) {
        const response = await axios.post(
          `${API_URL}/api/social/alliance`,
          {
            alliance_id,
            action,
          },
          {
            headers,
          }
        );

        expect(response.status).toBe(200);
      }
    });

    it('should list active alliances', async () => {
      const response = await axios.get(`${API_URL}/api/social/alliances`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('active');
    });

    it('should break alliance', async () => {
      const alliances = await axios.get(`${API_URL}/api/social/alliances`, {
        headers,
      });

      if (alliances.data.active && alliances.data.active.length > 0) {
        const allianceId = alliances.data.active[0]._id;

        const response = await axios.delete(
          `${API_URL}/api/social/alliance`,
          {
            data,
            headers,
          }
        );

        expect(response.status).toBe(200);
      }
    });
  });

  describe('Rival System', () => {
    it('should declare rival', async () => {
      const response = await axios.post(
        `${API_URL}/api/social/rival/declare`,
        {
          target_player_id,
        },
        {
          headers,
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.message).toContain('rival');
    });

    it('should list rivals', async () => {
      const response = await axios.get(`${API_URL}/api/social/rivals`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it('should remove rival', async () => {
      const rivals = await axios.get(`${API_URL}/api/social/rivals`, {
        headers,
      });

      if (rivals.data.length > 0) {
        const rivalId = rivals.data[0]._id;

        const response = await axios.delete(
          `${API_URL}/api/social/rival/remove`,
          {
            data,
            headers,
          }
        );

        expect(response.status).toBe(200);
      }
    });
  });

  describe('Marriage System', () => {
    it('should propose marriage', async () => {
      const response = await axios.post(
        `${API_URL}/api/social/marry`,
        {
          target_player_id,
        },
        {
          headers,
        }
      );

      if (response.status === 200) {
        expect(response.data.message).toContain('proposal');
      }
    });

    it('should get relationship status', async () => {
      const response = await axios.get(`${API_URL}/api/social/relationships`, {
        headers,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('alliances');
      expect(response.data).toHaveProperty('rivals');
    });
  });

  describe('Mentorship System', () => {
    it('should request mentor', async () => {
      const response = await axios.post(
        `${API_URL}/api/social/mentor/request`,
        {
          mentor_id,
        },
        {
          headers,
        }
      );

      if (response.status === 200) {
        expect(response.data.message).toContain('request');
      }
    });

    it('should accept mentorship', async () => {
      // Placeholder for mentorship acceptance
      const response = await axios.post(
        `${API_URL}/api/social/mentor/accept`,
        {
          apprentice_id,
        },
        {
          headers,
        }
      );

      if (response.status === 200) {
        expect(response.data.message).toContain('accepted');
      }
    });
  });
});
