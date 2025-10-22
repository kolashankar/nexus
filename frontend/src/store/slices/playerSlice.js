/**
 * Player state slice
 */
import { StateCreator } from 'zustand';
import apiClient from '../../services/api/client';

;
  traits;
  meta_traits;
  online;
}



export const playerSlice: StateCreator = (set, get) => ({
  player,
  isLoadingPlayer,
  playerError,

  fetchPlayer) => {
    set({ isLoadingPlayer, playerError);
    try {
      const response = await apiClient.get('/player/profile');
      set({
        player,
        isLoadingPlayer,
      });
    } catch (error) {
      set({
        playerError,
        isLoadingPlayer,
      });
    }
  },

  updatePlayer) => {
    const currentPlayer = get().player;
    if (currentPlayer) {
      set({
        player, ...data },
      });
    }
  },

  clearPlayer) => {
    set({
      player,
      playerError,
    });
  },
});
