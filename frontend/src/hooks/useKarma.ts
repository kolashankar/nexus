import { useState, useEffect } from 'react';
import { karmaService } from '../services/karma/karmaService';

export const useKarma = () => {
  const [karmaScore, setKarmaScore] = useState<number>(0);
  const [karmaHistory, setKarmaHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKarmaScore = async () => {
    try {
      const data = await karmaService.getKarmaScore();
      setKarmaScore(data.karma_points);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchKarmaHistory = async () => {
    try {
      const data = await karmaService.getKarmaHistory();
      setKarmaHistory(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const refreshKarma = async () => {
    setLoading(true);
    await Promise.all([fetchKarmaScore(), fetchKarmaHistory()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshKarma();
  }, []);

  return {
    karmaScore,
    karmaHistory,
    loading,
    error,
    refreshKarma
  };
};
