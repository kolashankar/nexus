import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../../services/auth/authService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.login(username, password);
          set({
            user: data.player,
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.detail || 'Login failed',
          });
          throw error;
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await authService.register(username, email, password);
          // Auto-login after registration
          await get().login(username, password);
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.detail || 'Registration failed',
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
