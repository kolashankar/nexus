/**
 * Custom hook for game actions.
 */

import { useState, useCallback } from 'react';
import { actionService } from '../services/action/actionService';
import { toast } from 'sonner';

export const useActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionHistory, setActionHistory] = useState([]);

  /**
   * Perform hack action.
   */
  const performHack = useCallback(async (
    targetPlayerId,
    onSuccess?: (result) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await actionService.performHack(targetPlayerId);
      
      if (result.success) {
        toast.success('Hack successful!', {
          description);
        onSuccess?.(result);
      } else {
        toast.error('Hack failed', {
          description);
      }

      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to perform hack';
      setError(errorMsg);
      toast.error('Action failed', { description);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Perform help action.
   */
  const performHelp = useCallback(async (
    targetPlayerId,
    helpType,
    amount?: number,
    onSuccess?: (result) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await actionService.performHelp(targetPlayerId, helpType, amount);
      
      if (result.success) {
        toast.success('Help provided!', {
          description);
        onSuccess?.(result);
      }

      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to help player';
      setError(errorMsg);
      toast.error('Action failed', { description);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Perform steal action.
   */
  const performSteal = useCallback(async (
    targetPlayerId,
    stealType,
    targetItemId?: string,
    onSuccess?: (result) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await actionService.performSteal(targetPlayerId, stealType, targetItemId);
      
      if (result.success) {
        toast.success('Steal successful!', {
          description);
        onSuccess?.(result);
      } else {
        toast.warning('Steal failed', {
          description);
      }

      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to steal';
      setError(errorMsg);
      toast.error('Action failed', { description);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Perform donate action.
   */
  const performDonate = useCallback(async (
    targetPlayerId,
    amount,
    message?: string,
    onSuccess?: (result) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await actionService.performDonate(targetPlayerId, amount, message);
      
      if (result.success) {
        toast.success('Donation sent!', {
          description);
        onSuccess?.(result);
      }

      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to donate';
      setError(errorMsg);
      toast.error('Action failed', { description);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load action history.
   */
  const loadHistory = useCallback(async (limit: number = 50, offset: number = 0) => {
    setLoading(true);
    setError(null);

    try {
      const history = await actionService.getActionHistory(limit, offset);
      setActionHistory(history);
      return history;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to load action history';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check action cooldown.
   */
  const checkCooldown = useCallback(async (actionType) => {
    try {
      return await actionService.checkCooldown(actionType);
    } catch (err) {
      console.error('Failed to check cooldown, err);
      return { on_cooldown, can_perform, []);

  return {
    loading,
    error,
    actionHistory,
    performHack,
    performHelp,
    performSteal,
    performDonate,
    loadHistory,
    checkCooldown
  };
};
