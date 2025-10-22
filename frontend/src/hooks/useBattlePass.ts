import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface BattlePass {
  pass_id: string;
  season: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  total_tiers: number;
  free_tiers: number;
  premium_tiers: number;
  premium_price: number;
  tiers: any[];
}

interface PlayerBattlePassProgress {
  player_id: string;
  pass_id: string;
  season: number;
  has_premium: boolean;
  current_tier: number;
  current_xp: number;
  claimed_free_rewards: number[];
  claimed_premium_rewards: number[];
  total_xp_earned: number;
}

interface UseBattlePassReturn {
  battlePass: BattlePass | null;
  progress: PlayerBattlePassProgress | null;
  loading: boolean;
  error: string | null;
  claimRewards: (tier: number) => Promise<any>;
  purchasePremium: () => Promise<any>;
  refreshProgress: () => Promise<void>;
}

export const useBattlePass = (): UseBattlePassReturn => {
  const [battlePass, setBattlePass] = useState<BattlePass | null>(null);
  const [progress, setProgress] = useState<PlayerBattlePassProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBattlePass = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/battle-pass/active`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBattlePass(response.data);
    } catch (err: any) {
      console.error('Error fetching battle pass:', err);
      setError(err.response?.data?.detail || err.message);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/battle-pass/progress`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProgress(response.data);
    } catch (err: any) {
      console.error('Error fetching battle pass progress:', err);
      setError(err.response?.data?.detail || err.message);
    }
  };

  const refreshProgress = async () => {
    setLoading(true);
    await Promise.all([fetchBattlePass(), fetchProgress()]);
    setLoading(false);
  };

  const claimRewards = async (tier: number) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/seasonal/battle-pass/claim-rewards`,
      { tier },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  const purchasePremium = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/seasonal/battle-pass/purchase-premium`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return {
    battlePass,
    progress,
    loading,
    error,
    claimRewards,
    purchasePremium,
    refreshProgress
  };
};
