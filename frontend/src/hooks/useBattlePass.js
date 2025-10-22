import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http;







export const useBattlePass = ()=> {
  const [battlePass, setBattlePass] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBattlePass = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/battle-pass/active`, {
        headers);
      setBattlePass(response.data);
    } catch (err) {
      console.error('Error fetching battle pass, err);
      setError(err.response?.data?.detail || err.message);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/battle-pass/progress`, {
        headers);
      setProgress(response.data);
    } catch (err) {
      console.error('Error fetching battle pass progress, err);
      setError(err.response?.data?.detail || err.message);
    }
  };

  const refreshProgress = async () => {
    setLoading(true);
    await Promise.all([fetchBattlePass(), fetchProgress()]);
    setLoading(false);
  };

  const claimRewards = async (tier) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/seasonal/battle-pass/claim-rewards`,
      { tier },
      {
        headers);
    return response.data;
  };

  const purchasePremium = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/api/seasonal/battle-pass/purchase-premium`,
      {},
      {
        headers);
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
