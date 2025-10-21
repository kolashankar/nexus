/**
 * Player state slice
 */
import { StateCreator } from 'zustand';
import apiClient from '../../services/api/client';

export interface Player {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  karma_points: number;
  economic_class: string;
  moral_class: string;
  currencies: {
    credits: number;
    karma_tokens: number;
    dark_matter: number;
    prestige_points: number;
    guild_coins: number;
    legacy_shards: number;
  };
  traits: Record<string, number>;
  meta_traits: Record<string, number>;
  online: boolean;
}

export interface PlayerSlice {
  player: Player | null;
  isLoadingPlayer: boolean;
  playerError: string | null;
  
  fetchPlayer: () => Promise<void>;
  updatePlayer: (data: Partial<Player>) => void;
  clearPlayer: () => void;
}

export const playerSlice: StateCreator<PlayerSlice> = (set, get) => ({
  player: null,
  isLoadingPlayer: false,
  playerError: null,

  fetchPlayer: async () => {
    set({ isLoadingPlayer: true, playerError: null });
    try {
      const response = await apiClient.get('/player/profile');
      set({
        player: response.data,
        isLoadingPlayer: false,
      });
    } catch (error: any) {
      set({
        playerError: error.response?.data?.detail || 'Failed to fetch player',
        isLoadingPlayer: false,
      });
    }
  },

  updatePlayer: (data: Partial<Player>) => {
    const currentPlayer = get().player;
    if (currentPlayer) {
      set({
        player: { ...currentPlayer, ...data },
      });
    }
  },

  clearPlayer: () => {
    set({
      player: null,
      playerError: null,
    });
  },
});
