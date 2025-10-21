import { useEffect } from 'react';
import { usePlayerStore } from '../store';

export const usePlayer = () => {
  const {
    profile,
    traits,
    stats,
    isLoading,
    error,
    fetchProfile,
    fetchTraits,
    fetchStats,
    updateProfile,
    updateTraits,
    clearError,
  } = usePlayerStore();

  return {
    profile,
    traits,
    stats,
    isLoading,
    error,
    fetchProfile,
    fetchTraits,
    fetchStats,
    updateProfile,
    updateTraits,
    clearError,
  };
};
