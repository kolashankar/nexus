/**
 * Action type definitions
 */

export type ActionType = 'hack' | 'help' | 'steal' | 'donate' | 'trade';

export interface ActionRequest {
  action_type: ActionType;
  target_id: string;
  amount?: number;
  message?: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
  karma_change: number;
  trait_changes: Record<string, number>;
  rewards?: {
    credits?: number;
    xp?: number;
    items?: string[];
  };
}

export interface ActionHistory {
  id: string;
  player_id: string;
  action_type: ActionType;
  target_id: string;
  timestamp: string;
  result: ActionResult;
}
