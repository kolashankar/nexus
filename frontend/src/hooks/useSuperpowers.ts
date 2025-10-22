import { useState, useEffect } from 'react';
import superpowersService from '../services/superpowers/superpowersService';
import type { PlayerSuperpowers, AvailablePower } from '../types/superpowers';

export const useSuperpowers = () => {
  const [superpowers, setSuperpowers] = useState<PlayerSuperpowers | null>(null);
  const [availablePowers, setAvailablePowers] = useState<AvailablePower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSuperpowers = async () => {
    try {
      setLoading(true);
      const data = await superpowersService.getSuperpowers();
      setSuperpowers(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePowers = async () => {
    try {
      const data = await superpowersService.getAvailablePowers();
      setAvailablePowers(data);
    } catch (err) {
      console.error('Failed to fetch available powers:', err);
    }
  };

  useEffect(() => {
    fetchSuperpowers();
    fetchAvailablePowers();
  }, []);

  const unlockPower = async (powerId: string) => {
    try {
      await superpowersService.unlockPower(powerId);
      await fetchSuperpowers();
      await fetchAvailablePowers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const equipPower = async (powerId: string) => {
    try {
      await superpowersService.equipPower(powerId);
      await fetchSuperpowers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const usePower = async (powerId: string) => {
    try {
      const result = await superpowersService.usePower(powerId);
      await fetchSuperpowers();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return {
    superpowers,
    availablePowers,
    loading,
    error,
    refetch: fetchSuperpowers,
    unlockPower,
    equipPower,
    usePower,
  };
};
