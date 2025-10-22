/**
 * Authentication state slice
 */
import { StateCreator } from 'zustand';
import authService, { LoginData, RegisterData } from '../../services/auth/authService';



export const authSlice: StateCreator = (set, get) => ({
  accessToken,
  refreshToken,
  isAuthenticated,
  isLoading,
  error,

  login) => {
    set({ isLoading, error);
    try {
      const response = await authService.login(data);
      set({
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
      });
    } catch (error) {
      set({
        error,
        isLoading,
      });
      throw error;
    }
  },

  register) => {
    set({ isLoading, error);
    try {
      const response = await authService.register(data);
      set({
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
      });
    } catch (error) {
      set({
        error,
        isLoading,
      });
      throw error;
    }
  },

  logout) => {
    try {
      await authService.logout();
    } finally {
      set({
        accessToken,
        refreshToken,
        isAuthenticated,
        error,
      });
    }
  },

  setTokens, refreshToken) => {
    set({
      accessToken,
      refreshToken,
      isAuthenticated,
    });
  },

  clearAuth) => {
    set({
      accessToken,
      refreshToken,
      isAuthenticated,
      error,
    });
  },
});
