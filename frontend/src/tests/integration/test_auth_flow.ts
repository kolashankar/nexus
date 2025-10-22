import { describe, it, expect } from '@jest/globals';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

describe('Authentication Flow Integration Tests', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: 'SecurePass123!',
  };

  let authToken: string;
  let refreshToken: string;

  describe('Registration', () => {
    it('should register a new user', async () => {
      const response = await axios.post(`${API_URL}/api/auth/register`, testUser);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('message');
      expect(response.data.message).toContain('registered');
    });

    it('should not register duplicate username', async () => {
      try {
        await axios.post(`${API_URL}/api/auth/register`, testUser);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.detail).toContain('already exists');
      }
    });

    it('should validate password strength', async () => {
      const weakUser = {
        ...testUser,
        username: 'weakpass_user',
        password: '123',
      };

      try {
        await axios.post(`${API_URL}/api/auth/register`, weakUser);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });
  });

  describe('Login', () => {
    it('should login with correct credentials', async () => {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: testUser.username,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
      expect(response.data).toHaveProperty('token_type', 'bearer');

      authToken = response.data.access_token;
      refreshToken = response.data.refresh_token;
    });

    it('should fail with incorrect password', async () => {
      try {
        await axios.post(`${API_URL}/api/auth/login`, {
          username: testUser.username,
          password: 'WrongPassword123',
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });

    it('should fail with non-existent user', async () => {
      try {
        await axios.post(`${API_URL}/api/auth/login`, {
          username: 'nonexistent_user_9999',
          password: 'SomePassword123',
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('Protected Routes', () => {
    it('should access protected route with valid token', async () => {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      expect(response.data.username).toBe(testUser.username);
    });

    it('should reject request without token', async () => {
      try {
        await axios.get(`${API_URL}/api/auth/me`);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });

    it('should reject request with invalid token', async () => {
      try {
        await axios.get(`${API_URL}/api/auth/me`, {
          headers: { Authorization: 'Bearer invalid_token_here' },
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('Token Refresh', () => {
    it('should refresh access token', async () => {
      const response = await axios.post(`${API_URL}/api/auth/refresh`, {
        refresh_token: refreshToken,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
      expect(response.data.access_token).not.toBe(authToken);
    });

    it('should reject invalid refresh token', async () => {
      try {
        await axios.post(`${API_URL}/api/auth/refresh`, {
          refresh_token: 'invalid_refresh_token',
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('Logout', () => {
    it('should logout successfully', async () => {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.message).toContain('logout');
    });
  });
});
