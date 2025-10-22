/**
 * Action service for game actions API.
 */

import { apiClient } from '../api/client';
import type {
  ActionRequest,
  ActionResponse,
  ActionHistory,
  AvailableActions
} from '../../types/actions';

/**
 * Perform a hack action on another player.
 */
export const performHack = async (
  targetPlayerId: string,
  actionData?: Record<string, any>
): Promise<ActionResponse> => {
  const response = await apiClient.post('/api/actions/hack', {
    target_player_id: targetPlayerId,
    ...actionData
  });
  return response.data;
};

/**
 * Perform a help action on another player.
 */
export const performHelp = async (
  targetPlayerId: string,
  helpType: string,
  amount?: number
): Promise<ActionResponse> => {
  const response = await apiClient.post('/api/actions/help', {
    target_player_id: targetPlayerId,
    help_type: helpType,
    amount
  });
  return response.data;
};

/**
 * Perform a steal action on another player.
 */
export const performSteal = async (
  targetPlayerId: string,
  stealType: 'credits' | 'item' | 'random',
  targetItemId?: string
): Promise<ActionResponse> => {
  const response = await apiClient.post('/api/actions/steal', {
    target_player_id: targetPlayerId,
    steal_type: stealType,
    target_item_id: targetItemId
  });
  return response.data;
};

/**
 * Perform a donate action to another player.
 */
export const performDonate = async (
  targetPlayerId: string,
  amount: number,
  message?: string
): Promise<ActionResponse> => {
  const response = await apiClient.post('/api/actions/donate', {
    target_player_id: targetPlayerId,
    amount,
    message
  });
  return response.data;
};

/**
 * Perform a trade action with another player.
 */
export const performTrade = async (
  targetPlayerId: string,
  offerItems: Array<{ item_id: string; quantity: number }>,
  requestItems: Array<{ item_id: string; quantity: number }>,
  offerCredits?: number,
  requestCredits?: number
): Promise<ActionResponse> => {
  const response = await apiClient.post('/api/actions/trade', {
    target_player_id: targetPlayerId,
    offer_items: offerItems,
    request_items: requestItems,
    offer_credits: offerCredits,
    request_credits: requestCredits
  });
  return response.data;
};

/**
 * Get action history for current player.
 */
export const getActionHistory = async (
  limit: number = 50,
  offset: number = 0
): Promise<ActionHistory[]> => {
  const response = await apiClient.get('/api/actions/history', {
    params: { limit, offset }
  });
  return response.data;
};

/**
 * Get recent actions (last 24 hours).
 */
export const getRecentActions = async (): Promise<ActionHistory[]> => {
  const response = await apiClient.get('/api/actions/recent');
  return response.data;
};

/**
 * Get available actions for a target player.
 */
export const getAvailableActions = async (
  targetPlayerId: string
): Promise<AvailableActions> => {
  const response = await apiClient.get(`/api/actions/available/${targetPlayerId}`);
  return response.data;
};

/**
 * Check cooldown status for an action.
 */
export const checkCooldown = async (
  actionType: string
): Promise<{
  on_cooldown: boolean;
  can_perform: boolean;
  remaining_seconds?: number;
  expires_at?: string;
}> => {
  const response = await apiClient.get(`/api/actions/cooldown/${actionType}`);
  return response.data;
};

/**
 * Cancel a pending trade.
 */
export const cancelTrade = async (tradeId: string): Promise<boolean> => {
  const response = await apiClient.delete(`/api/actions/trade/${tradeId}`);
  return response.data.success;
};

/**
 * Accept a pending trade.
 */
export const acceptTrade = async (tradeId: string): Promise<ActionResponse> => {
  const response = await apiClient.post(`/api/actions/trade/${tradeId}/accept`);
  return response.data;
};

/**
 * Decline a pending trade.
 */
export const declineTrade = async (tradeId: string): Promise<boolean> => {
  const response = await apiClient.post(`/api/actions/trade/${tradeId}/decline`);
  return response.data.success;
};

export const actionService = {
  performHack,
  performHelp,
  performSteal,
  performDonate,
  performTrade,
  getActionHistory,
  getRecentActions,
  getAvailableActions,
  checkCooldown,
  cancelTrade,
  acceptTrade,
  declineTrade
};
