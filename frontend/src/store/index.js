/**
 * Main Zustand store configuration
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authSlice } from './slices/authSlice';
import { playerSlice } from './slices/playerSlice';

export const useStore = create(
  devtools(
    persist(
      (...args) => ({
        ...authSlice(...args),
        ...playerSlice(...args),
      }),
      {
        name: 'karma-nexus-storage',
        partialize: (state) => ({
          // Only persist auth tokens
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    )
  )
);

export default useStore;
