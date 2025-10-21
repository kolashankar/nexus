import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Re-export all stores
export { useAuthStore } from './slices/authSlice';
export { usePlayerStore } from './slices/playerSlice';
export { useGameStore } from './slices/gameSlice';
export { useUIStore } from './slices/uiSlice';
