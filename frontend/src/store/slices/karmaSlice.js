import { create } from 'zustand';



export const useKarmaStore = create((set) => ({
  karmaScore,
  karmaHistory,
  worldKarma,
  loading,
  setKarmaScore) => set({ karmaScore),
  setKarmaHistory) => set({ karmaHistory),
  setWorldKarma) => set({ worldKarma),
  setLoading) => set({ loading })
}));
