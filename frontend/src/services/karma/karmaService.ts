/**
 * Karma service for karma system API.
 */

import { apiClient } from '../api/client';

export interface KarmaEvent {
  _id: string;
  player_id: string;
  action_type: string;
  karma_change: number;
  message: string;
  timestamp: string;
  event_type?: string;
}

export interface KarmaScore {
  karma_points: number;
  moral_class: 'good' | 'average' | 'bad';
  karma_trend: 'rising' | 'falling' | 'stable';
  recent_changes: number;
}

/**
 * Get current karma score.
 */
export const getKarmaScore = async (): Promise<KarmaScore> => {
  const response = await apiClient.get('/api/karma/score');
  return response.data;
};

/**
 * Get karma history.
 */
export const getKarmaHistory = async (limit: number = 50): Promise<KarmaEvent[]> => {
  const response = await apiClient.get('/api/karma/history', {
    params: { limit }
  });
  return response.data;
};

/**
 * Get karma events (triggered events).
 */
export const getKarmaEvents = async (): Promise<any[]> => {
  const response = await apiClient.get('/api/karma/events');
  return response.data;
};

/**
 * Respond to a karma event.
 */
export const respondToKarmaEvent = async (
  eventId: string,
  response: string
): Promise<any> => {
  const res = await apiClient.post(`/api/karma/events/${eventId}/respond`, {
    response
  });
  return res.data;
};

/**
 * Get world karma state.
 */
export const getWorldKarmaState = async (): Promise<any> => {
  const response = await apiClient.get('/api/karma/world-state');
  return response.data;
};

/**
 * Get collective karma.
 */
export const getCollectiveKarma = async (): Promise<any> => {
  const response = await apiClient.get('/api/karma/collective');
  return response.data;
};

export const karmaService = {
  getKarmaScore,
  getKarmaHistory,
  getKarmaEvents,
  respondToKarmaEvent,
  getWorldKarmaState,
  getCollectiveKarma
};
