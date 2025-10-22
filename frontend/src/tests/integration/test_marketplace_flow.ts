import { describe, it, expect, beforeAll } from '@jest/globals';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

describe('Marketplace Flow Integration Tests', () => {
  let authToken: string;
  let playerId: string;
  let testRobotId: string;

  beforeAll(async () => {
    const login = await axios.post(`${API_URL}/api/auth/login`, {
      username: 'merchant_user',
      password: 'testpass123',
    });
    authToken = login.data.access_token;

    const profile = await axios.get(`${API_URL}/api/player/profile`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    playerId = profile.data.player_id;
  });

  describe('Robot Marketplace', () => {
    it('should fetch robot marketplace listings', async () => {
      const response = await axios.get(`${API_URL}/api/robots/marketplace`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      if (response.data.length > 0) {
        expect(response.data[0]).toHaveProperty('robot_id');
        expect(response.data[0]).toHaveProperty('name');
        expect(response.data[0]).toHaveProperty('price');
        expect(response.data[0]).toHaveProperty('class');
      }
    });

    it('should purchase a robot from marketplace', async () => {
      // First get a robot to purchase
      const listingResponse = await axios.get(
        `${API_URL}/api/robots/marketplace`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (listingResponse.data.length > 0) {
        const robotToBuy = listingResponse.data[0];

        const response = await axios.post(
          `${API_URL}/api/robots/purchase`,
          {
            robot_id: robotToBuy.robot_id,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.status === 200) {
          expect(response.data).toHaveProperty('robot_id');
          expect(response.data.message).toContain('purchased');
          testRobotId = response.data.robot_id;
        }
      }
    });

    it('should fetch my robots', async () => {
      const response = await axios.get(`${API_URL}/api/robots/my-robots`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it('should sell a robot', async () => {
      if (testRobotId) {
        const response = await axios.post(
          `${API_URL}/api/robots/sell`,
          {
            robot_id: testRobotId,
            price: 5000,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data.message).toContain('listed');
      }
    });
  });

  describe('Stock Market', () => {
    it('should fetch available stocks', async () => {
      const response = await axios.get(`${API_URL}/api/market/stocks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      if (response.data.length > 0) {
        expect(response.data[0]).toHaveProperty('ticker');
        expect(response.data[0]).toHaveProperty('company_name');
        expect(response.data[0]).toHaveProperty('price');
        expect(response.data[0]).toHaveProperty('change_24h');
      }
    });

    it('should get stock details', async () => {
      const stocksResponse = await axios.get(`${API_URL}/api/market/stocks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (stocksResponse.data.length > 0) {
        const ticker = stocksResponse.data[0].ticker;
        const response = await axios.get(
          `${API_URL}/api/market/stocks/${ticker}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('ticker', ticker);
        expect(response.data).toHaveProperty('price_history');
      }
    });

    it('should buy stocks', async () => {
      const stocksResponse = await axios.get(`${API_URL}/api/market/stocks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (stocksResponse.data.length > 0) {
        const ticker = stocksResponse.data[0].ticker;
        const response = await axios.post(
          `${API_URL}/api/market/stocks/buy`,
          {
            ticker,
            quantity: 10,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.status === 200) {
          expect(response.data.message).toContain('purchased');
        }
      }
    });

    it('should fetch portfolio', async () => {
      const response = await axios.get(`${API_URL}/api/market/portfolio`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it('should sell stocks', async () => {
      const portfolioResponse = await axios.get(
        `${API_URL}/api/market/portfolio`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (portfolioResponse.data.length > 0) {
        const holding = portfolioResponse.data[0];
        const response = await axios.post(
          `${API_URL}/api/market/stocks/sell`,
          {
            ticker: holding.ticker,
            quantity: 5,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.status === 200) {
          expect(response.data.message).toContain('sold');
        }
      }
    });
  });

  describe('Item Marketplace', () => {
    it('should fetch items for sale', async () => {
      const response = await axios.get(`${API_URL}/api/market/items`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    it('should buy an item', async () => {
      const itemsResponse = await axios.get(`${API_URL}/api/market/items`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (itemsResponse.data.length > 0) {
        const item = itemsResponse.data[0];
        const response = await axios.post(
          `${API_URL}/api/market/items/buy`,
          {
            item_id: item.item_id,
            quantity: 1,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.status === 200) {
          expect(response.data.message).toContain('purchased');
        }
      }
    });
  });

  describe('Market Events', () => {
    it('should fetch active market events', async () => {
      const response = await axios.get(`${API_URL}/api/market/events`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });
});
