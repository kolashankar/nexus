import { create } from 'zustand';
export const useKarmaStore = create((set) => ({
    karmaScore: 0,
    karmaHistory: [],
    worldKarma: 0,
    loading: false,
    setKarmaScore: (score) => set({ karmaScore: score }),
    setKarmaHistory: (history) => set({ karmaHistory: history }),
    setWorldKarma: (karma) => set({ worldKarma: karma }),
    setLoading: (loading) => set({ loading })
}));
