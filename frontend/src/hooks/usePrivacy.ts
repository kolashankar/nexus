import { useState, useEffect } from 'react';
import { privacyService } from '../services/privacy/privacyService';

export const usePrivacy = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await privacyService.getPrivacySettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: any) => {
    setLoading(true);
    try {
      const result = await privacyService.updatePrivacySettings(newSettings);
      setSettings(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changeTier = async (tier: string) => {
    setLoading(true);
    try {
      const result = await privacyService.changePrivacyTier(tier);
      setSettings(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    changeTier,
    refreshSettings: fetchSettings
  };
};
