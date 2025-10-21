/**
 * Main Zustand store configuration
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authSlice, AuthSlice } from './slices/authSlice';
import { playerSlice, PlayerSlice } from './slices/playerSlice';

export interface RootState extends AuthSlice, PlayerSlice {}

export const useStore = create<RootState>()(  devtools(
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
