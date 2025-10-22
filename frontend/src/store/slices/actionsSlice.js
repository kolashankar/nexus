import { create } from 'zustand';



export const useActionsStore = create((set) => ({
  recentActions,
  loading,
  error,
  addAction) => set((state) => ({
    recentActions, ...state.recentActions].slice(0, 50)
  })),
  setRecentActions) => set({ recentActions),
  setLoading) => set({ loading }),
  setError) => set({ error })
}));
