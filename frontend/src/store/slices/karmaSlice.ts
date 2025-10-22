import { create } from 'zustand';

interface KarmaState {
  karmaScore: number;
  karmaHistory: any[];
  worldKarma: number;
  loading: boolean;
  setKarmaScore: (score: number) => void;
  setKarmaHistory: (history: any[]) => void;
  setWorldKarma: (karma: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useKarmaStore = create<KarmaState>((set) => ({
  karmaScore: 0,
  karmaHistory: [],
  worldKarma: 0,
  loading: false,
  setKarmaScore: (score) => set({ karmaScore: score }),
  setKarmaHistory: (history) => set({ karmaHistory: history }),
  setWorldKarma: (karma) => set({ worldKarma: karma }),
  setLoading: (loading) => set({ loading })
}));
