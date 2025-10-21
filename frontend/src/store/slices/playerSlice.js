import { create } from 'zustand';
import playerService from '../../services/player/playerService';

export const usePlayerStore = create((set, get) => ({
  profile: null,
  traits: null,
  stats: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await playerService.getProfile();
      set({ profile, isLoading: false });
      return profile;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to fetch profile',
      });
      throw error;
    }
  },

  fetchTraits: async () => {
    set({ isLoading: true, error: null });
    try {
      const traits = await playerService.getTraits();
      set({ traits, isLoading: false });
      return traits;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to fetch traits',
      });
      throw error;
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const stats = await playerService.getStats();
      set({ stats, isLoading: false });
      return stats;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to fetch stats',
      });
      throw error;
    }
  },

  updateProfile: (updates) => {
    set((state) => ({
      profile: { ...state.profile, ...updates },
    }));
  },

  updateTraits: (traitUpdates) => {
    set((state) => ({
      traits: { ...state.traits, ...traitUpdates },
    }));
  },

  clearError: () => set({ error: null }),
}));
