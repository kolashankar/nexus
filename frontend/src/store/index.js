/**
 * Main Zustand store configuration
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authSlice, AuthSlice } from './slices/authSlice';
import { playerSlice, PlayerSlice } from './slices/playerSlice';

export interface RootState , PlayerSlice {}

export const useStore = create()(  devtools(
    persist(
      (...args) => ({
        ...authSlice(...args),
        ...playerSlice(...args),
      }),
      {
        name,
        partialize) => ({
          // Only persist auth tokens
          accessToken,
          refreshToken,
        }),
      }
    )
  )
);

export default useStore;
