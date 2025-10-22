/**
 * Custom hook for player data
 */
import { useEffect } from 'react';
import useStore from '../store';

export const usePlayer = () => {
  const { 
    player, 
    fetchPlayer, 
    updatePlayer,
    isLoadingPlayer,
    playerError 
  } = useStore();

  useEffect(() => {
    if (!player && !isLoadingPlayer) {
      fetchPlayer();
    }
  }, [player, isLoadingPlayer, fetchPlayer]);

  const refreshPlayer = async () => {
    await fetchPlayer();
  };

  return {
    player,
    isLoading,
    error,
    refreshPlayer,
    updatePlayer,
  };
};

export default usePlayer;
