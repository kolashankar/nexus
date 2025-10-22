import { create } from 'zustand';

interface ActionsState {
  recentActions: any[];
  loading: boolean;
  error: string | null;
  addAction: (action: any) => void;
  setRecentActions: (actions: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useActionsStore = create<ActionsState>((set) => ({
  recentActions: [],
  loading: false,
  error: null,
  addAction: (action) => set((state) => ({
    recentActions: [action, ...state.recentActions].slice(0, 50)
  })),
  setRecentActions: (actions) => set({ recentActions: actions }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));
